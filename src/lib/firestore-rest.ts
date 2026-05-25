import { env } from './env'

type FirestoreValue =
  | { stringValue: string }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { nullValue: null }

type FirestoreFields = Record<string, FirestoreValue>

let cachedAccessToken: { token: string; expiresAt: number } | null = null

function getServiceAccount() {
  const projectId = env('FIREBASE_ADMIN_PROJECT_ID', 'firebase_admin_project_id', 'project_id', 'projectId', 'PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  const clientEmail = env('FIREBASE_ADMIN_CLIENT_EMAIL', 'firebase_admin_client_email', 'client_email', 'CLIENT_EMAIL')
  const privateKey = env('FIREBASE_ADMIN_PRIVATE_KEY', 'firebase_admin_private_key', 'private_key', 'PRIVATE_KEY')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin service account secrets. Set FIREBASE_ADMIN_PROJECT_ID/FIREBASE_ADMIN_CLIENT_EMAIL/FIREBASE_ADMIN_PRIVATE_KEY or their lowercase equivalents in Cloudflare.')
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
  }
}

function base64Url(input: string | ArrayBuffer) {
  const bytes = typeof input === 'string'
    ? new TextEncoder().encode(input)
    : new Uint8Array(input)

  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function pemToArrayBuffer(pem: string) {
  const base64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '')

  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

async function signJwt(unsignedJwt: string, privateKey: string) {
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsignedJwt),
  )

  return `${unsignedJwt}.${base64Url(signature)}`
}

async function getAccessToken() {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.token
  }

  const { clientEmail, privateKey } = getServiceAccount()
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))
  const assertion = await signJwt(`${header}.${payload}`, privateKey)

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  const data: any = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || `Google OAuth failed with HTTP ${res.status}`)
  }

  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
  }
  return cachedAccessToken.token
}

function firestoreValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) return { nullValue: null }
  if (typeof value === 'boolean') return { booleanValue: value }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value }
  }
  return { stringValue: String(value) }
}

function fromFirestoreValue(value: any) {
  if ('stringValue' in value) return value.stringValue
  if ('booleanValue' in value) return value.booleanValue
  if ('integerValue' in value) return Number(value.integerValue)
  if ('doubleValue' in value) return value.doubleValue
  return null
}

function toFirestoreFields(data: Record<string, unknown>): FirestoreFields {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, firestoreValue(value)]))
}

function fromFirestoreDocument(doc: any) {
  const fields = doc.fields || {}
  const id = String(doc.name || '').split('/').pop()
  const data = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, fromFirestoreValue(value)]))
  return { id, ...data }
}

async function firestoreRequest(path: string, init: RequestInit = {}) {
  const { projectId } = getServiceAccount()
  const token = await getAccessToken()
  const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })

  const data: any = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 403 || res.status === 401) {
      throw new Error(`${data.error?.message || 'Missing or insufficient permissions.'} (Project ID used: ${projectId}, Service Account: ${getServiceAccount().clientEmail}). Please ensure they match the same Firebase project.`)
    }
    throw new Error(data.error?.message || `Firestore REST failed with HTTP ${res.status}`)
  }
  return data
}

export async function listBlogPosts(options: { adminAccess: boolean; limit: number }) {
  const queryBody: any = {
    structuredQuery: {
      from: [{ collectionId: 'posts' }],
      orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
      limit: options.adminAccess ? options.limit : options.limit * 3, // Fetch more to account for filtering
    },
  }

  const rows = await firestoreRequest(':runQuery', {
    method: 'POST',
    body: JSON.stringify(queryBody),
  })

  let posts = rows.filter((row: any) => row.document).map((row: any) => fromFirestoreDocument(row.document))
  
  if (!options.adminAccess) {
    posts = posts.filter((p: any) => p.published === true)
  }
  
  return posts.slice(0, options.limit)
}

export async function createBlogPost(post: Record<string, unknown>) {
  const id = crypto.randomUUID().replace(/-/g, '')
  const doc = await firestoreRequest(`/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ 
      name: `projects/${getServiceAccount().projectId}/databases/(default)/documents/posts/${id}`,
      fields: toFirestoreFields(post) 
    }),
  })
  return id
}

export async function deleteBlogPost(id: string) {
  await firestoreRequest(`/posts/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
