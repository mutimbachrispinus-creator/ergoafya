'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATIC_POSTS = [
  {
    id: '1',
    slug: 'posture-fixes-nairobi-office',
    category: 'Ergonomics Tips',
    createdAt: '2026-05-15T08:00:00.000Z',
    title: '5 Posture Fixes Every Nairobi Office Worker Needs to Know',
    excerpt: 'Most Nairobi office workers sit for 8+ hours daily. Here are five posture corrections that reduce lower back pain by up to 60%.',
    color: '#0f2318'
  },
  {
    id: '2',
    slug: 'healthcare-workers-msd-risk',
    category: 'Healthcare',
    createdAt: '2026-05-08T08:00:00.000Z',
    title: 'Why Kenyan Healthcare Workers Are at High MSD Risk',
    excerpt: 'Nurses and clinical staff face some of the highest rates of work-related musculoskeletal disorders. ErgoAfya explains causes and solutions.',
    color: '#1d5c38'
  },
  {
    id: '3',
    slug: 'perfect-workstation-checklist',
    category: 'Workstation Design',
    createdAt: '2026-05-01T08:00:00.000Z',
    title: "The Perfect Workstation: An OT's Checklist",
    excerpt: 'Screen height, chair depth, keyboard placement — our licensed OT walks you through every element of an ergonomically optimal workstation.',
    color: '#b06328'
  },
  {
    id: '4',
    slug: 'manual-handling-safety',
    category: 'Training',
    createdAt: '2026-04-22T08:00:00.000Z',
    title: 'Safe Manual Handling: Protecting Your Back at Work',
    excerpt: 'Incorrect lifting is one of the leading causes of occupational back injuries in Kenya. Here is how to do it right.',
    color: '#2d7a4f'
  },
  {
    id: '5',
    slug: 'return-to-work-guide',
    category: 'Rehabilitation',
    createdAt: '2026-04-14T08:00:00.000Z',
    title: 'Returning to Work After a Back Injury: A Step-by-Step Guide',
    excerpt: 'A structured return-to-work programme can reduce re-injury rates by over 50%. Our OT explains the process.',
    color: '#4a6358'
  },
  {
    id: '6',
    slug: 'ergoafya-launch-announcement',
    category: 'Announcement',
    createdAt: '2026-04-01T08:00:00.000Z',
    title: 'ErgoAfya Solutions Now Serving All Nairobi Sectors',
    excerpt: 'We are excited to announce expanded coverage across healthcare, corporate, and education sectors throughout Nairobi and the wider region.',
    color: '#0f2318'
  },
]

const CATS = ['All', 'Ergonomics Tips', 'Healthcare', 'Workstation Design', 'Training', 'Rehabilitation', 'Announcement', 'Research']

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()
        if (res.ok && data.posts && data.posts.length > 0) {
          setPosts(data.posts)
        } else {
          // Fallback to static mock posts if database is empty
          setPosts(STATIC_POSTS)
        }
      } catch (err) {
        // Fallback on error
        setPosts(STATIC_POSTS)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const filteredPosts = activeCat === 'All'
    ? posts
    : posts.filter(p => p.category === activeCat)

  return (
    <main style={{ paddingTop: 72 }}>
      {/* Hero Section */}
      <div style={{ background: 'var(--forest)', padding: '6rem 5vw 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,172,120,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '-5%', bottom: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,212,166,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: 760, position: 'relative', zIndex: 2 }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '.55rem', fontSize: '.7rem', fontWeight: 700, color: 'var(--mint)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '1rem' }}>
            <span style={{ width: 28, height: 2, background: 'var(--mint)', borderRadius: 2, display: 'inline-block' }} />
            Clinician Insights &amp; Guidelines
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: '1.2rem' }}>
            Ergonomic Insights &amp; <em style={{ fontStyle: 'italic', color: 'var(--mint)' }}>Resources</em>
          </h1>
          <p style={{ color: 'rgba(246,242,235,.65)', fontSize: '1.05rem', lineHeight: 1.72, fontWeight: 400 }}>
            Expert occupational therapy guidelines, office design checklists, and health updates
            from the ErgoAfya team to keep your Nairobi workplace safe, healthy, and highly productive.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 72, zIndex: 10, padding: '1rem 5vw', overflowX: 'auto', display: 'flex', gap: '0.5rem', whiteSpace: 'nowrap' }} className="scrollbar-hidden">
        {CATS.map(cat => {
          const isActive = cat === activeCat
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                border: 'none',
                background: isActive ? 'var(--forest)' : 'var(--cream)',
                color: isActive ? 'var(--cream)' : 'var(--muted)',
                padding: '0.5rem 1.2rem',
                borderRadius: 100,
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.25s',
                boxShadow: isActive ? '0 4px 10px rgba(15,35,24,0.1)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = 'rgba(74,172,120,0.1)'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'var(--cream)'
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Main Grid Section */}
      <div className="section" style={{ background: 'var(--cream)', minHeight: '50vh' }}>
        {loading ? (
          /* Skeletons Loading */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="blog-grid">
            {[1, 2, 3].map(n => (
              <div key={n} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', height: 400, opacity: 0.6 }} className="skeleton-card">
                <div style={{ height: 160, background: 'rgba(74,172,120,0.06)' }} />
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ height: 10, background: 'rgba(74,172,120,0.06)', borderRadius: 10, width: '30%' }} />
                  <div style={{ height: 20, background: 'rgba(74,172,120,0.06)', borderRadius: 10, width: '90%' }} />
                  <div style={{ height: 10, background: 'rgba(74,172,120,0.06)', borderRadius: 10, width: '50%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          /* No items found */
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, padding: '5rem 2rem', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
            <h3 className="serif" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest)' }}>No Articles Found</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
              We haven't published any announcements under "{activeCat}" yet. Check back soon!
            </p>
          </div>
        ) : (
          /* Real Data Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="blog-grid">
            {filteredPosts.map(p => {
              const readTime = p.content ? Math.max(1, Math.ceil(p.content.split(/\s+/).length / 200)) : 4
              const formattedDate = p.createdAt
                ? new Date(p.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
                : p.date || 'Recent'
              
              const slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              
              return (
                <Link
                  key={p.id || p.slug}
                  href={`/blog/${slug}?id=${p.id || ''}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', transition: 'all 0.35s' }}
                  className="blog-card"
                >
                  <div style={{ height: 160, background: p.color || 'linear-gradient(135deg, var(--forest), var(--leaf))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <span style={{ fontSize: '3rem', opacity: 0.2 }}>📚</span>
                    <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--sage)', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.35rem 0.8rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {p.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--light)', marginBottom: '0.6rem', fontWeight: 500 }}>
                        {formattedDate} · {readTime} min read
                      </div>
                      <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--forest)', marginBottom: '0.6rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                        {p.title}
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {p.excerpt}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--leaf)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} className="read-more-btn">
                      Read Guidelines <span style={{ transition: 'transform 0.2s' }}>→</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15,35,24,0.08);
          border-color: var(--sage);
        }
        .blog-card:hover .read-more-btn span {
          transform: translateX(4px);
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media(max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media(max-width: 680px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
