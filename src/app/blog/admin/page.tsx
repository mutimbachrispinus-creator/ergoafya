'use client'
import { useState, useEffect, useRef } from 'react'

const iStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--white)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '0.85rem 1.1rem',
  color: 'var(--forest)',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.92rem',
  outline: 'none',
  transition: 'all 0.25s',
  boxShadow: 'inset 0 1px 2px rgba(15,35,24,0.02)',
}

const lStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '.07em',
  marginBottom: '0.45rem',
}

const CATS = [
  'Ergonomics Tips',
  'Healthcare',
  'Workstation Design',
  'Training',
  'Rehabilitation',
  'Announcement',
  'Research'
]

function parseMarkdown(md: string) {
  if (!md) return ''
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h4 style="font-size:1.1rem;font-weight:700;color:var(--forest);margin:1rem 0 0.5rem">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="font-size:1.25rem;font-weight:700;color:var(--forest);margin:1.2rem 0 0.6rem">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 style="font-size:1.5rem;font-weight:700;color:var(--forest);margin:1.5rem 0 0.8rem">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:var(--card);padding:2px 6px;border-radius:4px;font-size:0.9em;color:var(--leaf);border:1px solid var(--border)">$1</code>')
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left:4px solid var(--sage);padding-left:1rem;margin:1rem 0;color:var(--muted);font-style:italic">$1</blockquote>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:var(--leaf);text-decoration:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/^\s*\-\s+(.*$)/gim, '<li style="margin-left:1.5rem;list-style-type:disc">$1</li>')
    .split(/\n\s*\n/g)
    .map(p => {
      const trimmed = p.trim()
      if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li')) {
        return p
      }
      return `<p style="margin-bottom:0.8rem;line-height:1.75">${p}</p>`
    })
    .join('\n')

  return html
}

export default function BlogAdminPage() {
  // 'checking' | 'login' | 'authed'
  const [authState, setAuthState] = useState<'checking' | 'login' | 'authed'>('checking')
  const [sessionToken, setSessionToken] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  // Login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [posts, setPosts] = useState<any[]>([])
  const [postsLoading, setPostsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'err'>('idle')
  const [saveError, setSaveError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: 'Ergonomics Tips',
    excerpt: '',
    content: '',
    published: false,
  })
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Missing Setup states
  const [bootstrapSecret, setBootstrapSecret] = useState('')
  const [setupUsername, setSetupUsername] = useState('')
  const [setupPassword, setSetupPassword] = useState('')
  const [setupConfirm, setSetupConfirm] = useState('')

  // Missing Change Creds states
  const [showChangeCreds, setShowChangeCreds] = useState(false)
  const [changeCredsLoading, setChangeCredsLoading] = useState(false)
  const [changeCredsMsg, setChangeCredsMsg] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // On mount: try stored token, otherwise show login
  useEffect(() => {
    const stored = localStorage.getItem('ergoafya_admin_token')
    if (stored) {
      loginWithToken(stored)
    } else {
      setAuthState('login')
    }
  }, [])

  async function loginWithToken(token: string) {
    try {
      const res = await fetch('/api/blog', { headers: { 'Authorization': `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setSessionToken(token)
        setAuthState('authed')
        setPosts(data.posts || [])
        return
      }
    } catch {}
    localStorage.removeItem('ergoafya_admin_token')
    setAuthState('login')
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/blog/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('ergoafya_admin_token', data.sessionToken)
        setSessionToken(data.sessionToken)
        setAuthState('authed')
        fetchPosts(data.sessionToken)
      } else {
        setAuthError(data.error || 'Invalid credentials.')
      }
    } catch {
      setAuthError('Connection failed. Is the server running?')
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault()
    if (setupPassword !== setupConfirm) { setAuthError('Passwords do not match.'); return }
    if (setupPassword.length < 8) { setAuthError('Password must be at least 8 characters.'); return }
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/blog/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bootstrapSecret, username: setupUsername, password: setupPassword }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('ergoafya_admin_token', data.sessionToken)
        setSessionToken(data.sessionToken)
        setAuthState('authed')
        fetchPosts(data.sessionToken)
      } else {
        setAuthError(data.error || 'Setup failed.')
      }
    } catch {
      setAuthError('Connection failed.')
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleChangeCreds(e: React.FormEvent) {
    e.preventDefault()
    setChangeCredsLoading(true)
    setChangeCredsMsg('')
    try {
      const res = await fetch('/api/blog/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionToken}` },
        body: JSON.stringify({ newUsername: newUsername || undefined, newPassword: newPassword || undefined }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setChangeCredsMsg('✅ Credentials updated successfully!')
        setNewUsername('')
        setNewPassword('')
        setTimeout(() => { setShowChangeCreds(false); setChangeCredsMsg('') }, 2000)
      } else {
        setChangeCredsMsg(`⚠️ ${data.error || 'Update failed.'}`)
      }
    } catch {
      setChangeCredsMsg('⚠️ Connection failed.')
    } finally {
      setChangeCredsLoading(false)
    }
  }

  async function fetchPosts(token: string) {
    setPostsLoading(true)
    try {
      const res = await fetch('/api/blog', { headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      if (res.ok) setPosts(data.posts || [])
    } catch (e) { console.error('Failed to load posts', e) }
    finally { setPostsLoading(false) }
  }

  function handleLogout() {
    localStorage.removeItem('ergoafya_admin_token')
    setAuthState('login')
    setSessionToken('')
    setPosts([])
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault()
    if (form.title.length < 5) return alert('Title must be at least 5 characters')
    if (form.content.length < 50) return alert('Content must be at least 50 characters')
    setStatus('saving'); setSaveError('')
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionToken}` },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Save failed')
      setStatus('ok')
      fetchPosts(sessionToken)
      setForm({ title: '', category: 'Ergonomics Tips', excerpt: '', content: '', published: false })
      setActiveTab('edit')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err: any) { setStatus('err'); setSaveError(err.message || 'Failed to publish post.') }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${sessionToken}` }
      })
      if (res.ok) { setPosts(prev => prev.filter(p => p.id !== id)); setDeleteConfirmId(null) }
      else alert('Failed to delete post.')
    } catch { alert('Error connecting to API.') }
  }

  function insertFormatting(type: string) {
    const textarea = textareaRef.current; if (!textarea) return
    const start = textarea.selectionStart, end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)
    const map: Record<string, string> = {
      bold: `**${selected || 'bold text'}**`, italic: `*${selected || 'italic text'}*`,
      h2: `\n## ${selected || 'Heading 2'}\n`, h3: `\n### ${selected || 'Heading 3'}\n`,
      quote: `\n> ${selected || 'Blockquote'}\n`, list: `\n- ${selected || 'List item'}\n`,
      link: `[${selected || 'Link Title'}](https://example.com)`,
    }
    const replacement = map[type]; if (!replacement) return
    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
    setForm(f => ({ ...f, content: newContent }))
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + replacement.length, start + replacement.length) }, 50)
  }

  const wordCount = form.content.trim() ? form.content.trim().split(/\s+/).length : 0
  const charCount = form.content.length

  // ── Checking state ──────────────────────────────────────────────────────────
  if (authState === 'checking') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔐</div>
          <p style={{ fontFamily: "'Outfit', sans-serif" }}>Checking authentication…</p>
        </div>
      </main>
    )
  }

  // ── First-time setup state ──────────────────────────────────────────────────
  if (authState === 'setup') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '100px 1.5rem 2rem' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, padding: '3rem 2.5rem', width: '100%', maxWidth: 480, boxShadow: 'var(--shadow)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem' }}>🔧</span>
            <h1 className="serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest)', marginTop: '0.5rem' }}>Create Admin Account</h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.4rem' }}>One-time setup. Only one admin account is allowed.</p>
          </div>
          <form onSubmit={handleSetup} style={{ display: 'grid', gap: '1.1rem' }}>
            <div>
              <label style={lStyle}>Bootstrap Secret (from ADMIN_SECRET env var)</label>
              <input type="password" value={bootstrapSecret} onChange={e => setBootstrapSecret(e.target.value)} style={iStyle} placeholder="Paste the ADMIN_SECRET value" required />
            </div>
            <div>
              <label style={lStyle}>Choose Username</label>
              <input type="text" value={setupUsername} onChange={e => setSetupUsername(e.target.value)} style={iStyle} placeholder="e.g. ergoafya_admin" minLength={4} required />
            </div>
            <div>
              <label style={lStyle}>Choose Password</label>
              <input type="password" value={setupPassword} onChange={e => setSetupPassword(e.target.value)} style={iStyle} placeholder="Min 8 characters" minLength={8} required />
            </div>
            <div>
              <label style={lStyle}>Confirm Password</label>
              <input type="password" value={setupConfirm} onChange={e => setSetupConfirm(e.target.value)} style={iStyle} placeholder="Re-enter password" required />
            </div>
            {authError && <p style={{ color: '#d94624', fontSize: '0.8rem' }}>⚠️ {authError}</p>}
            <button type="submit" disabled={authLoading} style={{ background: 'linear-gradient(135deg, var(--leaf), var(--forest))', color: 'white', border: 'none', borderRadius: 100, padding: '1rem', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', opacity: authLoading ? 0.7 : 1 }}>
              {authLoading ? 'Creating Account…' : 'Create Admin Account →'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ── Login state ─────────────────────────────────────────────────────────────
  if (authState === 'login') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '100px 1.5rem 2rem' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, padding: '3.5rem 2.5rem', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'inline-block', marginBottom: '1rem' }}>🛡️</span>
          <h1 className="serif" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--forest)' }}>Administrator Portal</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.4rem', marginBottom: '2rem' }}>Sign in to manage ErgoAfya blog &amp; news posts</p>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={lStyle}>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={iStyle} placeholder="Your admin username" autoComplete="username" required />
            </div>
            <div>
              <label style={lStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ ...iStyle, paddingRight: '3rem' }} placeholder="••••••••" autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--muted)' }}>{showPassword ? '🙈' : '👁️'}</button>
              </div>
            </div>
            {authError && <p style={{ color: '#d94624', fontSize: '0.8rem' }}>⚠️ {authError}</p>}
            <button type="submit" disabled={authLoading} style={{ background: 'linear-gradient(135deg, var(--leaf), var(--forest))', color: 'white', border: 'none', borderRadius: 100, padding: '1rem', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.4rem', opacity: authLoading ? 0.7 : 1 }}>
              {authLoading ? 'Signing In…' : 'Sign In →'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const totalPostsCount = posts.length
  const publishedCount = posts.filter(p => p.published).length
  const draftsCount = posts.filter(p => !p.published).length
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category || 'Announcement'))).length

  return (
    <main style={{ paddingTop: 72, background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Change credentials modal */}
      {showChangeCreds && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--white)', borderRadius: 20, padding: '2.5rem', width: '100%', maxWidth: 420, boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <h2 className="serif" style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: '1.5rem' }}>🔐 Change Credentials</h2>
            <form onSubmit={handleChangeCreds} style={{ display: 'grid', gap: '1rem' }}>
              <div><label style={lStyle}>New Username (leave blank to keep)</label><input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} style={iStyle} placeholder="New username" /></div>
              <div><label style={lStyle}>New Password (leave blank to keep)</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={iStyle} placeholder="New password (min 8 chars)" /></div>
              {changeCredsMsg && <p style={{ fontSize: '0.82rem', color: changeCredsMsg.startsWith('✅') ? 'var(--sage)' : '#d94624' }}>{changeCredsMsg}</p>}
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button type="submit" disabled={changeCredsLoading} style={{ flex: 1, background: 'var(--forest)', color: 'white', border: 'none', borderRadius: 100, padding: '0.8rem', fontFamily: "'Outfit',sans-serif", fontWeight: 700, cursor: 'pointer' }}>{changeCredsLoading ? 'Saving…' : 'Save Changes'}</button>
                <button type="button" onClick={() => setShowChangeCreds(false)} style={{ flex: 1, background: 'var(--cream)', color: 'var(--forest)', border: '1px solid var(--border)', borderRadius: 100, padding: '0.8rem', fontFamily: "'Outfit',sans-serif", fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="admin-gradient-header" style={{ padding: '3rem 5vw 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', color: 'var(--mint)', fontSize: '0.68rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>● Live</span>
          <h1 className="serif" style={{ color: 'var(--cream)', fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.1 }}>ErgoAfya Publishing Hub</h1>
          <p style={{ color: 'rgba(246,242,235,0.75)', fontSize: '0.88rem', marginTop: '0.4rem' }}>Create and publish articles to educate and grow Kenyan businesses.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowChangeCreds(true)} style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '0.6rem 1.2rem', fontFamily: "'Outfit',sans-serif", fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>⚙️ Settings</button>
          <button onClick={handleLogout} style={{ background: 'rgba(217,70,36,0.2)', color: '#ffb3a0', border: '1px solid rgba(217,70,36,0.3)', borderRadius: 100, padding: '0.6rem 1.2rem', fontFamily: "'Outfit',sans-serif", fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>🔒 Lock</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '2rem 5vw 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.2rem' }}>
        {[['Total Articles', totalPostsCount, 'var(--sage)'],['Published', publishedCount,'var(--mint)'],['Drafts', draftsCount,'var(--warm)'],['Categories', uniqueCategories,'var(--purple)']].map(([label, val, color]) => (
          <div key={label as string} className="admin-stat-card" style={{ background: 'var(--white)', borderLeft: `4px solid ${color}` }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--forest)', marginTop: '0.2rem' }}>{val}</div>
          </div>
        ))}
      </div>


      <div className="section" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start', paddingBottom: '6rem', paddingTop: '2rem' }}>
        
        {/* Left Column: Post Composer */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 24, padding: '2.5rem', boxShadow: '0 4px 20px rgba(15,35,24,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.8rem' }}>
            <h2 className="serif" style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--forest)' }}>
              ✍️ Write New Article
            </h2>
            
            {/* Editor Tabs */}
            <div style={{ display: 'flex', background: 'var(--cream)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                style={{
                  padding: '0.4rem 1rem',
                  border: 'none',
                  borderRadius: 6,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === 'edit' ? 'var(--white)' : 'transparent',
                  color: activeTab === 'edit' ? 'var(--forest)' : 'var(--muted)',
                  boxShadow: activeTab === 'edit' ? '0 1px 3px rgba(15,35,24,0.05)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                style={{
                  padding: '0.4rem 1rem',
                  border: 'none',
                  borderRadius: 6,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === 'preview' ? 'var(--white)' : 'transparent',
                  color: activeTab === 'preview' ? 'var(--forest)' : 'var(--muted)',
                  boxShadow: activeTab === 'preview' ? '0 1px 3px rgba(15,35,24,0.05)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Live Preview
              </button>
            </div>
          </div>

          {activeTab === 'edit' ? (
            <form onSubmit={savePost} style={{ display: 'grid', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.2rem' }} className="composer-row-1">
                <div>
                  <label style={lStyle}>Title *</label>
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    style={iStyle}
                    placeholder="e.g. Back Pain Prevention Checklist for Corporate Offices"
                    required
                  />
                </div>
                <div>
                  <label style={lStyle}>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    style={{ ...iStyle, WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234a6358\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.1em', paddingRight: '2rem' }}
                  >
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={lStyle}>Excerpt (Shown in listing - Max 180 chars)</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value.slice(0, 180) }))}
                  rows={2}
                  style={{ ...iStyle, resize: 'vertical' }}
                  placeholder="Summarize the article in 2 sentences to catch readers' attention..."
                  required
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--light)', display: 'block', textAlign: 'right', marginTop: 4 }}>
                  {form.excerpt.length}/180 characters
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ ...lStyle, marginBottom: 0 }}>Content * (Markdown format)</label>
                  
                  {/* Markdown Toolbar */}
                  <div style={{ display: 'flex', gap: '0.2rem', background: 'var(--cream)', padding: '2px 4px', borderRadius: 6, border: '1px solid var(--border)' }}>
                    <button type="button" onClick={() => insertFormatting('h2')} title="Heading 2" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 'bold', color: 'var(--muted)' }}>H2</button>
                    <button type="button" onClick={() => insertFormatting('h3')} title="Heading 3" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 'bold', color: 'var(--muted)' }}>H3</button>
                    <button type="button" onClick={() => insertFormatting('bold')} title="Bold" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 'bold', color: 'var(--muted)' }}>B</button>
                    <button type="button" onClick={() => insertFormatting('italic')} title="Italic" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', fontStyle: 'italic', color: 'var(--muted)' }}>I</button>
                    <button type="button" onClick={() => insertFormatting('quote')} title="Quote" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--muted)' }}>“</button>
                    <button type="button" onClick={() => insertFormatting('list')} title="List" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--muted)' }}>•</button>
                    <button type="button" onClick={() => insertFormatting('link')} title="Insert Link" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0.45rem', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--muted)' }}>🔗</button>
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={12}
                  style={{ ...iStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.5 }}
                  placeholder="Type your content using Markdown. e.g. ## Core Exercises for Back Care..."
                  required
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: '0.7rem', color: 'var(--light)' }}>
                  <span>Tip: Use double enter to separate paragraphs.</span>
                  <span>{wordCount} words | {charCount} chars</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', margin: '0.4rem 0' }}>
                <input
                  type="checkbox"
                  id="pub"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: 'var(--sage)', cursor: 'pointer' }}
                />
                <label htmlFor="pub" style={{ fontSize: '0.88rem', color: 'var(--muted)', cursor: 'pointer', fontWeight: 500 }}>
                  Publish immediately (otherwise save as Draft announcement)
                </label>
              </div>

              {status === 'err' && (
                <div style={{ background: '#fcf3f2', border: '1px solid #f2cfca', color: '#d94624', padding: '0.8rem 1.2rem', borderRadius: 10, fontSize: '0.8rem' }}>
                  ❌ {saveError}
                </div>
              )}

              {status === 'ok' && (
                <div style={{ background: '#f2fcf6', border: '1px solid #cbf2da', color: 'var(--sage)', padding: '0.8rem 1.2rem', borderRadius: 10, fontSize: '0.8rem' }}>
                  🎉 Article published successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'saving'}
                style={{
                  background: 'linear-gradient(135deg, var(--sage), var(--leaf))',
                  color: 'white',
                  border: 'none',
                  borderRadius: 100,
                  padding: '1.1rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  boxShadow: '0 4px 15px rgba(74,172,120,0.2)',
                  opacity: status === 'saving' ? 0.7 : 1,
                  marginTop: '0.5rem',
                }}
              >
                {status === 'saving' ? 'Publishing Article...' : 'Upload & Publish Article →'}
              </button>
            </form>
          ) : (
            /* Live Preview tab */
            <div style={{ background: 'var(--cream)', borderRadius: 16, border: '1px solid var(--border)', padding: '2rem', minHeight: 400 }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'inline-block', background: 'var(--sage)', color: 'white', fontSize: '0.62rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: 100, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  {form.category}
                </span>
                <h1 className="serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest)', lineHeight: 1.25 }}>
                  {form.title || 'Untitled Post Preview'}
                </h1>
                <div style={{ fontSize: '0.78rem', color: 'var(--light)', marginTop: '0.5rem' }}>
                  By ErgoAfya Team · {new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })} · {Math.max(1, Math.ceil(wordCount / 200))} min read
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.2rem 0' }} />
              {form.excerpt && (
                <p style={{ fontStyle: 'italic', fontSize: '0.98rem', color: 'var(--muted)', marginBottom: '1.5rem', borderLeft: '3px solid var(--light)', paddingLeft: '1rem', lineHeight: 1.6 }}>
                  {form.excerpt}
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: parseMarkdown(form.content) || '<p style="color:var(--light)">No content typed yet. Switch back to Editor to compose.</p>' }}
                style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.8 }}
              />
            </div>
          )}
        </div>

        {/* Right Column: Manage / Catalog List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="serif" style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--forest)' }}>
              📋 Published Catalog
            </h2>
            <span style={{ fontSize: '0.78rem', background: 'var(--white)', border: '1px solid var(--border)', padding: '0.3rem 0.7rem', borderRadius: 100, color: 'var(--muted)', fontWeight: 600 }}>
              {posts.length} Total
            </span>
          </div>

          {postsLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ background: 'var(--white)', borderRadius: 16, border: '1px solid var(--border)', padding: '1.2rem', display: 'flex', gap: '1rem', flexDirection: 'column', opacity: 0.6 }}>
                  <div style={{ height: 12, background: 'var(--cream)', borderRadius: 10, width: '40%' }} />
                  <div style={{ height: 16, background: 'var(--cream)', borderRadius: 10, width: '85%' }} />
                  <div style={{ height: 12, background: 'var(--cream)', borderRadius: 10, width: '25%' }} />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: '3rem 2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.92rem' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>📭</span>
              No posts found. Publish your first article to display it here.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {posts.map((p) => {
                const isConfirming = deleteConfirmId === p.id
                return (
                  <div
                    key={p.id}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      padding: '1.2rem',
                      transition: 'all 0.25s',
                      boxShadow: '0 2px 8px rgba(15,35,24,0.01)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                          {p.category}
                        </span>
                        <h3 style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--forest)', margin: '0.2rem 0 0.3rem', lineHeight: 1.35 }}>
                          {p.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--light)' }}>
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }) : 'Date unknown'}
                          </span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--light)' }} />
                          <span style={{
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 100,
                            background: p.published ? 'rgba(74,172,120,0.1)' : 'rgba(232,184,75,0.1)',
                            color: p.published ? 'var(--sage)' : 'var(--earth)',
                            fontWeight: 700
                          }}>
                            {p.published ? 'Live' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0, alignItems: 'center' }}>
                        {!isConfirming && (
                          <Link
                            href={`/blog/${p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}?id=${p.id}`}
                            target="_blank"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--light)',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              padding: '0.2rem 0.4rem',
                              borderRadius: 6,
                              transition: 'all 0.2s',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--sage)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--light)'}
                            title="View Article Details"
                          >
                            👁️
                          </Link>
                        )}
                        {isConfirming ? (
                          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                            <button
                              onClick={() => handleDelete(p.id)}
                              style={{
                                background: '#d94624',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                padding: '0.35rem 0.6rem',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              style={{
                                background: 'var(--cream)',
                                color: 'var(--forest)',
                                border: '1px solid var(--border)',
                                borderRadius: 6,
                                padding: '0.35rem 0.6rem',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--light)',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              padding: '0.2rem 0.4rem',
                              borderRadius: 6,
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#d94624'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--light)'}
                            title="Delete Article"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .section {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .composer-row-1 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
