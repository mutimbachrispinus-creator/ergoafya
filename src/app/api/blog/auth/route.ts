import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function sign(token: string): string {
  const secret = 'ergoafya'
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

// GET — always returns needsSetup: false (credentials live in env vars)
export async function GET() {
  return NextResponse.json({ needsSetup: false })
}

// POST — login with username + password
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const expectedUsername = 'admin'
    const expectedPassword = 'ergoafya'

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
    }
    if (username.toLowerCase().trim() !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
    }

    const sessionToken = makeSessionToken()
    const sessionExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    return NextResponse.json({ success: true, sessionToken, sessionExpires })
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication failed.' }, { status: 500 })
  }
}
