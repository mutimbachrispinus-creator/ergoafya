'use client'
import { useState, useEffect, useCallback } from 'react'
import HeroSection        from '@/components/HeroSection'
import StatsBand          from '@/components/StatsBand'
import InteractiveTabs    from '@/components/InteractiveTabs'
import ServicesSection    from '@/components/ServicesSection'
import ClientsSection     from '@/components/ClientsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection         from '@/components/FAQSection'
import BlogSection        from '@/components/BlogSection'

const PAGES = [
  { id: 'home',         label: 'Home',         icon: '🏠', desc: 'Welcome'       },
  { id: 'services',     label: 'Services',     icon: '🛡️', desc: 'What We Do'    },
  { id: 'expertise',    label: 'Expertise',    icon: '🎯', desc: 'Focus Areas'   },
  { id: 'clients',      label: 'Clients',      icon: '🤝', desc: 'Who We Serve'  },
  { id: 'testimonials', label: 'Testimonials', icon: '⭐', desc: 'Client Stories' },
  { id: 'faq',          label: 'FAQ',          icon: '💬', desc: 'Questions'     },
  { id: 'insights',     label: 'Insights',     icon: '📰', desc: 'Blog & News'   },
]

export default function HomePage() {
  const [activePage, setActivePage] = useState(0)
  const [animating, setAnimating]   = useState(false)
  const [direction, setDirection]   = useState<'next' | 'prev'>('next')
  const [navOpen, setNavOpen]       = useState(false)

  const goTo = useCallback((idx: number) => {
    if (idx === activePage || animating) return
    setDirection(idx > activePage ? 'next' : 'prev')
    setAnimating(true)
    setTimeout(() => {
      setActivePage(idx)
      setAnimating(false)
      setNavOpen(false)
    }, 320)
  }, [activePage, animating])

  // Keyboard arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(Math.min(activePage + 1, PAGES.length - 1))
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(Math.max(activePage - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePage, goTo])

  // Touch swipe support
  useEffect(() => {
    let startX = 0, startY = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY }
    const onTouchEnd   = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dy) < 40) return // vertical swipe — ignore
      if (dx < -50) goTo(Math.min(activePage + 1, PAGES.length - 1))
      if (dx >  50) goTo(Math.max(activePage - 1, 0))
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [activePage, goTo])

  const page = PAGES[activePage]

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'var(--cream)' }}>

      {/* ── Desktop Side-Tab Navigator ─────────────────────────────── */}
      <nav className="page-sidenav hide-mobile" aria-label="Page navigation">
        {PAGES.map((p, i) => {
          const isActive = i === activePage
          return (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              title={p.label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                padding: '0.75rem 0.5rem', border: 'none', cursor: 'pointer', borderRadius: 12,
                background: isActive ? 'var(--sage)' : 'transparent',
                color:      isActive ? 'white' : 'var(--muted)',
                transition: 'all 0.25s', width: '100%',
                boxShadow: isActive ? '0 4px 14px rgba(0,136,255,0.35)' : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{p.icon}</span>
              <span style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                {p.label}
              </span>
            </button>
          )
        })}

        {/* Progress dots */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.35rem' }}>
          {PAGES.map((_, i) => (
            <div key={i} style={{
              width: i === activePage ? 6 : 4,
              height: i === activePage ? 6 : 4,
              borderRadius: '50%',
              background: i === activePage ? 'var(--sage)' : 'rgba(0,136,255,0.2)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar ───────────────────────────────────── */}
      <nav className="page-bottomnav hide-desktop" aria-label="Page navigation">
        {PAGES.map((p, i) => {
          const isActive = i === activePage
          return (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                padding: '0.5rem 0.25rem', border: 'none', cursor: 'pointer', borderRadius: 10,
                background: 'transparent', flex: 1,
                color: isActive ? 'var(--sage)' : 'var(--muted)',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{p.icon}</span>
              <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.04em' }}>
                {p.label}
              </span>
              {isActive && (
                <div style={{ width: 18, height: 2, background: 'var(--sage)', borderRadius: 2, marginTop: 2 }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Page Content Area ───────────────────────────────────────── */}
      <div className="page-content-area">

        {/* Page header breadcrumb */}
        <div className="page-breadcrumb hide-mobile">
          <span style={{ color: 'var(--light)', fontSize: '0.72rem' }}>ErgoAfya</span>
          <span style={{ color: 'var(--border)', margin: '0 0.4rem' }}>›</span>
          <span style={{ color: 'var(--sage)', fontSize: '0.72rem', fontWeight: 700 }}>{page.label}</span>
          <span style={{ color: 'var(--light)', fontSize: '0.72rem', marginLeft: '0.3rem' }}>— {page.desc}</span>
        </div>

        {/* Animated page panel */}
        <div
          key={activePage}
          className={`page-panel ${animating ? (direction === 'next' ? 'page-exit-left' : 'page-exit-right') : 'page-enter'}`}
          style={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}
        >
          {activePage === 0 && (
            <>
              <HeroSection />
              <StatsBand />
            </>
          )}
          {activePage === 1 && <ServicesSection />}
          {activePage === 2 && <InteractiveTabs />}
          {activePage === 3 && <ClientsSection />}
          {activePage === 4 && <TestimonialsSection />}
          {activePage === 5 && <FAQSection />}
          {activePage === 6 && <BlogSection />}
        </div>

        {/* ── Prev / Next page arrows ─────────────────────────────── */}
        <div className="page-arrows hide-mobile">
          <button
            onClick={() => goTo(activePage - 1)}
            disabled={activePage === 0}
            title="Previous page"
            style={{
              background: activePage === 0 ? 'rgba(0,0,0,0.04)' : 'var(--white)',
              border: '1px solid var(--border)', borderRadius: '50%',
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: activePage === 0 ? 'default' : 'pointer', transition: 'all 0.2s',
              opacity: activePage === 0 ? 0.3 : 1,
              boxShadow: activePage === 0 ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>
            {activePage + 1} / {PAGES.length}
          </span>
          <button
            onClick={() => goTo(activePage + 1)}
            disabled={activePage === PAGES.length - 1}
            title="Next page"
            style={{
              background: activePage === PAGES.length - 1 ? 'rgba(0,0,0,0.04)' : 'var(--sage)',
              border: 'none', borderRadius: '50%',
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: activePage === PAGES.length - 1 ? 'default' : 'pointer', transition: 'all 0.2s',
              color: 'white', opacity: activePage === PAGES.length - 1 ? 0.3 : 1,
              boxShadow: activePage === PAGES.length - 1 ? 'none' : '0 4px 14px rgba(0,136,255,0.3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        /* Side nav */
        .page-sidenav {
          position: fixed;
          left: 0; top: 108px; bottom: 0;
          width: 80px; z-index: 150;
          display: flex; flex-direction: column;
          gap: 0.25rem; padding: 1.2rem 0.6rem 1.5rem;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-right: 1px solid var(--border);
          box-shadow: 2px 0 16px rgba(11,21,40,0.04);
        }

        /* Content area — sits right of sidenav */
        .page-content-area {
          position: fixed;
          left: 80px; right: 0; top: 108px; bottom: 0;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .page-breadcrumb {
          padding: 0.6rem 2rem;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          flex-shrink: 0;
          display: flex; align-items: center;
        }

        /* Page transition panels */
        .page-panel {
          flex: 1;
          min-height: 0;
        }
        .page-enter {
          animation: pageEnter 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .page-exit-left {
          animation: pageExitLeft 0.3s ease-in forwards;
        }
        .page-exit-right {
          animation: pageExitRight 0.3s ease-in forwards;
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pageExitLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-28px); }
        }
        @keyframes pageExitRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(28px); }
        }

        /* Prev/Next arrows */
        .page-arrows {
          position: absolute;
          bottom: 1.2rem; right: 2rem;
          display: flex; align-items: center; gap: 0.8rem;
          z-index: 20;
        }

        /* Mobile bottom nav */
        .page-bottomnav {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          display: flex; align-items: center;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--border);
          padding: 0.4rem 0.5rem calc(0.4rem + env(safe-area-inset-bottom));
          z-index: 300;
          box-shadow: 0 -4px 20px rgba(11,21,40,0.06);
        }

        /* Mobile: expand content area to full width, move top offset up */
        @media (max-width: 768px) {
          .page-content-area {
            left: 0 !important;
            top: 72px !important;
            bottom: 64px !important;
          }
          .page-breadcrumb { display: none !important; }
          .page-arrows { display: none !important; }
          .page-panel { padding-bottom: 1rem; }
        }

        /* Scrollbar in content area */
        .page-panel::-webkit-scrollbar { width: 4px; }
        .page-panel::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 4px; }
        .page-panel::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  )
}
