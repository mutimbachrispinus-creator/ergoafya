import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const PostSchema = z.object({
  title:     z.string().min(5),
  excerpt:   z.string().min(10),
  content:   z.string().min(50),
  category:  z.string(),
  author:    z.string().default('ErgoAfya Team'),
  published: z.boolean().default(false),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  try {
    const { adminDb } = await import('@/lib/firebase-admin')
    const snap = await adminDb.collection('posts')
      .where('published','==',true)
      .orderBy('createdAt','desc')
      .limit(limit)
      .get()
    const posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ posts }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (e) {
    return NextResponse.json({ posts: [], error: 'Could not load posts' }, { status: 500 })
  }
}

// Owner-only POST — requires Authorization: Bearer <ADMIN_SECRET>
export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.ADMIN_SECRET}`) {
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
