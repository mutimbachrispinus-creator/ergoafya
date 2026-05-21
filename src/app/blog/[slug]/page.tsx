import Link from 'next/link'

// In production: fetch post from Firestore by slug
// For static builds: import from local MDX/JSON files
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{paddingTop:72}}>
      <div style={{background:'var(--forest)',padding:'5rem 5vw 4rem'}}>
        <div style={{maxWidth:720}}>
          <Link href="/blog" style={{
            color:'var(--mint)',textDecoration:'none',fontSize:'.8rem',
            fontWeight:600,display:'inline-flex',alignItems:'center',gap:'.4rem',
            marginBottom:'1.2rem',
          }}>← Back to Insights</Link>
          <span style={{display:'inline-block',background:'var(--sage)',color:'white',
            fontSize:'.65rem',fontWeight:700,padding:'.3rem .65rem',borderRadius:100,
            textTransform:'uppercase',marginBottom:'.8rem'}}>Ergonomics Tips</span>
          <h1 className="serif" style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:700,
            color:'var(--cream)',lineHeight:1.15,letterSpacing:'-.02em'}}>
            {params.slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
          </h1>
          <div style={{display:'flex',alignItems:'center',gap:'1rem',marginTop:'1.2rem',
            fontSize:'.82rem',color:'rgba(246,242,235,.5)'}}>
            <span>ErgoAfya Team</span><span>·</span><span>May 2026</span><span>·</span><span>5 min read</span>
          </div>
        </div>
      </div>

      <div className="section" style={{background:'var(--cream)'}}>
        <div style={{maxWidth:720,margin:'0 auto'}}>
          <div style={{background:'var(--white)',border:'1px solid var(--border)',
            borderRadius:20,padding:'3rem',fontSize:'1rem',lineHeight:1.8,color:'var(--muted)'}}>
            <p style={{marginBottom:'1.2rem',fontSize:'1.05rem',color:'var(--forest)',fontWeight:500}}>
              This is a sample blog post for the ErgoAfya Solutions website.
              In production, full content is stored in Firestore and fetched via the <code>/api/blog</code> route.
            </p>
            <p style={{marginBottom:'1.2rem'}}>
              Ergonomics is the science of designing workplaces, products, and systems to fit the people who use them.
              Poor ergonomics in Kenyan workplaces leads to musculoskeletal disorders (MSDs),
              reduced productivity, and increased absenteeism.
            </p>
            <p>
              ErgoAfya Solutions provides practical, evidence-based interventions that prevent
              these injuries and build healthier, more productive organisations across Kenya.
            </p>
          </div>

          <div style={{marginTop:'3rem',background:'var(--forest)',borderRadius:20,
            padding:'2.5rem',textAlign:'center'}}>
            <h3 className="serif" style={{color:'var(--cream)',fontSize:'1.6rem',
              fontWeight:700,marginBottom:'.8rem'}}>Ready to Protect Your Team?</h3>
            <p style={{color:'rgba(246,242,235,.6)',marginBottom:'1.5rem',fontSize:'.9rem'}}>
              Book an ergonomic assessment with ErgoAfya Solutions today.
            </p>
            <Link href="/#booking" className="btn btn-sage">Book an Assessment →</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
