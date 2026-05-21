'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PAGES = [
  { href: '/',           icon: '🏠', label: 'Home'     },
  { href: '/#services',  icon: '⚙️', label: 'Services' },
  { href: '/#about',     icon: 'ℹ️', label: 'About'    },
  { href: '/blog',       icon: '📝', label: 'Blog'     },
  { href: '/#booking',   icon: '📅', label: 'Book'     },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('/')

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) setActiveSection(`/#${id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [pathname])

  function isActive(href: string) {
    if (href === '/' && pathname === '/' && activeSection === '/') return true
    if (href === '/blog' && pathname.startsWith('/blog')) return true
    if (href.startsWith('/#') && activeSection === href) return true
    return false
  }

  return (
    <nav className="mobile-page-nav" aria-label="Mobile page navigation">
      <div className="mobile-page-nav-inner">
        {PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={isActive(p.href) ? 'active' : ''}
          >
            <span className="nav-icon">{p.icon}</span>
            {p.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
