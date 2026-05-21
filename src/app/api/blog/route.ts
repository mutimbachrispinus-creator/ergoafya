import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifySessionToken } from '@/app/api/blog/auth/route'

const PostSchema = z.object({
  title:     z.string().min(5),
  excerpt:   z.string().min(10),
  content:   z.string().min(50),
  category:  z.string(),
  author:    z.string().default('ErgoAfya Team'),
  published: z.boolean().default(false),
})

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  return verifySessionToken(authHeader.substring(7))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const adminAccess = isAuthorized(req)

  try {
    const { adminDb } = await import('@/lib/firebase-admin')
    let query = adminDb.collection('posts').orderBy('createdAt', 'desc').limit(limit)
    if (!adminAccess) {
      // @ts-ignore
      query = query.where('published', '==', true)
    }
    const snap = await query.get()
    const posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const headers: Record<string, string> = adminAccess
      ? { 'Cache-Control': 'no-store, max-age=0' }
      : { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
    return NextResponse.json({ posts }, { headers })
  } catch (e) {
    return NextResponse.json({ posts: [], error: 'Could not load posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body   = await req.json()
  const parsed = PostSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  try {
    const { adminDb } = await import('@/lib/firebase-admin')
    const doc = await adminDb.collection('posts').add({
      ...parsed.data,
      createdAt: new Date().toISOString(),
      slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
    })
    return NextResponse.json({ success: true, id: doc.id })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing post ID' }, { status: 400 })
    const { adminDb } = await import('@/lib/firebase-admin')
    await adminDb.collection('posts').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
