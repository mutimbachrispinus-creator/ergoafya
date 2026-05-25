'use client'

import { useState, useEffect } from 'react'

const slides = [
  { src: '/images/ergo_office.png', alt: 'Ergonomic Corporate Office setup' },
  { src: '/images/ergo_therapy.png', alt: 'Occupational Therapy in action' },
  { src: '/images/ergo_wellness.png', alt: 'Corporate Wellness and Stretching Workshop' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'relative', padding: '2rem 2rem 2.5rem', width: '100%' }}>
      {/* Main card */}
      <div style={{ 
        background: 'white', borderRadius: 24,
        boxShadow: '0 20px 60px rgba(15,35,24,.12)', 
        overflow: 'hidden',
        position: 'relative',
        height: '420px',
        width: '100%',
      }}>
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: current === idx ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Gradient Overlay for Text Visibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,35,24,0.85) 0%, rgba(15,35,24,0.1) 100%)',
          zIndex: 1,
        }} />

        {/* Text Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem',
          zIndex: 2,
        }}>
          <h3 className="serif" style={{ color: 'white', fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.5rem' }}>
            Occupational Therapy-Led<br/>Ergonomic Solutions
          </h3>
          <p style={{ color: 'var(--leaf)', fontSize: '0.85rem', fontWeight: 600 }}>
            Evidence-based · Practical · Kenya-tailored
          </p>
        </div>

        {/* Dots */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 2,
          display: 'flex',
          gap: '0.4rem',
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: current === idx ? 'var(--leaf)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating pills remain same */}
      <div style={{
        position:'absolute',top:'.2rem',right:'0',zIndex:3,
        background:'white',borderRadius:12,padding:'.7rem 1rem',
        boxShadow:'0 8px 32px rgba(15,35,24,.12)',border:'1px solid var(--border)',
        fontSize:'.78rem',fontWeight:600,color:'var(--forest)',
        display:'flex',alignItems:'center',gap:'.5rem',
        animation:'float 5s ease-in-out infinite',
      }}>
        <div style={{width:28,height:28,borderRadius:8,background:'var(--card)',
          display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4aac78" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>
          </svg>
        </div>
        OT-Licensed Practice
      </div>

      <div style={{
        position:'absolute',bottom:'0',left:'0',zIndex:3,
        background:'white',borderRadius:12,padding:'.7rem 1rem',
        boxShadow:'0 8px 32px rgba(15,35,24,.12)',border:'1px solid var(--border)',
        fontSize:'.78rem',fontWeight:600,color:'var(--forest)',
        display:'flex',alignItems:'center',gap:'.5rem',
        animation:'float 5s ease-in-out infinite',animationDelay:'2.5s',
      }}>
        <span>📍</span> Upperhill Gardens, Nairobi
      </div>
    </div>
  )
}
