'use client'
import { useState } from 'react'

// Simple owner blog admin panel — protected by a secret key stored in env
// In production wire to /api/blog POST with Authorization header

const iStyle: React.CSSProperties = {
  width:'100%', background:'var(--card)', border:'1px solid var(--border)',
  borderRadius:10, padding:'.8rem 1rem', color:'var(--forest)',
  fontFamily:"'Outfit',sans-serif", fontSize:'.9rem', outline:'none',
  transition:'border-color .25s',
}
const lStyle: React.CSSProperties = {
  display:'block', fontSize:'.7rem', fontWeight:700, color:'var(--muted)',
  textTransform:'uppercase', letterSpacing:'.07em', marginBottom:'.4rem',
}

const CATS = ['Ergonomics Tips','Healthcare','Workstation Design','Training','Rehabilitation','Announcement','Research']

export default function BlogAdminPage() {
  const [authed,    setAuthed]    = useState(false)
  const [secret,    setSecret]    = useState('')
  const [status,    setStatus]    = useState<'idle'|'saving'|'ok'|'err'>('idle')
  const [posts,     setPosts]     = useState<any[]>([])
  const [form,      setForm]      = useState({
    title:'', category:'Ergonomics Tips', excerpt:'', content:'', published: false,
  })

  function login() {
    // In prod compare against process.env.NEXT_PUBLIC_ADMIN_KEY or a server check
    if (secret.length > 4) { setAuthed(true) }
    else alert('Enter your admin secret key')
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    try {
      const res = await fetch('/api/blog', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${secret}` },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Save failed')
      setStatus('ok')
      setPosts(prev => [{ id: json.id, ...form, date: new Date().toLocaleDateString() }, ...prev])
      setForm({ title:'', category:'Ergonomics Tips', excerpt:'', content:'', published:false })
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err: any) { setStatus('err') }
  }

  if (!authed) return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',background:'var(--cream)',paddingTop:72}}>
      <div style={{background:'var(--white)',border:'1px solid var(--border)',
        borderRadius:20,padding:'3rem',width:'100%',maxWidth:400,boxShadow:'var(--shadow)'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'.5rem'}}>🔐</div>
          <h1 className="serif" style={{fontSize:'1.8rem',fontWeight:700,color:'var(--forest)'}}>Admin Panel</h1>
          <p style={{fontSize:'.85rem',color:'var(--muted)',marginTop:'.3rem'}}>ErgoAfya Blog Management</p>
        </div>
        <label style={lStyle}>Admin Secret Key</label>
        <input type="password" value={secret} onChange={e=>setSecret(e.target.value)}
          style={iStyle} placeholder="Enter your secret key"
          onKeyDown={e=>e.key==='Enter'&&login()}/>
        <button onClick={login} style={{
          width:'100%',marginTop:'1.2rem',background:'var(--forest)',color:'var(--cream)',
          border:'none',borderRadius:100,padding:'.9rem',fontFamily:"'Outfit',sans-serif",
          fontSize:'.95rem',fontWeight:700,cursor:'pointer',
        }}>Login →</button>
      </div>
    </main>
  )

  return (
    <main style={{paddingTop:72,background:'var(--cream)',minHeight:'100vh'}}>
      <div style={{background:'var(--forest)',padding:'3rem 5vw 2.5rem'}}>
        <h1 className="serif" style={{color:'var(--cream)',fontSize:'2rem',fontWeight:700}}>
          Blog Admin Panel
        </h1>
        <p style={{color:'rgba(246,242,235,.55)',fontSize:'.85rem',marginTop:'.3rem'}}>
          Create, publish, and manage ErgoAfya blog posts &amp; announcements
        </p>
      </div>

      <div className="section" style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',
        gap:'3rem',alignItems:'start'}} >

        {/* New post form */}
        <div style={{background:'var(--white)',border:'1px solid var(--border)',
          borderRadius:20,padding:'2rem'}}>
          <h2 style={{fontWeight:700,fontSize:'1.1rem',color:'var(--forest)',
            marginBottom:'1.5rem'}}>✏️ New Post / Announcement</h2>
          <form onSubmit={savePost} style={{display:'grid',gap:'1rem'}}>
            <div><label style={lStyle}>Title *</label>
              <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}
                style={iStyle} placeholder="5 Posture Tips for Nairobi Office Workers..." required/></div>
            <div><label style={lStyle}>Category</label>
              <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                style={{...iStyle, WebkitAppearance:'none'}}>
                {CATS.map(c=><option key={c}>{c}</option>)}
              </select></div>
            <div><label style={lStyle}>Excerpt (shown in listing)</label>
              <textarea value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))}
                rows={2} style={{...iStyle,resize:'vertical'}}
                placeholder="Brief summary shown on the blog listing page..."/></div>
            <div><label style={lStyle}>Full Content *</label>
              <textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))}
                rows={10} style={{...iStyle,resize:'vertical'}}
                placeholder="Write your full article here... Markdown supported." required/></div>
            <div style={{display:'flex',alignItems:'center',gap:'.7rem'}}>
              <input type="checkbox" id="pub" checked={form.published}
                onChange={e=>setForm(f=>({...f,published:e.target.checked}))}
                style={{width:16,height:16,accentColor:'var(--sage)'}}/>
              <label htmlFor="pub" style={{fontSize:'.85rem',color:'var(--muted)',cursor:'pointer'}}>
                Publish immediately (visible to all visitors)
              </label>
            </div>
            {status==='err' && <p style={{color:'#e05c3a',fontSize:'.82rem'}}>Save failed — check your connection.</p>}
            {status==='ok'  && <p style={{color:'var(--sage)',fontSize:'.82rem'}}>✅ Post saved successfully!</p>}
            <button type="submit" disabled={status==='saving'} style={{
              background:'linear-gradient(135deg,var(--sage),var(--leaf))',color:'white',
              border:'none',borderRadius:100,padding:'1rem',fontFamily:"'Outfit',sans-serif",
              fontSize:'.95rem',fontWeight:700,cursor:'pointer',opacity:status==='saving'?.7:1,
            }}>{status==='saving' ? '⏳ Saving...' : '📤 Publish Post'}</button>
          </form>
        </div>

        {/* Recent posts */}
        <div>
          <h2 style={{fontWeight:700,fontSize:'1.1rem',color:'var(--forest)',marginBottom:'1.2rem'}}>
            📋 Recent Posts
          </h2>
          {posts.length === 0 ? (
            <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:14,
              padding:'2rem',textAlign:'center',color:'var(--muted)',fontSize:'.9rem'}}>
              No posts yet. Create your first post →
            </div>
          ) : posts.map((p,i)=>(
            <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',
              borderRadius:14,padding:'1.2rem',marginBottom:'.8rem',
              display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem'}}>
              <div>
                <span style={{fontSize:'.65rem',fontWeight:700,color:'var(--sage)',
                  textTransform:'uppercase',letterSpacing:'.07em'}}>{p.category}</span>
                <h3 style={{fontWeight:700,fontSize:'.9rem',color:'var(--forest)',
                  margin:'.2rem 0 .3rem',lineHeight:1.3}}>{p.title}</h3>
                <span style={{fontSize:'.72rem',color:'var(--light)'}}>{p.date}</span>
              </div>
              <div style={{display:'flex',gap:'.4rem',flexShrink:0}}>
                <span style={{fontSize:'.7rem',padding:'.25rem .6rem',borderRadius:100,
                  background: p.published ? 'rgba(74,172,120,.12)' : 'rgba(232,184,75,.12)',
                  color: p.published ? 'var(--sage)' : 'var(--warm)',fontWeight:600}}>
                  {p.published ? '✅ Live' : '⏸ Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.admin-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  )
}
