export default function LeadConsultantSection() {
  return (
    <section className="section" style={{ background: 'var(--cream)', padding: '5rem 5vw' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }} className="consultant-container">
        
        <div style={{ flex: 1, textAlign: 'left', width: '100%' }}>
          <p className="sec-eyebrow" style={{ color: 'var(--forest)' }}>Clinical Authority</p>
          <h2 className="sec-h2" style={{ color: 'var(--forest)' }}>
            Meet Your <em>Lead</em> Occupational Therapist
          </h2>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', alignItems: 'flex-start' }} className="consultant-content">
            
            <div style={{ 
              width: '240px', 
              height: '320px', 
              borderRadius: '16px', 
              background: 'var(--sage)', 
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(15,35,24,0.1)'
            }}>
              {/* Fallback pattern if no image */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--mint), var(--forest))', opacity: 0.8 }}></div>
              <div style={{ position: 'absolute', bottom: '0', width: '100%', padding: '1.5rem', background: 'linear-gradient(transparent, rgba(15,35,24,0.9))', color: 'white' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Dr. Example Name</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: '0.2rem 0 0 0' }}>BSc. Occupational Therapy</p>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--forest)', marginBottom: '1rem', fontWeight: 600 }}>
                Evidence-Based Solutions Tailored for Kenya
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                With extensive clinical experience in both healthcare and corporate environments, our lead consultant bridges the gap between medical occupational therapy and practical workplace ergonomics. 
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                We don't just recommend new chairs; we analyze tasks, evaluate cognitive loads, and design holistic interventions that protect your workforce from musculoskeletal disorders (MSDs) while enhancing overall productivity.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--forest)', background: 'var(--mint)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 500 }}>Licensed OT Practitioner</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--forest)', background: 'var(--mint)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 500 }}>Ergonomics Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--forest)', background: 'var(--mint)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 500 }}>Years of B2B Experience</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--forest)', background: 'var(--mint)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 500 }}>Evidence-Based Approach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          .consultant-content { flex-direction: column; align-items: center !important; }
          .consultant-content > div:first-child { width: 100% !important; max-width: 300px; }
        }
      `}</style>
    </section>
  )
}
