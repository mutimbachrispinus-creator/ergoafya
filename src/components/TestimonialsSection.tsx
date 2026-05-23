'use client'
import { useState } from 'react'

const TESTIMONIALS = [
  { author: "Grace K.", role: "HR Manager, Nairobi Tech Firm", rating: 5, text: "ErgoAfya completely revolutionized our Upperhill office space. Following their clinical ergonomic assessments, our developers reported a 40% reduction in lower back pain. Absenteeism has dropped, and overall productivity has skyrocketed. Highly recommended for any Kenyan corporate team!" },
  { author: "Allan M.", role: "Remote Software Engineer", rating: 5, text: "Working from home in Ruaka took a massive toll on my posture until I consulted ErgoAfya. Their tele-ergonomic assessment was incredibly thorough and tailored to my exact setup. The personalized adjustments completely eliminated my chronic neck pain." },
  { author: "Dr. Paul W.", role: "Hospital Administrator", rating: 5, text: "The manual handling and back care training provided by ErgoAfya was life-changing for our nursing staff. The occupational therapist understood the unique physical demands of a busy Kenyan hospital ward. We've seen a massive reduction in staff strain injuries." }
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = TESTIMONIALS[activeIndex]

  return (
    <section className="section" style={{ background: 'var(--white)', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="sec-eyebrow" style={{ justifyContent: 'center' }}>Testimonials</p>
        <h2 className="sec-h2">What Our <em className="gradient-text">Clients</em> Say</h2>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        {/* Rating Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--sage)', padding: '0.5rem 1rem', borderRadius: '100px', color: 'white', marginBottom: '1.5rem', gap: '0.3rem' }}>
          {[...Array(activeTestimonial.rating)].map((_, i) => (
            <span key={i} style={{ fontSize: '1.2rem' }}>★</span>
          ))}
        </div>

        {/* Review Text */}
        <div className="card" style={{ background: 'var(--cream)', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--border)', minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 3rem' }}>
          <p key={activeIndex} style={{ fontSize: '1.2rem', color: 'var(--forest)', fontStyle: 'italic', lineHeight: 1.6, animation: 'fadeInUp 0.4s ease' }}>
            "{activeTestimonial.text}"
          </p>
        </div>

        {/* Author Nav Row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === activeIndex
            return (
              <div 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: isActive ? 'var(--sage)' : 'rgba(255,255,255,0.8)',
                  color: isActive ? 'white' : 'var(--forest)',
                  border: isActive ? 'none' : '1px solid var(--border)',
                  padding: '1rem 2rem', borderRadius: '16px',
                  cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  boxShadow: isActive ? '0 4px 15px rgba(0, 136, 255, 0.2)' : 'none'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.author}</span>
                <span style={{ fontSize: '0.75rem', opacity: isActive ? 0.9 : 0.6 }}>{t.role}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
