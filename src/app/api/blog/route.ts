import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifySessionToken } from '@/app/api/blog/auth/route'
import { createBlogPost, deleteBlogPost, listBlogPosts } from '@/lib/firestore-rest'

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

function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limitCount = parseInt(searchParams.get('limit') || '20')
  const adminAccess = isAuthorized(req)

  try {
    const posts = await listBlogPosts({ adminAccess, limit: limitCount })
    
    const headers: Record<string, string> = adminAccess
      ? { 'Cache-Control': 'no-store, max-age=0' }
      : { 'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30' }
    return NextResponse.json({ posts }, { headers })
  } catch (e: any) {
    const msg = e?.message || String(e)
    console.error('[GET /api/blog] Firestore error:', msg)
    return NextResponse.json({ posts: [], error: `Could not load posts: ${msg}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return apiError('Unauthorized', 401)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError('Invalid JSON request body.', 400)
  }

  const parsed = PostSchema.safeParse(body)
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const errorMsg = Object.entries(errors).map(([k, v]) => `${k}: ${v?.join(', ')}`).join(' | ');
    return apiError(`Validation error: ${errorMsg}`, 400)
  }
  try {
    const id = await createBlogPost({
      ...parsed.data,
      createdAt: new Date().toISOString(),
      slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
    })
    return NextResponse.json({ success: true, id })
  } catch (e: any) {
    const msg = e?.message || String(e)
    console.error('[POST /api/blog] Firestore error:', msg)
    return apiError(`Failed to create post: ${msg}`, 500)
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return apiError('Unauthorized', 401)
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return apiError('Missing post ID', 400)
    
    await deleteBlogPost(id)
    return NextResponse.json({ success: true })
  } catch (e: any) {
    const msg = e?.message || String(e)
    console.error('[DELETE /api/blog] Firestore error:', msg)
    return apiError(`Failed to delete post: ${msg}`, 500)
  }
}
