import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifySessionToken } from '@/app/api/blog/auth/route'
import { db } from '@/lib/firebase'
// @ts-ignore
import { collection, addDoc, getDocs, query, orderBy, limit as fsLimit, where, deleteDoc, doc as fsDoc } from 'firebase/firestore'

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
  const limitCount = parseInt(searchParams.get('limit') || '20')
  const adminAccess = isAuthorized(req)

  try {
    const postsRef = collection(db, 'posts')
    let q = query(postsRef, orderBy('createdAt', 'desc'), fsLimit(limitCount))
    
    if (!adminAccess) {
      q = query(postsRef, where('published', '==', true), orderBy('createdAt', 'desc'), fsLimit(limitCount))
    }
    
    const snap = await getDocs(q)
    const posts = snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    
    const headers: Record<string, string> = adminAccess
      ? { 'Cache-Control': 'no-store, max-age=0' }
      : { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
    return NextResponse.json({ posts }, { headers })
  } catch (e: any) {
    console.error('Error fetching posts:', e.message)
    return NextResponse.json({ posts: [], error: 'Could not load posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body   = await req.json()
  const parsed = PostSchema.safeParse(body)
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const errorMsg = Object.entries(errors).map(([k, v]) => `${k}: ${v?.join(', ')}`).join(' | ');
    return NextResponse.json({ error: `Validation error: ${errorMsg}` }, { status: 400 })
  }
  try {
    const postsRef = collection(db, 'posts')
    const docRef = await addDoc(postsRef, {
      ...parsed.data,
      createdAt: new Date().toISOString(),
      slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
    })
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (e: any) {
    const msg = e?.message || String(e)
    console.error('[POST /api/blog] Firestore error:', msg)
    return NextResponse.json({ error: `Failed to create post: ${msg}` }, { status: 500 })
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
    
    await deleteDoc(fsDoc(db, 'posts', id))
    return NextResponse.json({ success: true })
  } catch (e: any) {
    const msg = e?.message || String(e)
    console.error('[DELETE /api/blog] Firestore error:', msg)
    return NextResponse.json({ error: `Failed to delete post: ${msg}` }, { status: 500 })
  }
}
