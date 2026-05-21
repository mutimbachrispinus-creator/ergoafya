import Link from 'next/link'

const SAMPLE_POSTS = [
  { slug:'posture-fixes-nairobi-office', cat:'Ergonomics Tips', date:'15 May 2026',
    title:'5 Posture Fixes Every Nairobi Office Worker Needs to Know',
    excerpt:'Most Nairobi office workers sit for 8+ hours daily. Here are the five most effective posture corrections that reduce lower back pain by up to 60%.',
    color:'var(--forest)' },
  { slug:'healthcare-workers-msd-risk', cat:'Healthcare', date:'8 May 2026',
    title:'Why Kenyan Healthcare Workers Are at High MSD Risk — And What to Do',
    excerpt:'Nurses and clinical staff face some of the highest rates of work-related musculoskeletal disorders. ErgoAfya explains the causes and the solutions.',
    color:'var(--leaf)' },
  { slug:'perfect-workstation-checklist', cat:'Workstation Design', date:'1 May 2026',
    title:"The Perfect Workstation: An Occupational Therapist's Checklist",
    excerpt:'Screen height, chair depth, keyboard placement — our licensed OT walks you through every element of an ergonomically optimal workstation setup.',
    color:'var(--earth)' },
]

export default function BlogSection() {
  return (
    <section id="blog" className="section" style={{background:'var(--cream)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',
        flexWrap:'wrap',gap:'1rem',marginBottom:'3rem'}}>
        <div>
          <p className="sec-eyebrow">Insights & Resources</p>
          <h2 className="sec-h2">Ergonomic <em>Knowledge</em> Hub</h2>
          <p className="sec-p">Expert articles, workplace health tips, and occupational health updates from the ErgoAfya team.</p>
        </div>
        <Link href="/blog" className="btn btn-outline" style={{flexShrink:0}}>View All Posts →</Link>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}} className="blog-grid">
        {SAMPLE_POSTS.map(p=>(
          <Link key={p.slug} href={`/blog/${p.slug}`}
            style={{textDecoration:'none',display:'block',background:'var(--white)',
              border:'1px solid var(--border)',borderRadius:20,overflow:'hidden',
              transition:'all .35s'}}
            className="blog-card">
            <div style={{height:160,background:p.color,position:'relative',overflow:'hidden',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth=".6" opacity=".15">
                <circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/>
                <line x1="8" y1="12" x2="16" y2="12"/><line x1="8.5" y1="17" x2="15.5" y2="17"/>
              </svg>
              <div style={{position:'absolute',top:12,left:12,background:'#4aac78',
                color:'white',fontSize:'.65rem',fontWeight:700,padding:'.3rem .65rem',
                borderRadius:100,textTransform:'uppercase',letterSpacing:'.06em'}}>{p.cat}</div>
            </div>
            <div style={{padding:'1.4rem'}}>
              <div style={{fontSize:'.72rem',color:'var(--light)',fontWeight:500,marginBottom:'.5rem'}}>{p.date}</div>
              <h3 style={{fontWeight:700,fontSize:'.96rem',color:'var(--forest)',
                marginBottom:'.5rem',lineHeight:1.4}}>{p.title}</h3>
              <p style={{fontSize:'.81rem',color:'var(--muted)',lineHeight:1.6,marginBottom:'1rem'}}>{p.excerpt}</p>
              <span style={{fontSize:'.78rem',fontWeight:700,color:'var(--leaf)',
                display:'inline-flex',alignItems:'center',gap:'.3rem'}}>Read Article →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Owner blog panel callout */}
      <div className="admin-callout hide-mobile" style={{background:'var(--forest)',borderRadius:20,padding:'2.5rem',marginTop:'3rem',
        display:'grid',gridTemplateColumns:'1fr auto',gap:'2rem',alignItems:'center'}}
        >
        <div>
          <h3 className="serif" style={{fontSize:'1.5rem',fontWeight:700,color:'var(--cream)',marginBottom:'.5rem'}}>
            Blog & Announcements — Owner Admin Panel
          </h3>
          <p style={{fontSize:'.87rem',color:'rgba(246,242,235,.6)',lineHeight:1.6,maxWidth:480}}>
            Publish articles, health tips, service announcements, and case studies directly
            from a secure admin panel — no developer needed. Write, edit, schedule, and
            manage all site content from your phone or laptop.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',marginTop:'1rem'}}>
            {['Rich Text Editor','Image Uploads','Categories','Schedule Posts','SEO Fields','Announcements','Newsletter'].map(f=>(
              <span key={f} style={{background:'rgba(74,172,120,.15)',border:'1px solid rgba(74,172,120,.25)',
                color:'var(--mint)',fontSize:'.7rem',fontWeight:600,padding:'.3rem .7rem',borderRadius:100}}>{f}</span>
            ))}
          </div>
        </div>
        <Link href="/blog/admin" className="btn btn-sage" style={{flexShrink:0,whiteSpace:'nowrap'}}>
          Open Admin Panel →
        </Link>
      </div>
      <style>{`
        .blog-card:hover{transform:translateY(-5px);box-shadow:var(--shadow)}
        @media(max-width:768px){.blog-grid{grid-template-columns:1fr!important}.admin-callout{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
