const SERVICES = [
  { n:'01', icon:'📋', title:'Workplace Ergonomic Assessments',
    desc:'Comprehensive on-site evaluation of Nairobi offices, factory floors, and clinical environments to identify ergonomic risk factors before they become costly occupational injuries.' },
  { n:'02', icon:'🖥️', title:'Workstation Design & Optimization',
    desc:'Tailored workstation configurations that reduce physical strain and enhance daily productivity for Kenyan professionals, whether working from home or in a corporate HQ.' },
  { n:'03', icon:'🏋️', title:'Manual Handling & Back Care Training',
    desc:'Practical, hands-on training in safe lifting and manual handling techniques. Crucial for protecting spines in Kenya’s booming logistics, manufacturing, and healthcare sectors.' },
  { n:'04', icon:'🧘', title:'Posture & Musculoskeletal Health',
    desc:'Evidence-based programs addressing posture correction and movement patterns — actively reducing absenteeism and medical cover claims across your workforce.' },
  { n:'05', icon:'🛡️', title:'Workplace Injury Prevention Strategies',
    desc:'Proactive, organisation-wide strategies that systematically reduce the risk of work-related injuries through local risk mapping and culturally relevant staff education.' },
  { n:'06', icon:'📈', title:'Return-to-Work & Rehab Support',
    desc:'Structured, clinically-guided occupational therapy support for employees recovering from injuries, enabling a safe and sustainable return to full function.' },
  { n:'07', icon:'🦾', title:'Assistive Device Recommendations',
    desc:'Expert guidance on sourcing and utilizing adaptive equipment locally available in Kenya, supporting injured or at-risk workers to perform their roles safely.' },
]

const ADVANTAGES = [
  { title: 'Improved Independence', desc: 'Develop skills & confidence for daily activities with ease (e.g. dressing, tech use).', icon: '🌟' },
  { title: 'Increased Participation', desc: 'Boost social skills to engage more in work and social activities, improving wellbeing.', icon: '🤝' },
  { title: 'Better Mental Health', desc: 'Provide coping strategies for anxiety/depression through meaningful engagement.', icon: '🧠' },
  { title: 'Injury Prevention', desc: 'Education on proper mechanics, ergonomics, and proactive lifestyle modifications.', icon: '🛡️' },
  { title: 'Higher Productivity', desc: 'Refine organizational and time-management skills to excel in the workplace.', icon: '🚀' },
  { title: 'Enhanced Quality of Life', desc: 'Helping individuals achieve their goals and feel a profound sense of purpose.', icon: '❤️' },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section" style={{ position: 'relative', background: 'var(--cream)', overflow: 'hidden' }}>
      {/* Background Blobs for Glassmorphism Context */}
      <div className="blob-bg blob-1"></div>
      <div className="blob-bg blob-2"></div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header Area */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <div style={{ maxWidth: 600 }}>
            <p className="sec-eyebrow">Our Services</p>
            <h2 className="sec-h2" style={{ marginBottom: 0 }}>Comprehensive Ergonomic &amp;<br/><em className="gradient-text">Occupational Health</em> Solutions</h2>
          </div>
          <div style={{ maxWidth: 500, paddingBottom: '0.5rem' }}>
            <p className="sec-p" style={{ marginBottom: 0 }}>From initial workstation assessments in Nairobi to nationwide corporate rehabilitation programs — we cover every stage of workplace health to keep the Kenyan workforce safe, comfortable, and highly productive.</p>
          </div>
        </div>

        {/* Staggered Grid Layout for Services (Inspired by Dynamic OT) */}
        <div className="staggered-grid" style={{ marginBottom: '6rem' }}>
          {SERVICES.map((s, i) => (
            <div key={s.n} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderTop: `4px solid ${i % 2 === 0 ? 'var(--sage)' : 'var(--mint)'}` }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{s.icon}</div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: "'Outfit', sans-serif", fontSize: '3rem', fontWeight: 800, color: 'rgba(0,136,255,0.06)', lineHeight: 1 }}>{s.n}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '0.8rem', lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1 }}>{s.desc}</p>
              <div style={{ marginTop: '1.5rem', alignSelf: 'flex-start', color: 'var(--sage)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }} className="read-more">
                Learn More <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* New 'Advantages' Section (Inspired by Inspire Wellness) */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '2rem' }}>
          <p className="sec-eyebrow" style={{ justifyContent: 'center' }}>Why Occupational Therapy?</p>
          <h2 className="sec-h2">The Advantages of <em className="gradient-text">Clinical OT</em></h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {ADVANTAGES.map((adv) => (
            <div key={adv.title} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', background: 'rgba(0,136,255,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {adv.icon}
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--forest)', marginBottom: '0.4rem' }}>{adv.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .read-more span { transition: transform 0.2s; }
        .card:hover .read-more span { transform: translateX(5px); }
      `}</style>
    </section>
  )
}
