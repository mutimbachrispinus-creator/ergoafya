import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Simple but secure password hashing using Node's built-in crypto (no bcrypt needed)
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// POST /api/blog/auth — Login or initial setup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { adminDb } = await import('@/lib/firebase-admin')
    const configRef = adminDb.collection('configs').doc('admin_auth')
    const configDoc = await configRef.get()

    // ─── SETUP FLOW: no admin account exists yet ──────────────────────────────
    if (!configDoc.exists) {
      // Must provide a bootstrap secret to create the first admin
      const { bootstrapSecret, username, password } = body

      if (!bootstrapSecret || bootstrapSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json(
          { needsSetup: true, error: 'Provide the bootstrap secret to create your admin account.' },
          { status: 401 }
        )
      }

      if (!username || username.length < 4) {
        return NextResponse.json({ error: 'Username must be at least 4 characters.' }, { status: 400 })
      }
      if (!password || password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
      }

      const salt = generateSalt()
      const passwordHash = hashPassword(password, salt)
      const sessionToken = generateToken()
      const sessionExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

      await configRef.set({
        username: username.toLowerCase().trim(),
        passwordHash,
        salt,
        sessionToken,
        sessionExpires,
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({ success: true, sessionToken, sessionExpires, message: 'Admin account created!' })
    }

    // ─── LOGIN FLOW: account exists ───────────────────────────────────────────
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
    }

    const data = configDoc.data()!
    const storedUsername = data.username as string
    const storedHash = data.passwordHash as string
    const salt = data.salt as string

    // Verify username and password
    const attemptHash = hashPassword(password, salt)
    if (username.toLowerCase().trim() !== storedUsername || attemptHash !== storedHash) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
    }

    // Issue a fresh 7-day session token
    const sessionToken = generateToken()
    const sessionExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await configRef.update({ sessionToken, sessionExpires })

    return NextResponse.json({ success: true, sessionToken, sessionExpires })
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.json({ success: false, error: 'Authentication failed.' }, { status: 500 })
  }
}

// GET /api/blog/auth — Check if admin account has been set up
export async function GET() {
  try {
    const { adminDb } = await import('@/lib/firebase-admin')
    const configDoc = await adminDb.collection('configs').doc('admin_auth').get()
    return NextResponse.json({ needsSetup: !configDoc.exists })
  } catch (err) {
    return NextResponse.json({ needsSetup: true, error: 'Could not check setup status.' }, { status: 500 })
  }
}

// PUT /api/blog/auth — Change username/password (requires current session token)
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.substring(7)

    const { adminDb } = await import('@/lib/firebase-admin')
    const configRef = adminDb.collection('configs').doc('admin_auth')
    const configDoc = await configRef.get()

    if (!configDoc.exists) {
      return NextResponse.json({ error: 'No admin account found.' }, { status: 404 })
    }

    const data = configDoc.data()!
    // Verify session
    if (data.sessionToken !== token || new Date(data.sessionExpires) < new Date()) {
      return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 })
    }

    const { newUsername, newPassword } = await req.json()
    const updates: Record<string, string> = {}

    if (newUsername) {
      if (newUsername.length < 4) return NextResponse.json({ error: 'Username must be at least 4 characters.' }, { status: 400 })
      updates.username = newUsername.toLowerCase().trim()
    }

    if (newPassword) {
      if (newPassword.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
      const newSalt = generateSalt()
      updates.salt = newSalt
      updates.passwordHash = hashPassword(newPassword, newSalt)
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No changes provided.' }, { status: 400 })
    }

    await configRef.update(updates)
    return NextResponse.json({ success: true, message: 'Credentials updated successfully.' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update credentials.' }, { status: 500 })
  }
}
