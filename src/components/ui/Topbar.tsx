import Link from 'next/link'

export default function Topbar() {
  return (
    <div className="topbar" style={{ height: 36, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <a href="tel:+254712251520" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
          📞 +254 712 251 520
        </a>
        <a href="mailto:ergoafya@gmail.com" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
          ✉️ ergoafya@gmail.com
        </a>
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>📍 Upperhill Gardens, 3rd Ngong Ave, Nairobi</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="https://wa.me/254734251520" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>WhatsApp</a>
        <Link href="/booking" style={{ background: 'var(--sage)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.8rem', borderRadius: '100px', textDecoration: 'none', fontWeight: 700 }}>
          Book Now
        </Link>
      </div>
    </div>
  )
}
