const CLIENTS = [
  { icon:'🏥', title:'Hospitals & Healthcare Facilities',
    desc:'Protecting Kenyan healthcare workers from the intense physical demands of clinical environments. We support nurses, surgeons, lab technicians, and admin staff at major county and private hospitals to prevent occupational injuries and ensure quality patient care.' },
  { icon:'🏢', title:'Corporate Offices & NGOs',
    desc:'Addressing sedentary work risks in Nairobi’s fast-paced corporate and NGO sectors. We tackle screen-related discomfort, poor posture, and open-plan office challenges to keep desk-based professionals healthy, comfortable, and highly productive.' },
  { icon:'🎓', title:'Schools & Training Institutions',
    desc:'Partnering with Kenyan educational institutions to support educators and students. We design ergonomic learning environments that reduce physical strain, prevent early-onset MSDs, and significantly improve classroom focus and academic performance.' },
  { icon:'🏭', title:'Manufacturing & Logistics',
    desc:'Reducing manual handling injuries in Kenya’s industrial sector. Our occupational therapists implement practical, on-the-floor interventions to ensure warehouse and factory teams work safely, minimizing downtime and workers\' compensation claims.' }
]

export default function ClientsSection() {
  return (
    <section id="clients" className="section" style={{background:'var(--white)'}}>
      <div style={{marginBottom:'3rem', maxWidth: '800px', margin: '0 auto 3rem'}}>
        <p className="sec-eyebrow">Who We Serve</p>
        <h2 className="sec-h2">Our <em>Target</em> Sectors in Kenya</h2>
        <p className="sec-p">We partner with forward-thinking organisations across Kenya committed to the long-term health, safety, and performance of their people. By applying global occupational therapy standards to local workplaces, we deliver solutions that actually work.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'2rem', maxWidth:'1000px', margin:'0 auto'}} className="clients-grid">
        {CLIENTS.map(c=>(
          <div key={c.title} className="card" style={{textAlign:'center'}}>
            <div style={{width:70,height:70,borderRadius:'50%',
              background:'var(--card)',border:'2px solid var(--border)',
              display:'flex',alignItems:'center',justifyContent:'center',
              margin:'0 auto 1.2rem',fontSize:'1.8rem',transition:'all .3s'}}>{c.icon}</div>
            <h3 style={{fontWeight:700,color:'var(--forest)',marginBottom:'.4rem',fontSize:'1rem'}}>{c.title}</h3>
            <p style={{color:'var(--muted)',fontSize:'.84rem',lineHeight:1.65}}>{c.desc}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.clients-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
