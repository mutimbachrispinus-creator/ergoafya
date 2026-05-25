import Link from 'next/link'

export default function FinalCTASection() {
  return (
    <section className="section" style={{ background: 'var(--forest)', padding: '6rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background blobs */}
      <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '400px', height: '400px', background: 'var(--mint)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '400px', height: '400px', background: 'var(--sage)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
          Ready to Protect Your Team & Boost Productivity?
        </h2>
        <p style={{ color: 'rgba(246, 242, 235, 0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Join the forward-thinking organizations in Kenya that prioritize occupational health. Schedule a comprehensive workplace ergonomics assessment today.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'var(--mint)', color: 'var(--forest)' }}>
            Book an Assessment
          </Link>
          <Link href="/contact" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'transparent', border: '2px solid rgba(246, 242, 235, 0.4)', color: 'var(--cream)' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
