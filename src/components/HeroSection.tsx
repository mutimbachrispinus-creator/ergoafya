import Link from 'next/link'
import { ErgoAfyaLogo } from './ui/Logo'

export default function HeroSection() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 108px)', display:'grid', gridTemplateColumns:'1fr 1fr',
      alignItems:'center', padding:'3rem 5vw 3rem 2.5rem', gap:'4rem',
      position:'relative', overflow:'hidden', background:'var(--cream)',
    }} className="hero-section hero-grid">

      {/* Background decorations */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',inset:0,background:
          'radial-gradient(ellipse 70% 80% at 65% 30%, rgba(74,172,120,.08) 0%, transparent 65%),' +
          'radial-gradient(ellipse 50% 60% at 5% 80%, rgba(29,92,56,.07) 0%, transparent 60%)'}}/>
        <div style={{position:'absolute',inset:0,
          backgroundImage:'linear-gradient(rgba(74,172,120,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,172,120,.04) 1px,transparent 1px)',
          backgroundSize:'60px 60px'}}/>
      </div>

      {/* Left — content */}
      <div style={{position:'relative',zIndex:2}}>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:'.55rem',
          background:'rgba(74,172,120,.12)',border:'1px solid rgba(74,172,120,.3)',
          color:'#1d5c38',fontSize:'.72rem',fontWeight:700,
          padding:'.42rem .9rem',borderRadius:100,textTransform:'uppercase',
          letterSpacing:'.08em',marginBottom:'1.6rem',
        }}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#4aac78',
            animation:'pulse 2s ease-in-out infinite',display:'inline-block'}}/>
          Kenya's Ergonomics Consultancy
        </div>

        <p style={{fontSize:'.82rem',fontWeight:700,letterSpacing:'.14em',
          textTransform:'uppercase',color:'var(--earth)',marginBottom:'1rem'}}>
          Assess · Prevent · Empower
        </p>

        <h1 className="serif" style={{
          fontSize:'clamp(2.8rem, 5vw, 4.6rem)',fontWeight:700,lineHeight:1.05,
          color:'var(--forest)',marginBottom:'1.2rem',letterSpacing:'-.025em',
        }}>
          Healthier Bodies.<br/>
          <em style={{fontStyle:'italic',color:'var(--mid)'}}>Productive</em>{' '}
          Workplaces.<br/>
          Happier Teams.
        </h1>

        <p style={{color:'var(--muted)',fontSize:'1.05rem',lineHeight:1.75,
          maxWidth:460,marginBottom:'2.2rem'}}>
          ErgoAfya Solutions is a Kenya-based occupational health consultancy
          delivering evidence-based ergonomic interventions — led by a licensed
          Occupational Therapist. We prevent MSDs, reduce injuries, and build
          healthier workplaces across Nairobi and beyond.
        </p>

        <div className="hero-btn-container" style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'3rem'}}>
          <Link href="#booking" className="btn btn-primary">
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book an Assessment
          </Link>
          <a href="https://wa.me/254734251520?text=Hello%20ErgoAfya!"
             target="_blank" rel="noopener" className="btn btn-wa">
            <svg viewBox="0 0 24 24" style={{fill:'white',stroke:'none'}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
          <Link href="#services" className="btn btn-outline">Our Services</Link>
        </div>

        {/* Trust row */}
        <div className="hero-trust-row" style={{display:'flex',alignItems:'center',gap:'1.5rem',
          paddingTop:'1.8rem',borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex'}}>
            {['AK','MN','JO'].map((i,idx)=>(
              <div key={i} style={{
                width:32,height:32,borderRadius:'50%',border:'2px solid var(--cream)',
                background:idx===0?'var(--leaf)':idx===1?'var(--mid)':'var(--earth)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'.65rem',fontWeight:700,color:'white',marginLeft:idx?'-8px':'0',
              }}>{i}</div>
            ))}
          </div>
          <p style={{fontSize:'.8rem',color:'var(--muted)'}}>
            <strong style={{color:'var(--forest)'}}>Trusted by organisations</strong>{' '}
            across healthcare, corporate &amp; education in Kenya
          </p>
        </div>
      </div>

      {/* Right — visual card */}
      <div style={{position:'relative',zIndex:2}} className="hide-mobile">
        <div style={{position:'relative',padding:'2rem 2rem 2.5rem'}}>
          {/* Floating pill top */}
          <div style={{
            position:'absolute',top:'.2rem',right:'0',zIndex:3,
            background:'white',borderRadius:12,padding:'.7rem 1rem',
            boxShadow:'0 8px 32px rgba(15,35,24,.12)',border:'1px solid var(--border)',
            fontSize:'.78rem',fontWeight:600,color:'var(--forest)',
            display:'flex',alignItems:'center',gap:'.5rem',
            animation:'float 5s ease-in-out infinite',
          }}>
            <div style={{width:28,height:28,borderRadius:8,background:'var(--card)',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4aac78" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>
              </svg>
            </div>
            OT-Licensed Practice
          </div>

          {/* Main card */}
          <div style={{background:'white',borderRadius:24,
            boxShadow:'0 20px 60px rgba(15,35,24,.12)',overflow:'hidden'}}>
            <div style={{background:'var(--forest)',padding:'2rem',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,
                borderRadius:'50%',background:'rgba(74,172,120,.15)'}}/>
              <div style={{marginBottom:'1rem',position:'relative',zIndex:1}}>
                <ErgoAfyaLogo size={128} variant="full" shinyText={true} />
              </div>
              <h3 className="serif" style={{color:'var(--cream)',fontSize:'1.35rem',
                fontWeight:700,lineHeight:1.2,position:'relative',zIndex:1}}>
                Occupational Therapy-Led<br/>Ergonomic Interventions
              </h3>
              <p style={{color:'var(--mint)',fontSize:'.78rem',marginTop:'.3rem',position:'relative',zIndex:1}}>
                Evidence-based · Practical · Kenya-tailored
              </p>
            </div>
            <div style={{padding:'1.5rem 2rem'}}>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',marginBottom:'1.5rem'}}>
                {['Workstation Assessment','MSD Prevention','Back Care Training',
                  'Return-to-Work','Posture Programs','Rehab Support'].map(s=>(
                  <span key={s} style={{
                    padding:'.35rem .75rem',borderRadius:100,fontSize:'.72rem',
                    fontWeight:600,background:'var(--card)',color:'var(--leaf)',
                    border:'1px solid var(--border)',
                  }}>{s}</span>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem',
                paddingTop:'1rem',borderTop:'1px solid var(--border)'}}>
                {[['7+','Services'],['4','Step Process'],['3','Sectors']].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:'1.8rem',fontWeight:700,color:'var(--forest)',lineHeight:1}}>
                      {n}
                    </div>
                    <div style={{fontSize:'.7rem',color:'var(--muted)',marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating pill bottom */}
          <div style={{
            position:'absolute',bottom:'0',left:'0',zIndex:3,
            background:'white',borderRadius:12,padding:'.7rem 1rem',
            boxShadow:'0 8px 32px rgba(15,35,24,.12)',border:'1px solid var(--border)',
            fontSize:'.78rem',fontWeight:600,color:'var(--forest)',
            display:'flex',alignItems:'center',gap:'.5rem',
            animation:'float 5s ease-in-out infinite',animationDelay:'2.5s',
          }}>
            <span>📍</span> Upperhill Gardens, Nairobi
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @media(max-width:900px){.hero-section{grid-template-columns:1fr}}
      `}</style>
    </section>
  )
}
