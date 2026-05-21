const SERVICES = [
  { n:'01', icon:'📋', title:'Workplace Ergonomic Assessments',
    desc:'Comprehensive on-site evaluation of work environments, tasks, tools, and postures to identify ergonomic risk factors before they become costly injuries.' },
  { n:'02', icon:'🖥️', title:'Workstation Design & Optimization',
    desc:'Tailored workstation configurations that reduce physical strain, improve comfort, and enhance daily productivity for every type of employee.' },
  { n:'03', icon:'🏋️', title:'Manual Handling & Back Care Training',
    desc:'Practical hands-on training in safe lifting, carrying, and manual handling techniques that protect spines and reduce occupational injury rates.' },
  { n:'04', icon:'🧘', title:'Posture & Musculoskeletal Health Programs',
    desc:'Evidence-based programs addressing posture correction, movement patterns, and musculoskeletal wellbeing — reducing absenteeism across your workforce.' },
  { n:'05', icon:'🛡️', title:'Workplace Injury Prevention Strategies',
    desc:'Proactive, organisation-wide strategies that systematically reduce the risk of work-related injuries through risk mapping and staff education.' },
  { n:'06', icon:'📈', title:'Return-to-Work & Rehabilitation Support',
    desc:'Structured, clinically-guided support for employees recovering from occupational injuries, enabling safe and sustainable return to full function.' },
  { n:'07', icon:'🦾', title:'Assistive Device Recommendations',
    desc:'Expert guidance on adaptive equipment and assistive devices supporting injured or at-risk workers in performing their roles safely.' },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section" style={{background:'var(--white)'}}>
      <div style={{maxWidth:650,marginBottom:'3.5rem'}}>
        <p className="sec-eyebrow">Our Services</p>
        <h2 className="sec-h2">Comprehensive Ergonomic &amp; <em>Occupational Health</em> Solutions</h2>
        <p className="sec-p">From initial assessment to rehabilitation — we cover every stage of workplace health to keep your people safe, comfortable, and performing at their best.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}
           className="services-grid">
        {SERVICES.map((s,i)=>(
          <div key={s.n} className="card" style={{position:'relative',overflow:'hidden',
            gridColumn: i===6 ? '1/2' : 'auto'}}>
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:3,
              background:'linear-gradient(90deg,var(--sage),var(--mint))',
              transform:'scaleX(0)',transformOrigin:'left',transition:'transform .4s'}}
              className="card-bar"/>
            <div style={{fontSize:'1.6rem',marginBottom:'1rem'}}>{s.icon}</div>
            <div style={{position:'absolute',top:'1.5rem',right:'1.5rem',
              fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:700,
              color:'rgba(15,35,24,.06)',lineHeight:1}}>{s.n}</div>
            <h3 style={{fontWeight:700,fontSize:'1rem',color:'var(--forest)',
              marginBottom:'.5rem',lineHeight:1.3}}>{s.title}</h3>
            <p style={{color:'var(--muted)',fontSize:'.855rem',lineHeight:1.65}}>{s.desc}</p>
          </div>
        ))}
      </div>
      <style>{`
        .services-grid .card:hover .card-bar{transform:scaleX(1)}
        @media(max-width:768px){.services-grid{grid-template-columns:1fr!important}}
        @media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </section>
  )
}
