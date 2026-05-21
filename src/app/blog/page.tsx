import Link from 'next/link'

// In production this fetches from Firestore via /api/blog
// For static builds, posts are imported from a local JSON or MDX files

const POSTS = [
  { slug:'posture-fixes-nairobi-office', cat:'Ergonomics Tips', date:'15 May 2026',
    title:'5 Posture Fixes Every Nairobi Office Worker Needs to Know',
    excerpt:'Most Nairobi office workers sit for 8+ hours daily. Here are five posture corrections that reduce lower back pain by up to 60%.', color:'#0f2318' },
  { slug:'healthcare-workers-msd-risk', cat:'Healthcare', date:'8 May 2026',
    title:'Why Kenyan Healthcare Workers Are at High MSD Risk',
    excerpt:'Nurses and clinical staff face some of the highest rates of work-related musculoskeletal disorders. ErgoAfya explains causes and solutions.', color:'#1d5c38' },
  { slug:'perfect-workstation-checklist', cat:'Workstation Design', date:'1 May 2026',
    title:"The Perfect Workstation: An OT's Checklist",
    excerpt:'Screen height, chair depth, keyboard placement — our licensed OT walks you through every element of an ergonomically optimal workstation.', color:'#b06328' },
  { slug:'manual-handling-safety', cat:'Training', date:'22 Apr 2026',
    title:'Safe Manual Handling: Protecting Your Back at Work',
    excerpt:'Incorrect lifting is one of the leading causes of occupational back injuries in Kenya. Here is how to do it right.', color:'#2d7a4f' },
  { slug:'return-to-work-guide', cat:'Rehabilitation', date:'14 Apr 2026',
    title:'Returning to Work After a Back Injury: A Step-by-Step Guide',
    excerpt:'A structured return-to-work programme can reduce re-injury rates by over 50%. Our OT explains the process.', color:'#4a6358' },
  { slug:'ergoafya-launch-announcement', cat:'Announcement', date:'1 Apr 2026',
    title:'ErgoAfya Solutions Now Serving All Nairobi Sectors',
    excerpt:'We are excited to announce expanded coverage across healthcare, corporate, and education sectors throughout Nairobi and the wider region.', color:'#0f2318' },
]

export default function BlogPage() {
  return (
    <main style={{paddingTop:72}}>
      <div style={{background:'var(--forest)',padding:'5rem 5vw 4rem'}}>
        <div style={{maxWidth:700}}>
          <p style={{display:'inline-flex',alignItems:'center',gap:'.55rem',
            fontSize:'.7rem',fontWeight:700,color:'var(--mint)',textTransform:'uppercase',
            letterSpacing:'.1em',marginBottom:'.8rem'}}>
            <span style={{width:28,height:2,background:'var(--mint)',borderRadius:2,display:'inline-block'}}/>
            Knowledge Hub
          </p>
          <h1 className="serif" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,
            color:'var(--cream)',lineHeight:1.1,letterSpacing:'-.02em',marginBottom:'1rem'}}>
            Ergonomic Insights &amp; <em style={{fontStyle:'italic',color:'var(--mint)'}}>Resources</em>
          </h1>
          <p style={{color:'rgba(246,242,235,.6)',fontSize:'.975rem',lineHeight:1.72}}>
            Expert articles, workplace health tips, and occupational health updates
            from the ErgoAfya team — helping Kenyan organisations make informed decisions.
          </p>
        </div>
      </div>

      <div className="section" style={{background:'var(--cream)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}} className="blog-grid">
          {POSTS.map(p=>(
            <Link key={p.slug} href={`/blog/${p.slug}`}
              style={{textDecoration:'none',display:'block',background:'var(--white)',
                border:'1px solid var(--border)',borderRadius:20,overflow:'hidden',
                transition:'all .35s'}} className="blog-card">
              <div style={{height:140,background:p.color,display:'flex',
                alignItems:'center',justifyContent:'center',position:'relative'}}>
                <span style={{fontSize:'2.5rem',opacity:.3}}>🧘</span>
                <div style={{position:'absolute',top:12,left:12,background:'#4aac78',
                  color:'white',fontSize:'.65rem',fontWeight:700,padding:'.3rem .65rem',
                  borderRadius:100,textTransform:'uppercase'}}>{p.cat}</div>
              </div>
              <div style={{padding:'1.4rem'}}>
                <div style={{fontSize:'.72rem',color:'var(--light)',marginBottom:'.5rem'}}>{p.date}</div>
                <h2 style={{fontWeight:700,fontSize:'.96rem',color:'var(--forest)',
                  marginBottom:'.5rem',lineHeight:1.4}}>{p.title}</h2>
                <p style={{fontSize:'.81rem',color:'var(--muted)',lineHeight:1.6,marginBottom:'1rem'}}>{p.excerpt}</p>
                <span style={{fontSize:'.78rem',fontWeight:700,color:'var(--leaf)'}}>Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .blog-card:hover{transform:translateY(-5px);box-shadow:var(--shadow)}
        @media(max-width:768px){.blog-grid{grid-template-columns:1fr!important}}
        @media(max-width:1024px){.blog-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </main>
  )
}
