import { ErgoAfyaLogo } from './ui/Logo'

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{background:'var(--cream)'}}>
      <div style={{
        background:'var(--forest)',borderRadius:28,padding:'4rem',
        overflow:'hidden',position:'relative',
      }}>
        <div style={{position:'absolute',top:-80,right:-80,width:300,height:300,
          borderRadius:'50%',background:'rgba(74,172,120,.08)',pointerEvents:'none'}}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',
          alignItems:'center',position:'relative',zIndex:1}} >

          <div>
            <p className="sec-eyebrow" style={{color:'var(--mint)'}}>About ErgoAfya</p>
            <h2 className="sec-h2" style={{color:'var(--cream)'}}>
              Science-Backed.<br/>Kenya-<em>Rooted.</em>
            </h2>
            <p style={{color:'rgba(246,242,235,.65)',fontSize:'.975rem',lineHeight:1.72,marginTop:'.9rem'}}>
              ErgoAfya Solutions is a Kenya-based ergonomics consultancy providing practical,
              evidence-based solutions to improve workplace health, safety, and productivity.
              Led by a qualified Occupational Therapist, we specialise in preventing work-related
              injuries and promoting employee wellbeing across healthcare, corporate, and education sectors.
            </p>

            {/* OT badge */}
            <div style={{display:'flex',alignItems:'center',gap:'1rem',
              background:'rgba(255,255,255,.05)',border:'1px solid rgba(74,172,120,.2)',
              borderRadius:14,padding:'1rem 1.3rem',marginTop:'2rem'}}>
              <div style={{width:56,height:56,flexShrink:0}}>
                <ErgoAfyaLogo size={56} variant="full"/>
              </div>
              <div>
                <div style={{fontWeight:700,color:'var(--cream)',fontSize:'.9rem'}}>
                  Led by a Licensed Occupational Therapist
                </div>
                <div style={{fontSize:'.75rem',color:'var(--mint)'}}>
                  Clinically qualified · Registered practitioner · Kenya-based
                </div>
              </div>
            </div>

            <div style={{display:'grid',gap:'1rem',marginTop:'2rem'}}>
              {[
                {badge:'🎯 Vision', text:'To be a leading ergonomics consultancy in Kenya, creating healthier and more productive workplaces for every sector.'},
                {badge:'🌱 Mission', text:'To reduce musculoskeletal disorders and enhance productivity through affordable, practical, and sustainable ergonomic interventions.'},
              ].map(v=>(
                <div key={v.badge} style={{background:'rgba(255,255,255,.05)',
                  border:'1px solid rgba(74,172,120,.15)',borderRadius:14,padding:'1.3rem',
                  transition:'all .3s'}}>
                  <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--mint)',
                    textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'.4rem'}}>{v.badge}</div>
                  <div style={{color:'rgba(246,242,235,.75)',fontSize:'.88rem',lineHeight:1.65}}>{v.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="sec-eyebrow" style={{color:'var(--mint)'}}>Why Choose Us</p>
            <h3 className="sec-h2" style={{fontSize:'1.6rem',color:'var(--cream)'}}>
              What Makes ErgoAfya Different
            </h3>
            <div style={{display:'grid',gap:'.9rem',marginTop:'1.8rem'}}>
              {[
                ['Licensed Occupational Therapist','Clinical expertise applied directly to your workplace needs — not generic advice.'],
                ['Evidence-based practice','Every recommendation grounded in current research and proven clinical interventions.'],
                ['Practical & cost-effective','Realistic, affordable solutions that fit Kenyan workplace budgets without compromising outcomes.'],
                ['Tailored to Kenyan environments','Solutions designed for the realities of local sectors, not foreign templates.'],
                ['Holistic approach','From initial risk assessment through training, follow-up, and rehabilitation support.'],
              ].map(([title,text])=>(
                <div key={title} style={{display:'flex',alignItems:'flex-start',gap:'.9rem',
                  color:'rgba(246,242,235,.8)',fontSize:'.9rem',lineHeight:1.6}}>
                  <div style={{width:24,height:24,borderRadius:'50%',flexShrink:0,
                    background:'rgba(74,172,120,.2)',border:'1px solid rgba(74,172,120,.4)',
                    display:'flex',alignItems:'center',justifyContent:'center',marginTop:1}}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                      stroke="#7ed4a6" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                  </div>
                  <span><strong style={{color:'var(--cream)'}}>{title}</strong> — {text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
    </section>
  )
}
