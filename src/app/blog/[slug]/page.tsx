'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const STATIC_POSTS = [
  {
    id: '1',
    slug: 'posture-fixes-nairobi-office',
    category: 'Ergonomics Tips',
    createdAt: '2026-05-15T08:00:00.000Z',
    title: '5 Posture Fixes Every Nairobi Office Worker Needs to Know',
    excerpt: 'Most Nairobi office workers sit for 8+ hours daily. Here are five posture corrections that reduce lower back pain by up to 60%.',
    content: `Sitting for long hours is one of the primary causes of musculoskeletal disorders (MSDs) in Nairobi offices. When you sit, your spine experiences higher load pressures than when you stand or walk. Over time, poor posture weakens muscles, causes joint strain, and reduces lung capacity.

Here are five practical, evidence-based posture corrections recommended by occupational therapists to prevent lower back pain and maintain energy:

## 1. The 90-90-90 Sitting Rule
Adjust your office chair so that:
- Your hips are at a 90-degree angle with your torso.
- Your knees are at a 90-degree angle, with feet flat on the floor (or on a footrest).
- Your elbows are at a 90-degree angle when resting on the armrests or desk surface.

## 2. Place Your Monitor at Eye Level
Avoid tilting your neck down to see your screen. The top third of your computer screen should be at horizontal eye level. If you use a laptop, use a riser/stand combined with an external keyboard and mouse to prevent forward head posture.

## 3. Support Your Lumbar Curve
Most standard office chairs do not provide adequate lower back support. Place a small lumbar support cushion or a rolled-up towel in the curve of your lower back to maintain the natural inward curve of your spine.

## 4. Keep Keyboard and Mouse Close
Keep your input devices close to your body so that you do not have to stretch your arms forward. Your shoulders should remain relaxed, and your elbows should stay at your sides.

## 5. Implement the 20-20-20 and Move Rule
Every 20 minutes:
- Look at an object 20 feet away for at least 20 seconds to reduce eye strain.
- Stand up and stretch for at least 1-2 minutes. Moving frequently keeps your joints lubricated and improves circulation.
`,
    color: '#0f2318'
  },
  {
    id: '2',
    slug: 'healthcare-workers-msd-risk',
    category: 'Healthcare',
    createdAt: '2026-05-08T08:00:00.000Z',
    title: 'Why Kenyan Healthcare Workers Are at High MSD Risk',
    excerpt: 'Nurses and clinical staff face some of the highest rates of work-related musculoskeletal disorders. ErgoAfya explains causes and solutions.',
    content: `Kenyan healthcare workers, particularly nurses, orderlies, and clinical staff, are at an extraordinarily high risk of developing occupational injuries. Musculoskeletal disorders (MSDs) like lumbar strain, shoulder tendonitis, and cervical disc herniation are extremely common.

## The Key Causes
1. **Patient Transfer & Handling:** Lifting, turning, and transferring patients without mechanical assistance devices (like hoists or slide sheets).
2. **Prolonged Standing:** Nurses frequently stand for 8-12 hours during shifts, causing leg fatigue and spinal compression.
3. **Awkward Postures:** Performing clinical tasks, such as inserting IV lines or adjusting beds, often requires bent or twisted positions.

## Clinical Interventions
- **Ergonomic Safe Patient Handling Training:** Staff must be trained in biomechanically sound transfer techniques.
- **Micro-break Protocols:** Brief stretching intervals during long shifts to reduce physical tension.
- **Ergonomic Workstation Design:** Adjusting height of medical carts and documentation desks to avoid unnecessary strain.
`,
    color: '#1d5c38'
  },
  {
    id: '3',
    slug: 'perfect-workstation-checklist',
    category: 'Workstation Design',
    createdAt: '2026-05-01T08:00:00.000Z',
    title: "The Perfect Workstation: An OT's Checklist",
    excerpt: 'Screen height, chair depth, keyboard placement — our licensed OT walks you through every element of an ergonomically optimal workstation.',
    content: `Designing an optimal workstation is not about buying the most expensive chair; it is about adjusting your environment to fit your unique anthropometric measurements. Use this clinical checklist to evaluate and optimize your workstation:

## The Checklist
- **Chair Height:** Adjust so feet rest flat on the floor. Thighs should be parallel to the ground.
- **Seat Depth:** Ensure a 2-3 finger gap between the back of your knees and the front edge of the seat.
- **Armrests:** Should support forearms without pushing shoulders up or forcing them to sag.
- **Keyboard & Mouse Height:** Keep them at elbow level to keep wrists straight (neutral wrist posture).
- **Document Holder:** Place documents between keyboard and monitor to avoid twisting your neck.
- **Lighting:** Position screens perpendicular to windows to avoid glare and reduce digital eye strain.
`,
    color: '#b06328'
  },
  {
    id: '4',
    slug: 'manual-handling-safety',
    category: 'Training',
    createdAt: '2026-04-22T08:00:00.000Z',
    title: 'Safe Manual Handling: Protecting Your Back at Work',
    excerpt: 'Incorrect lifting is one of the leading causes of occupational back injuries in Kenya. Here is how to do it right.',
    content: `Manual handling accounts for over 30% of all workplace injuries in industrial and commercial sectors across Kenya. Back injuries from lifting are painful, costly, and entirely preventable.

## Safe Lifting Rules
1. **Plan the Lift:** Is the load too heavy? Do you need a teammate or trolley?
2. **Keep a Wide Base of Support:** Place your feet shoulder-width apart.
3. **Bend Your Knees, Not Your Back:** Lower yourself using your leg muscles. Keep your spine in a neutral posture.
4. **Keep the Load Close:** Hold the item close to your waist to reduce the lever arm force on your lower back.
5. **Avoid Twisting:** Pivot with your feet rather than twisting your torso.
`,
    color: '#2d7a4f'
  },
  {
    id: '5',
    slug: 'return-to-work-guide',
    category: 'Rehabilitation',
    createdAt: '2026-04-14T08:00:00.000Z',
    title: 'Returning to Work After a Back Injury: A Step-by-Step Guide',
    excerpt: 'A structured return-to-work programme can reduce re-injury rates by over 50%. Our OT explains the process.',
    content: `Recovering from a back injury is only the first step. Successfully returning to the workplace requires a structured, gradual program to prevent re-injury and build physical capacity.

## Return-to-work Milestones
- **Step 1: Functional Assessment:** An occupational therapist evaluates your physical capacity against job demands.
- **Step 2: Modified Duties:** Temporarily adjusting tasks (e.g. reduced lifting, sitting/standing rotations).
- **Step 3: Work Conditioning:** Targeted exercises to rebuild endurance and core stability.
- **Step 4: Graduated Hours:** Gradually increasing work hours over 2-6 weeks to allow adaptation.
`,
    color: '#4a6358'
  },
  {
    id: '6',
    slug: 'ergoafya-launch-announcement',
    category: 'Announcement',
    createdAt: '2026-04-01T08:00:00.000Z',
    title: 'ErgoAfya Solutions Now Serving All Nairobi Sectors',
    excerpt: 'We are excited to announce expanded coverage across healthcare, corporate, and education sectors throughout Nairobi and the wider region.',
    content: `We are thrilled to officially launch ErgoAfya Solutions' expanded services across East Africa. Led by licensed occupational therapists, ErgoAfya is dedicated to improving worker health and corporate productivity.

We now offer:
- **Corporate Ergonomic Audits & Assessments**
- **Occupational Health Training Programmes**
- **Safe Patient Handling Workshops for Healthcare Facilities**
- **School & Classroom Ergonomics for Educational Institutions**
- **Return-to-work Case Management**

Partner with us to create healthier, happier, and more productive workplaces in Kenya.
`,
    color: '#0f2318'
  },
]

function parseMarkdown(md: string) {
  if (!md) return ''
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h4 style="font-size:1.15rem;font-weight:700;color:var(--forest);margin:1.4rem 0 0.6rem">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="font-size:1.35rem;font-weight:700;color:var(--forest);margin:1.8rem 0 0.8rem">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 style="font-size:1.6rem;font-weight:700;color:var(--forest);margin:2rem 0 1rem">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:var(--cream);padding:3px 6px;border-radius:4px;font-size:0.9em;color:var(--leaf);border:1px solid var(--border)">$1</code>')
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left:4px solid var(--sage);padding-left:1.2rem;margin:1.5rem 0;color:var(--muted);font-style:italic;line-height:1.7">$1</blockquote>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:var(--leaf);text-decoration:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/^\s*\-\s+(.*$)/gim, '<li style="margin-left:1.5rem;list-style-type:disc;margin-bottom:0.4rem">$1</li>')
    .split(/\n\s*\n/g)
    .map(p => {
      const trimmed = p.trim()
      if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li') || trimmed.startsWith('<ul')) {
        return p
      }
      return `<p style="margin-bottom:1.2rem;line-height:1.8">${p}</p>`
    })
    .join('\n')

  return html
}

function videoEmbedUrl(url: string) {
  if (!url) return ''
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return ''
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadPost() {
      try {
        const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ergoafya_admin_token') : null
        const headers: any = {}
        if (token) headers['Authorization'] = `Bearer ${token}`
        
        // Try fetching all posts and search for slug/id (with cache buster to avoid edge cache delays)
        const res = await fetch(`/api/blog?t=${Date.now()}`, { headers })
        const data = await res.json()
        
        let foundPost = null
        if (res.ok && data.posts) {
          if (id) {
            foundPost = data.posts.find((p: any) => p.id === id)
          } else {
            foundPost = data.posts.find((p: any) => p.slug === params.slug)
          }
        }
        
        if (foundPost) {
          setPost(foundPost)
        } else {
          // Check static fallback
          const localPost = STATIC_POSTS.find(p => p.slug === params.slug)
          setPost(localPost || null)
        }
      } catch (err) {
        const localPost = STATIC_POSTS.find(p => p.slug === params.slug)
        setPost(localPost || null)
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
  }, [params.slug, id])

  if (loading) {
    return (
      <main style={{ paddingTop: 108, background: 'var(--cream)', minHeight: '100vh' }}>
        <div style={{ background: 'var(--forest)', padding: '5rem 5vw 4rem' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 10, width: '100px', marginBottom: '1rem' }} />
            <div style={{ height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: 10, width: '70%', marginBottom: '1rem' }} />
            <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 10, width: '200px' }} />
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main style={{ paddingTop: 108, background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, padding: '4rem 2rem', textAlign: 'center', maxWidth: 440, boxShadow: 'var(--shadow)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1.2rem' }}>⚠️</span>
          <h1 className="serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest)' }}>Article Not Found</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.5rem', marginBottom: '1.8rem' }}>
            The guidelines you are searching for might have been moved or unpublished.
          </p>
          <Link href="/blog" style={{
            background: 'var(--forest)',
            color: 'var(--cream)',
            border: 'none',
            borderRadius: 100,
            padding: '0.8rem 2rem',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            ← Return to Insights
          </Link>
        </div>
      </main>
    )
  }

  const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    : post.date || 'Recent'

  return (
    <main style={{ paddingTop: 108, background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--forest)', padding: '5rem 5vw 4rem', position: 'relative' }}>
        <div style={{ maxWidth: 740, position: 'relative', zIndex: 2 }}>
          <Link href="/blog" style={{
            color: 'var(--mint)', textDecoration: 'none', fontSize: '.8rem',
            fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '.4rem',
            marginBottom: '1.5rem', transition: 'all 0.25s'
          }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--mint)'}>
            ← Back to Insights
          </Link>
          <div>
            <span style={{
              display: 'inline-block', background: 'var(--sage)', color: 'white',
              fontSize: '.65rem', fontWeight: 700, padding: '.35rem .8rem', borderRadius: 100,
              textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em'
            }}>
              {post.category}
            </span>
          </div>
          <h1 className="serif" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700,
            color: 'var(--cream)', lineHeight: 1.15, letterSpacing: '-.02em', margin: '0.5rem 0 1.2rem'
          }}>
            {post.title}
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            fontSize: '.82rem', color: 'rgba(246,242,235,.55)', fontWeight: 500
          }}>
            <span>By {post.author || 'ErgoAfya Team'}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingBottom: '6rem' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          {/* Article Card */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: 24, padding: '3.5rem 3rem', fontSize: '1rem', lineHeight: 1.8, color: 'var(--muted)',
            boxShadow: '0 4px 20px rgba(15,35,24,0.01)'
          }} className="article-body-container">
            {(post.imageUrl || post.videoUrl) && (
              <figure style={{ marginBottom: '2rem' }}>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt={post.imageAlt || post.title} style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 12, border: '1px solid var(--border)', display: 'block' }} />
                )}
                {post.videoUrl && (
                  <div style={{ marginTop: post.imageUrl ? '1rem' : 0, aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: 12, background: 'var(--forest)', border: '1px solid var(--border)' }}>
                    {videoEmbedUrl(post.videoUrl) ? (
                      <iframe src={videoEmbedUrl(post.videoUrl)} title={`${post.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ width: '100%', height: '100%', border: 0, display: 'block' }} />
                    ) : (
                      <video src={post.videoUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    )}
                  </div>
                )}
                {post.mediaCaption && (
                  <figcaption style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.7rem', lineHeight: 1.5 }}>
                    {post.mediaCaption}
                  </figcaption>
                )}
              </figure>
            )}
            {post.excerpt && (
              <p style={{
                marginBottom: '2rem', fontSize: '1.08rem', color: 'var(--forest)',
                fontWeight: 500, lineHeight: 1.6, borderLeft: '4px solid var(--sage)', paddingLeft: '1.2rem'
              }}>
                {post.excerpt}
              </p>
            )}
            
            <div
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
              style={{ fontSize: '0.96rem', color: 'var(--muted)' }}
            />
          </div>

          {/* Call to action card */}
          <div style={{
            marginTop: '3.5rem', background: 'linear-gradient(135deg, var(--forest), var(--leaf))', borderRadius: 24,
            padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(15,35,24,0.15)'
          }}>
            <div style={{ position: 'absolute', right: '-5%', top: '-20%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,172,120,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            
            <h3 className="serif" style={{ color: 'var(--cream)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '.8rem', position: 'relative', zIndex: 1 }}>
              Ready to Protect Your Team?
            </h3>
            <p style={{ color: 'rgba(246,242,235,.65)', marginBottom: '1.8rem', fontSize: '.92rem', maxWidth: 480, margin: '0 auto 1.8rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
              Implement licensed occupational therapy guidelines at your workspace. Book a comprehensive ergonomics assessment with ErgoAfya Solutions today.
            </p>
            <Link href="/#booking" className="btn btn-sage" style={{ position: 'relative', zIndex: 1 }}>
              Book an Assessment →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 600px) {
          .article-body-container {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </main>
  )
}
