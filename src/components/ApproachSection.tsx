const STEPS = [
  { icon:'🔍', title:'Workplace Assessment',       desc:'On-site clinical evaluation of tasks, environment, tools, and worker behaviours and postures.' },
  { icon:'⚠️', title:'Risk Identification',         desc:'Systematic clinical mapping of ergonomic hazards and musculoskeletal risk factors.' },
  { icon:'📝', title:'Practical Recommendations',  desc:'Affordable, actionable interventions tailored to your organisation\'s specific context and budget.' },
  { icon:'🔄', title:'Training & Follow-up',        desc:'Capability building and ongoing monitoring to ensure sustainable, measurable improvements.' },
]

export default function ApproachSection() {
  return (
    <section id="approach" className="section" style={{background:'var(--forest)'}}>
      <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
        <p className="sec-eyebrow" style={{color:'var(--mint)',justifyContent:'center'}}>Our Process</p>
        <h2 className="sec-h2" style={{color:'var(--cream)'}}>
          A Proven <em>4-Step</em> Clinical Framework
        </h2>
        <p style={{color:'rgba(246,242,235,.6)',fontSize:'.975rem',lineHeight:1.72,
          maxWidth:520,margin:'1rem auto 0'}}>
          Every ErgoAfya engagement follows this structured, evidence-based process designed
          to create lasting, measurable change in your workplace.
        </p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2rem',
          marginTop:'3.5rem',position:'relative'}} className="steps-grid">
          <div style={{position:'absolute',top:36,left:'12%',right:'12%',height:1,
            background:'linear-gradient(90deg,transparent,rgba(74,172,120,.5),rgba(126,212,166,.6),rgba(74,172,120,.5),transparent)',
            zIndex:0}} className="hide-mobile"/>
          {STEPS.map((s,i)=>(
            <div key={s.title} style={{padding:'0 .5rem',position:'relative',zIndex:1}}>
              <div style={{
                width:72,height:72,borderRadius:'50%',
                border:'2px solid rgba(74,172,120,.3)',
                background:'rgba(74,172,120,.08)',
                display:'flex',alignItems:'center',justifyContent:'center',
                margin:'0 auto 1.2rem',transition:'all .4s',fontSize:'1.6rem',
                position:'relative',
              }}>
                <div style={{position:'absolute',inset:-6,borderRadius:'50%',
                  border:'1px dashed rgba(74,172,120,.2)'}}/>
                {s.icon}
                <div style={{
                  position:'absolute',top:-8,right:-8,width:22,height:22,
                  borderRadius:'50%',background:'var(--sage)',color:'var(--forest)',
                  fontSize:'.7rem',fontWeight:800,display:'flex',
                  alignItems:'center',justifyContent:'center',
                }}>{i+1}</div>
              </div>
              <h3 style={{fontWeight:700,fontSize:'.93rem',color:'var(--cream)',marginBottom:'.4rem'}}>{s.title}</h3>
              <p style={{fontSize:'.78rem',color:'rgba(246,242,235,.55)',lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}
