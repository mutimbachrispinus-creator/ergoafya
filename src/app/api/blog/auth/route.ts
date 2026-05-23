import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { envAny } from '@/lib/env'

// ── Session token helpers ──────────────────────────────────────────────────────
function sign(token: string): string {
  const secret = envAny('SESSION_SECRET') || 'ergoafya_session_secret'
  return crypto.createHmac('sha256', secret).update(token).digest('hex')
}

function makeSessionToken(): string {
  const payload = `ergoafya_admin:${Date.now() + 7 * 24 * 60 * 60 * 1000}`
  const sig = sign(payload)
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const lastColon = decoded.lastIndexOf(':')
    const payload = decoded.substring(0, lastColon)
    const sig = decoded.substring(lastColon + 1)
    if (sign(payload) !== sig) return false
    const expires = parseInt(payload.split(':')[1])
    return Date.now() < expires
  } catch {
    return false
  }
}

// ── Hash passwords with SHA-256 ────────────────────────────────────────────────
function hashPassword(pw: string): string {
  return crypto.createHash('sha256').update(pw + 'ergoafya_salt').digest('hex')
}

// ── Load credentials from Firestore, falling back to env vars ─────────────────
async function getCredentials(): Promise<{ username: string; passwordHash: string }> {
  try {
    const { getDb } = await import('@/lib/firebase')
    const db = getDb()
    // @ts-ignore
    const { doc, getDoc } = await import('firebase/firestore/lite')
    const d = await getDoc(doc(db, '_admin', 'credentials'))
    if (d.exists()) {
      const data = d.data()!
      return { username: data.username, passwordHash: data.passwordHash }
    }
  } catch (e) {
    console.error('getCredentials error:', e)
  }
  // Fallback: hash the default hardcoded password
  return {
    username: envAny('ADMIN_USERNAME') || 'admin',
    passwordHash: hashPassword(envAny('ADMIN_PASSWORD') || 'ergoafya'),
  }
}

// ── Save credentials to Firestore ─────────────────────────────────────────────
async function saveCredentials(username: string, passwordHash: string) {
  const { getDb } = await import('@/lib/firebase')
  const db = getDb()
  // @ts-ignore
  const { doc, setDoc } = await import('firebase/firestore/lite')
  await setDoc(doc(db, '_admin', 'credentials'), { username, passwordHash }, { merge: true })
}

// ── GET — always returns needsSetup: false ─────────────────────────────────────
export async function GET() {
  return NextResponse.json({ needsSetup: false })
}

// ── POST — login with username + password ─────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
    }

    const creds = await getCredentials()
    const inputHash = hashPassword(password)

    if (
      username.toLowerCase().trim() !== creds.username.toLowerCase() ||
      inputHash !== creds.passwordHash
    ) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
    }

    const sessionToken = makeSessionToken()
    return NextResponse.json({ success: true, sessionToken })
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication failed.' }, { status: 500 })
  }
}

// ── PUT — change credentials (requires valid session — NO OTP needed) ──────────
export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ') || !verifySessionToken(authHeader.substring(7))) {
    return NextResponse.json({ error: 'Unauthorized — please log in first.' }, { status: 401 })
  }

  try {
    const { newUsername, newPassword, currentPassword } = await req.json()

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required to make changes.' }, { status: 400 })
    }

    // Verify current password before allowing change
    const creds = await getCredentials()
    if (hashPassword(currentPassword) !== creds.passwordHash) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 403 })
    }

    const updatedUsername = (newUsername?.trim() || creds.username).toLowerCase()
    const updatedHash = newPassword ? hashPassword(newPassword) : creds.passwordHash

    if (newPassword && newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
    }

    await saveCredentials(updatedUsername, updatedHash)
    return NextResponse.json({ success: true, message: 'Credentials updated successfully.' })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update credentials.' }, { status: 500 })
  }
}
