const stats = [
  { n:'7+',   s:'7',  sup:'+',  label:'Specialist ergonomic services offered' },
  { n:'3',    s:'3',  sup:'',   label:'Target sectors: Healthcare, Corporate & Education' },
  { n:'100%', s:'100',sup:'%',  label:'Evidence-based occupational therapy practice' },
  { n:'1st',  s:'1',  sup:'st', label:'OT-led ergonomics consultancy in Kenya' },
]

export default function StatsBand() {
  return (
    <div style={{ background:'var(--white)', padding:'3rem 5vw', borderBottom:'1px solid var(--border)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem',
        maxWidth:900, margin:'0 auto' }} className="stats-grid">
        {stats.map(s => (
          <div key={s.n} style={{ textAlign:'center' }}>
            <div className="serif" style={{ fontSize:'3rem', fontWeight:700,
              color:'var(--forest)', lineHeight:1, marginBottom:'.3rem' }}>
              {s.s}<span style={{ color:'var(--sage)', fontSize:'2rem' }}>{s.sup}</span>
            </div>
            <div style={{ fontSize:'.8rem', color:'var(--muted)', fontWeight:500, lineHeight:1.4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  )
}
