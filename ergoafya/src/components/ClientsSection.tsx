const CLIENTS = [
  { icon:'🏥', title:'Hospitals & Healthcare Facilities',
    desc:'Protecting healthcare workers from the high physical demands of clinical environments — from nurses and surgeons to lab technicians and administrative staff.' },
  { icon:'🏢', title:'Corporate Offices & NGOs',
    desc:'Addressing sedentary work risks, screen-related discomfort, and open-plan office challenges to keep desk-based workers healthy, comfortable, and engaged.' },
  { icon:'🎓', title:'Schools & Training Institutions',
    desc:'Supporting educators and students with ergonomic learning environments that reduce strain, prevent early-onset MSDs, and improve focus and performance.' },
]

export default function ClientsSection() {
  return (
    <section id="clients" className="section" style={{background:'var(--white)'}}>
      <div style={{marginBottom:'3rem'}}>
        <p className="sec-eyebrow">Who We Serve</p>
        <h2 className="sec-h2">Our <em>Target</em> Clients</h2>
        <p className="sec-p">We partner with organisations across Kenya committed to the long-term health, safety, and performance of their people.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}} className="clients-grid">
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
