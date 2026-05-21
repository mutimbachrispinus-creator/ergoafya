'use client'
import { useState } from 'react'

const SERVICES = [
  'Workplace Ergonomic Assessment',
  'Workstation Design & Optimization',
  'Manual Handling & Back Care Training',
  'Posture & Musculoskeletal Health Program',
  'Workplace Injury Prevention Strategy',
  'Return-to-Work & Rehabilitation Support',
  'Assistive Device Recommendations',
  'General Consultation (Not sure yet)',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function BookingSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const f = e.currentTarget
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? ''
    const payload = {
      firstName: get('firstName'), lastName: get('lastName'),
      organisation: get('organisation'), email: get('email'),
      phone: get('phone'), service: get('service'),
      datetime: get('datetime'), notes: get('notes'),
    }
    try {
      const res  = await fetch('/api/book', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setStatus('success')
      f.reset()
    } catch (err: any) {
      setStatus('error')
      setErrMsg(err.message)
    }
  }

  const iStyle: React.CSSProperties = {
    width:'100%', background:'rgba(255,255,255,.06)',
    border:'1px solid rgba(74,172,120,.2)', borderRadius:10,
    padding:'.8rem 1rem', color:'var(--cream)',
    fontFamily:"'Outfit',sans-serif", fontSize:'.88rem', outline:'none',
  }
  const lStyle: React.CSSProperties = {
    display:'block', fontSize:'.7rem', fontWeight:700,
    color:'rgba(246,242,235,.5)', textTransform:'uppercase',
    letterSpacing:'.07em', marginBottom:'.4rem',
  }

  return (
    <section id="booking" className="section" style={{
      background:'linear-gradient(135deg,var(--forest) 0%,#07180e 100%)',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{position:'absolute',top:-100,right:-100,width:400,height:400,
        borderRadius:'50%',background:'rgba(74,172,120,.05)',pointerEvents:'none'}}/>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'5rem',
        alignItems:'start',position:'relative',zIndex:1}} className="booking-grid">

        {/* Left — contact info */}
        <div>
          <p className="sec-eyebrow" style={{color:'var(--mint)'}}>Book a Consultation</p>
          <h2 className="sec-h2" style={{color:'var(--cream)'}}>
            Ready for a <em>Healthier</em> Workplace?
          </h2>
          <p style={{color:'rgba(246,242,235,.6)',fontSize:'.975rem',lineHeight:1.72,
            maxWidth:520,marginTop:'.9rem'}}>
            Fill in your details and ErgoAfya will confirm your assessment within 24 hours.
            You'll receive confirmation by both SMS and email.
          </p>

          <div style={{display:'grid',gap:'1rem',marginTop:'2rem'}}>
            {[
              { icon:'📞', label:'Phone',     value:'+254 712 251 520',     href:'tel:+254712251520' },
              { icon:'💬', label:'WhatsApp',  value:'0734 251 520',         href:'https://wa.me/254734251520' },
              { icon:'✉️', label:'Email',     value:'ergoafya@mail.com',    href:'mailto:ergoafya@mail.com' },
              { icon:'📍', label:'Location',  value:'Upperhill Gardens, Along 3rd Ngong Avenue, Nairobi', href:'#' },
            ].map(c=>(
              <a key={c.label} href={c.href} style={{
                display:'flex',alignItems:'flex-start',gap:'1rem',padding:'1rem 1.2rem',
                background:'rgba(255,255,255,.04)',border:'1px solid rgba(74,172,120,.14)',
                borderRadius:14,textDecoration:'none',transition:'all .3s',
              }}>
                <div style={{width:42,height:42,borderRadius:10,flexShrink:0,
                  background:'rgba(74,172,120,.12)',display:'flex',
                  alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{c.icon}</div>
                <div>
                  <div style={{fontSize:'.67rem',color:'rgba(246,242,235,.4)',fontWeight:700,
                    textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'.2rem'}}>{c.label}</div>
                  <div style={{color:'rgba(246,242,235,.88)',fontSize:'.9rem',fontWeight:500}}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* AT notification note */}
          <div style={{marginTop:'1.5rem',padding:'1rem 1.2rem',
            background:'rgba(74,172,120,.08)',border:'1px solid rgba(74,172,120,.2)',
            borderRadius:12,fontSize:'.78rem',color:'rgba(246,242,235,.6)',lineHeight:1.6}}>
            <strong style={{color:'var(--mint)'}}>📲 Instant Notifications:</strong> Every booking
            triggers an SMS via <strong style={{color:'var(--mint)'}}>Africa's Talking</strong> to
            both you and the client, plus email confirmation — automatically.
          </div>
        </div>

        {/* Right — form */}
        <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(74,172,120,.15)',
          borderRadius:20,padding:'2.2rem',backdropFilter:'blur(10px)'}}>
          <h3 className="serif" style={{color:'var(--cream)',fontSize:'1.4rem',
            fontWeight:700,marginBottom:'.4rem'}}>Book Your Assessment</h3>
          <p style={{fontSize:'.8rem',color:'rgba(246,242,235,.45)',marginBottom:'1.6rem'}}>
            We'll confirm within 24 hours via SMS &amp; email
          </p>

          {status === 'success' ? (
            <div style={{background:'rgba(74,172,120,.15)',border:'1px solid #4aac78',
              borderRadius:14,padding:'2rem',textAlign:'center'}}>
              <div style={{fontSize:'2.5rem',marginBottom:'.8rem'}}>✅</div>
              <h4 style={{color:'var(--cream)',marginBottom:'.5rem',fontSize:'1.1rem'}}>Booking Sent!</h4>
              <p style={{color:'rgba(246,242,235,.7)',fontSize:'.88rem',lineHeight:1.6}}>
                You'll receive an SMS and email confirmation shortly.<br/>
                ErgoAfya will contact you within 24 hours.
              </p>
              <button onClick={()=>setStatus('idle')} style={{
                marginTop:'1.2rem',background:'none',border:'1px solid rgba(74,172,120,.4)',
                color:'var(--mint)',borderRadius:100,padding:'.5rem 1.2rem',
                cursor:'pointer',fontSize:'.82rem',fontFamily:"'Outfit',sans-serif",
              }}>Submit another →</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'grid',gap:'1rem'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}} className="form-row">
                <div><label style={lStyle}>First Name *</label>
                  <input name="firstName" style={iStyle} placeholder="Jane" required/></div>
                <div><label style={lStyle}>Last Name *</label>
                  <input name="lastName" style={iStyle} placeholder="Mwangi" required/></div>
              </div>
              <div><label style={lStyle}>Organisation *</label>
                <input name="organisation" style={iStyle} placeholder="Nairobi Hospital, ABC Corp..." required/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}} className="form-row">
                <div><label style={lStyle}>Email *</label>
                  <input name="email" type="email" style={iStyle} placeholder="jane@org.co.ke" required/></div>
                <div><label style={lStyle}>Phone / WhatsApp *</label>
                  <input name="phone" type="tel" style={iStyle} placeholder="+254 7XX XXX XXX" required/></div>
              </div>
              <div><label style={lStyle}>Service Needed *</label>
                <select name="service" style={{...iStyle, WebkitAppearance:'none'}} required>
                  <option value="">Select a service...</option>
                  {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div><label style={lStyle}>Preferred Date / Time</label>
                <input name="datetime" style={iStyle} placeholder="e.g. Mon 9 June 10am, or flexible"/></div>
              <div><label style={lStyle}>Describe your workplace challenge</label>
                <textarea name="notes" rows={3} style={{...iStyle,resize:'vertical'}}
                  placeholder="E.g. Staff reporting back pain after long desk shifts..."/></div>

              {status==='error' && (
                <p style={{color:'#e05c3a',fontSize:'.82rem',margin:0}}>{errMsg}</p>
              )}

              <button type="submit" disabled={status==='loading'} style={{
                width:'100%',background:'linear-gradient(135deg,#4aac78,#1d5c38)',
                color:'white',border:'none',borderRadius:100,padding:'1rem 2rem',
                fontFamily:"'Outfit',sans-serif",fontSize:'.95rem',fontWeight:700,
                cursor:'pointer',opacity:status==='loading'?.7:1,
                display:'flex',alignItems:'center',justifyContent:'center',gap:'.6rem',
                boxShadow:'0 6px 24px rgba(74,172,120,.3)',transition:'all .3s',
              }}>
                {status==='loading' ? '⏳ Sending...' : '📅 Send Booking Request'}
              </button>

              <p style={{fontSize:'.72rem',color:'rgba(246,242,235,.4)',textAlign:'center',margin:0}}>
                📲 Owner notified instantly via{' '}
                <strong style={{color:'var(--mint)'}}>Africa's Talking SMS + Email</strong>
              </p>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.booking-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}
        @media(max-width:480px){.form-row{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
