import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { env } from './env'

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0]
  const privateKey = env('FIREBASE_ADMIN_PRIVATE_KEY', 'firebase_admin_private_key', 'private_key')
  if (!privateKey) {
    console.error('FIREBASE_ADMIN_PRIVATE_KEY is not set')
  }

  const projectId = env('FIREBASE_ADMIN_PROJECT_ID', 'firebase_admin_project_id', 'project_id', 'projectId', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'next_public_firebase_project_id') || 'paav-d67cb'
  const clientEmail = env('FIREBASE_ADMIN_CLIENT_EMAIL', 'firebase_admin_client_email', 'client_email') || `firebase-adminsdk@${projectId}.iam.gserviceaccount.com`

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey:  privateKey ? privateKey.replace(/\\n/g, '\n') : '',
    }),
  })
}

export const adminDb = getFirestore(getAdminApp())

export async function verifyAdminToken(authHeader: string | null): Promise<boolean> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  const token = authHeader.substring(7)
  try {
    const docRef = adminDb.collection('configs').doc('admin_auth')
    const doc = await docRef.get()
    if (!doc.exists) return false
    const data = doc.data()
    if (!data || !data.sessionToken || !data.sessionExpires) return false
    
    if (data.sessionToken === token) {
      const expires = new Date(data.sessionExpires)
      if (expires > new Date()) {
        return true
      }
    }
  } catch (e) {
    console.error('Error verifying admin token', e)
  }
  return false
}
