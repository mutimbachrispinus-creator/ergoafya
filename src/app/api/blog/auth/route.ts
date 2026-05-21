import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json()
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: 'Invalid secret key' }, { status: 401 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 })
  }
}
