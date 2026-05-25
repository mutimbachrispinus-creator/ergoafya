'use client'
import { useState } from 'react'

export default function LeadMagnetSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  return (
    <section className="section" style={{ background: 'var(--sage)', padding: '5rem 5vw' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', background: 'var(--white)', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15,35,24,0.08)' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--mint)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--forest)' }}>
            📘
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--forest)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
            Free 10-Point Office Ergonomics Checklist
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Not ready for a full assessment? Download our free self-assessment checklist to identify immediate risks in your current desk setup.
          </p>
        </div>

        <div style={{ flex: '1 1 350px' }}>
          {status === 'success' ? (
            <div style={{ background: 'var(--mint)', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(74,172,120,0.3)' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✅</span>
              <h3 style={{ color: 'var(--forest)', fontWeight: 700, marginBottom: '0.5rem' }}>Checklist Sent!</h3>
              <p style={{ color: 'var(--forest)', fontSize: '0.9rem', opacity: 0.8 }}>Check your inbox in the next few minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="magnet-email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--forest)', marginBottom: '0.5rem' }}>Where should we send it?</label>
                <input 
                  id="magnet-email"
                  type="email" 
                  required
                  placeholder="Enter your work email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)', 
                    background: 'var(--card)', 
                    color: 'var(--forest)', 
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--forest)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '1rem', width: '100%', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Download Checklist ➔'}
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
