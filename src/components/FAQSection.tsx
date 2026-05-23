'use client'
import { useState } from 'react'

const FAQS = [
  { q: "What happens during an occupational therapy assessment?", a: "An OT assessment typically involves evaluating your medical history, performing physical and cognitive assessments, observing you in your environment, and discussing your specific goals to tailor a rehabilitation plan." },
  { q: "Do you offer ergonomic assessments for home offices?", a: "Yes! We offer both in-person and tele-ergonomic assessments for home offices. We analyze your setup through video calls and provide actionable recommendations to improve your posture and reduce strain." },
  { q: "How long does a typical therapy session take?", a: "A standard session usually lasts between 45 to 60 minutes, depending on the individual's needs, treatment goals, and the specific interventions being applied." },
  { q: "Do you treat children as well as adults?", a: "Yes, our team is equipped to handle paediatric cases, providing early interventions for developmental delays, sensory processing issues, and fine motor skill challenges." },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section" style={{ background: 'var(--cream)', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="sec-eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</p>
        <h2 className="sec-h2">Frequently Asked <em className="gradient-text">Questions</em></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 1100, margin: '0 auto' }} className="faq-grid">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className="card" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', background: isOpen ? 'var(--white)' : 'rgba(255,255,255,0.4)' }} onClick={() => setOpenIndex(isOpen ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: isOpen ? 'var(--sage)' : 'var(--forest)', margin: 0 }}>{faq.q}</h4>
                <div style={{ width: 32, height: 32, borderRadius: '8px', background: isOpen ? 'var(--sage)' : 'rgba(0,136,255,0.1)', color: isOpen ? 'white' : 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', transition: 'all 0.3s' }}>
                  {isOpen ? '−' : '+'}
                </div>
              </div>
              <div style={{ maxHeight: isOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease-in-out', opacity: isOpen ? 1 : 0 }}>
                <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
