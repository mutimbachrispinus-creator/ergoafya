'use client'
import { useState } from 'react'

const TABS = [
  { id: 'clinical', label: 'Clinical Occupational Therapy', title: 'Clinical Occupational Therapy Interventions', content: 'Our clinical OT services focus on rehabilitating fine motor skills, sensory processing, and daily living functions. We use evidence-based approaches to design tailored therapy plans that restore independence and quality of life for Kenyans recovering from injuries or neurological conditions.' },
  { id: 'workplace', label: 'Workplace Ergonomics', title: 'Workplace Ergonomic Optimization', content: 'We assess workplace environments across Kenya to minimize injury risks. By optimizing workstation setups and training staff on manual handling, we drastically reduce musculoskeletal disorders and costly medical absenteeism in the corporate and industrial sectors.' },
  { id: 'paediatric', label: 'Paediatric OT', title: 'Paediatric Occupational Therapy', content: 'Inspired by our specialized knowledge in child development, we assist Kenyan children with developmental delays, sensory challenges, and learning difficulties. We empower them to achieve their full potential in school and confidently navigate daily life.' },
  { id: 'teletherapy', label: 'Teletherapy Services', title: 'Virtual Teletherapy Support', content: 'Access high-quality occupational therapy from anywhere in Kenya or East Africa. Our virtual teletherapy sessions are highly interactive and secure, ensuring you receive continuous, expert care and guidance without the need to travel through Nairobi traffic.' }
]

export default function InteractiveTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <section className="section" style={{ background: 'var(--white)', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="sec-eyebrow" style={{ justifyContent: 'center' }}>Focus Areas</p>
        <h2 className="sec-h2">Areas of <em className="gradient-text">Expertise</em></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', maxWidth: 1000, margin: '0 auto', background: 'var(--cream)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }} className="tabs-container">
        {/* Left Side: Tabs List */}
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.5)', padding: '2rem' }}>
          {TABS.map(tab => {
            const isActive = tab.id === activeTab.id
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: isActive ? 'var(--sage)' : 'transparent',
                  color: isActive ? 'white' : 'var(--forest)',
                  border: 'none', padding: '1rem 1.5rem', textAlign: 'left',
                  borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem',
                  cursor: 'pointer', transition: 'all 0.3s',
                  marginBottom: '0.5rem',
                  boxShadow: isActive ? '0 4px 15px rgba(0, 136, 255, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Right Side: Tab Content */}
        <div style={{ padding: '3rem 3rem 3rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div key={activeTab.id} style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest)', marginBottom: '1rem' }}>{activeTab.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{activeTab.content}</p>
            
            <button className="btn btn-sage" style={{ marginTop: '2rem' }}>Learn More →</button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .tabs-container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
