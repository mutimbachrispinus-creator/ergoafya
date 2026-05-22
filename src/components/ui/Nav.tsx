'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ErgoAfyaLogo } from './Logo'

const links = [
  { href: '/about',    label: 'About'    },
  { href: '/services', label: 'Services' },
  { href: '/about#approach', label: 'Approach' },
  { href: '/blog',      label: 'Insights' },
  { href: '/#clients',  label: 'Clients'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200,
      height:72, display:'flex', alignItems:'center',
      justifyContent:'space-between', padding:'0 5vw',
      background: scrolled ? 'rgba(246,242,235,.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(74,172,120,.18)' : 'none',
      boxShadow: scrolled ? '0 4px 24px rgba(15,35,24,.07)' : 'none',
      transition:'all .4s',
    }}>
      <Link href="/" style={{textDecoration:'none'}}>
        <ErgoAfyaLogo size={104} variant="full" shinyText={true} />
      </Link>

      {/* Desktop links */}
      <ul style={{display:'flex', gap:'2.2rem', listStyle:'none', alignItems:'center'}}
          className="hide-mobile">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="nav-link" style={{
              textDecoration:'none', color:'#4a6358', fontWeight:500,
              fontSize:'.875rem', transition:'color .25s',
            }}>
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/booking" className="btn btn-primary" style={{padding:'.58rem 1.4rem'}}>
            Book Assessment
          </Link>
        </li>
      </ul>

      {/* Hamburger */}
      <button onClick={()=>setOpen(o=>!o)} className="hide-desktop"
        style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',flexDirection:'column',gap:5}}>
        {[0,1,2].map(i=>(
          <span key={i} style={{
            width:22, height:2, background:'#0f2318', borderRadius:2,
            display:'block', transition:'all .3s',
            transform: open && i===0 ? 'rotate(45deg) translateY(7px)' :
                       open && i===2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
            opacity: open && i===1 ? 0 : 1,
          }}/>
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'absolute', top:72, left:0, right:0,
          background:'rgba(246,242,235,.97)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(74,172,120,.2)',
          padding:'1.5rem 5vw', display:'flex', flexDirection:'column', gap:'1.2rem',
          zIndex:199,
        }}>
          {links.map(l=>(
            <Link key={l.href} href={l.href}
              onClick={()=>setOpen(false)}
              style={{textDecoration:'none',color:'#4a6358',fontWeight:500,fontSize:'1rem'}}>
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn btn-primary"
            onClick={()=>setOpen(false)} style={{textAlign:'center',marginTop:'.5rem'}}>
            Book Assessment
          </Link>
        </div>
      )}
    </nav>
  )
}
