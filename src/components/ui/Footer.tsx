import Link from 'next/link'
import { ErgoAfyaLogo } from './Logo'

const services = [
  'Ergonomic Assessments','Workstation Design','Manual Handling Training',
  'MSD Health Programs','Return-to-Work','Assistive Devices',
]
const company = [
  { label:'About ErgoAfya', href:'/#about'    },
  { label:'Our Approach',   href:'/#approach' },
  { label:'Clients',        href:'/#clients'  },
  { label:'Insights/Blog',  href:'/blog'      },
  { label:'Book Assessment',href:'/#booking'  },
]

export default function Footer() {
  return (
    <footer style={{background:'#061410',color:'rgba(246,242,235,.45)',padding:'3rem 5vw 1.5rem'}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'3rem'}}
           className="footer-grid">

        <div>
          <div style={{marginBottom:'1rem'}}>
            <ErgoAfyaLogo size={52} variant="full" />
          </div>
          <p style={{fontSize:'.83rem',lineHeight:1.7,maxWidth:260,marginTop:'.8rem'}}>
            Kenya-based ergonomics &amp; occupational health consultancy.
            Led by a licensed Occupational Therapist. Evidence-based, practical, affordable.
          </p>
          <p style={{fontSize:'.72rem',color:'#4aac78',fontStyle:'italic',marginTop:'.6rem'}}>
            Healthy People • Productive Workplace
          </p>
        </div>

        <div>
          <h4 style={{fontWeight:700,fontSize:'.82rem',textTransform:'uppercase',
            letterSpacing:'.08em',color:'rgba(246,242,235,.65)',marginBottom:'1rem'}}>Services</h4>
          <ul style={{listStyle:'none',display:'grid',gap:'.55rem'}}>
            {services.map(s=>(
              <li key={s}><Link href="/#services" className="footer-link"
                style={{color:'rgba(246,242,235,.4)',textDecoration:'none',fontSize:'.82rem',
                  transition:'color .2s'}}>
                {s}
              </Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{fontWeight:700,fontSize:'.82rem',textTransform:'uppercase',
            letterSpacing:'.08em',color:'rgba(246,242,235,.65)',marginBottom:'1rem'}}>Company</h4>
          <ul style={{listStyle:'none',display:'grid',gap:'.55rem'}}>
            {company.map(c=>(
              <li key={c.href}><Link href={c.href} className="footer-link"
                style={{color:'rgba(246,242,235,.4)',textDecoration:'none',fontSize:'.82rem',transition:'color .2s'}}>
                {c.label}
              </Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{fontWeight:700,fontSize:'.82rem',textTransform:'uppercase',
            letterSpacing:'.08em',color:'rgba(246,242,235,.65)',marginBottom:'1rem'}}>Contact</h4>
          <ul style={{listStyle:'none',display:'grid',gap:'.7rem',fontSize:'.82rem'}}>
            {[
              {icon:'📞', text:'+254 712 251 520',    href:'tel:+254712251520'},
              {icon:'💬', text:'WhatsApp: 0734 251 520', href:'https://wa.me/254734251520'},
              {icon:'✉️', text:'ergoafya@mail.com',   href:'mailto:ergoafya@mail.com'},
              {icon:'📍', text:'Upperhill Gardens, 3rd Ngong Ave, Nairobi', href:'/#booking'},
            ].map(item=>(
              <li key={item.href}>
                <a href={item.href} className="footer-contact-link" style={{color:'rgba(246,242,235,.45)',textDecoration:'none',
                  display:'flex',gap:'.5rem',alignItems:'flex-start',lineHeight:1.5,transition:'color .2s'}}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{height:1,background:'rgba(74,172,120,.1)',marginBottom:'1.5rem'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
        flexWrap:'wrap',gap:'1rem',fontSize:'.77rem'}}>
        <span>© {new Date().getFullYear()} ErgoAfya Solutions. All rights reserved. Nairobi, Kenya.</span>
        <span style={{color:'#4aac78',fontStyle:'italic'}}>Healthy People • Productive Workplace</span>
      </div>
    </footer>
  )
}
