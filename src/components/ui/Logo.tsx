// Logo.tsx — SVG logo component matching the ErgoAfya brand mark
// Person seated with spine dots, teal swoosh, circular text

import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon' | 'horizontal'
  className?: string
  shinyText?: boolean
}

export function ErgoAfyaLogo({ size = 48, variant = 'horizontal', className = '', shinyText = false }: LogoProps) {
  if (variant === 'icon') {
    // Just the emblem — no text
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={className}
        aria-label="ErgoAfya Solutions Logo"
      >
        <defs>
          <linearGradient id="logoRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d5c38"/>
            <stop offset="100%" stopColor="#4aac78"/>
          </linearGradient>
          <linearGradient id="logoSwooshGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4aac78"/>
            <stop offset="50%" stopColor="#2d7a4f"/>
            <stop offset="100%" stopColor="#4aac78"/>
          </linearGradient>
          <linearGradient id="logoBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2318"/>
            <stop offset="100%" stopColor="#1d5c38"/>
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Subtle background */}

        {/* Rings */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="url(#logoRingGrad)" strokeWidth="3.5"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#4aac78" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>

        {/* Swoosh */}
        <path d="M 68 50 Q 55 72 64 92 Q 73 112 60 135" stroke="url(#logoSwooshGrad)" strokeWidth="5.5" fill="none" strokeLinecap="round" filter="url(#logoGlow)"/>
        <path d="M 76 46 Q 62 68 72 94 Q 82 118 67 142" stroke="#4aac78" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4"/>

        {/* Head */}
        <circle cx="108" cy="42" r="10" fill="none" stroke="url(#logoBodyGrad)" strokeWidth="3"/>
        <path d="M 116 38 Q 118 35 117 42" stroke="#0f2318" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>

        {/* Torso */}
        <path d="M 108 52 Q 106 72 102 88" fill="none" stroke="url(#logoBodyGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Chair */}
        <path d="M 120 84 Q 122 95 120 106 Q 119 112 118 118" stroke="#0f2318" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <path d="M 72 118 L 120 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 96 118 L 96 144" stroke="#0f2318" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 78 148 L 114 148" stroke="#0f2318" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="80" cy="150" r="2.5" fill="#0f2318" opacity="0.4"/>
        <circle cx="112" cy="150" r="2.5" fill="#0f2318" opacity="0.4"/>

        {/* Pelvis + legs */}
        <path d="M 102 88 Q 98 100 85 112 Q 80 116 80 118" fill="none" stroke="url(#logoBodyGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 85 118 L 114 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 114 118 L 116 144" stroke="#0f2318" strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M 116 144 L 127 147" stroke="#0f2318" strokeWidth="2.2" strokeLinecap="round"/>

        {/* Arms */}
        <path d="M 106 65 Q 118 70 122 82" stroke="#0f2318" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <path d="M 122 82 Q 126 86 130 86" stroke="#0f2318" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>

        {/* Spine vertebrae with progressive opacity */}
        <circle cx="104" cy="58" r="3" fill="#4aac78" opacity="0.95"/>
        <circle cx="103.3" cy="66" r="2.8" fill="#4aac78" opacity="0.9"/>
        <circle cx="102.6" cy="74" r="2.6" fill="#4aac78" opacity="0.85"/>
        <circle cx="102" cy="82" r="2.4" fill="#4aac78" opacity="0.8"/>
        <circle cx="101" cy="89.5" r="2.2" fill="#4aac78" opacity="0.7"/>
        <circle cx="100" cy="96" r="2" fill="#4aac78" opacity="0.6"/>
      </svg>
    )
  }

  if (variant === 'full') {
    // Full circular badge with text
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={className}
        aria-label="ErgoAfya Solutions"
      >
        <defs>
          <linearGradient id="fRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d5c38"/>
            <stop offset="100%" stopColor="#4aac78"/>
          </linearGradient>
          <linearGradient id="fSwooshGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4aac78"/>
            <stop offset="50%" stopColor="#2d7a4f"/>
            <stop offset="100%" stopColor="#4aac78"/>
          </linearGradient>
          <linearGradient id="fBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2318"/>
            <stop offset="100%" stopColor="#1d5c38"/>
          </linearGradient>
          <filter id="fGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <path id="tArc" d="M 100,100 m -72,0 a 72,72 0 1,1 144,0"/>
          <path id="bArc" d="M 100,100 m -68,0 a 68,68 0 0,0 136,0"/>
          <linearGradient id="goldShiny" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b84b"/>
            <stop offset="50%" stopColor="#f5d688"/>
            <stop offset="100%" stopColor="#d4a843"/>
          </linearGradient>
        </defs>


        <circle cx="100" cy="100" r="95" fill="none" stroke="url(#fRingGrad)" strokeWidth="3.5"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#4aac78" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>

        {/* Swoosh */}
        <path d="M 68 50 Q 55 72 64 92 Q 73 112 60 135" stroke="url(#fSwooshGrad)" strokeWidth="5.5" fill="none" strokeLinecap="round" filter="url(#fGlow)"/>
        <path d="M 76 46 Q 62 68 72 94 Q 82 118 67 142" stroke="#4aac78" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4"/>

        {/* Figure */}
        <circle cx="108" cy="42" r="10" fill="none" stroke={shinyText ? "url(#goldShiny)" : "url(#fBodyGrad)"} strokeWidth="3"/>
        <path d="M 116 38 Q 118 35 117 42" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={shinyText ? 0.8 : 0.5}/>
        <path d="M 108 52 Q 106 72 102 88" fill="none" stroke={shinyText ? "url(#goldShiny)" : "url(#fBodyGrad)"} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 120 84 Q 122 95 120 106 Q 119 112 118 118" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <path d="M 72 118 L 120 118" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 96 118 L 96 144" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 78 148 L 114 148" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="80" cy="150" r="2.5" fill={shinyText ? "url(#goldShiny)" : "#0f2318"} opacity={shinyText ? 0.8 : 0.4}/>
        <circle cx="112" cy="150" r="2.5" fill={shinyText ? "url(#goldShiny)" : "#0f2318"} opacity={shinyText ? 0.8 : 0.4}/>
        <path d="M 102 88 Q 98 100 85 112 Q 80 116 80 118" fill="none" stroke={shinyText ? "url(#goldShiny)" : "url(#fBodyGrad)"} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 85 118 L 114 118" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 114 118 L 116 144" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M 116 144 L 127 147" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 106 65 Q 118 70 122 82" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <path d="M 122 82 Q 126 86 130 86" stroke={shinyText ? "url(#goldShiny)" : "#0f2318"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={shinyText ? 0.9 : 0.7}/>

        {/* Spine */}
        <circle cx="104" cy="58" r="3" fill="#4aac78" opacity="0.95"/>
        <circle cx="103.3" cy="66" r="2.8" fill="#4aac78" opacity="0.9"/>
        <circle cx="102.6" cy="74" r="2.6" fill="#4aac78" opacity="0.85"/>
        <circle cx="102" cy="82" r="2.4" fill="#4aac78" opacity="0.8"/>
        <circle cx="101" cy="89.5" r="2.2" fill="#4aac78" opacity="0.7"/>
        <circle cx="100" cy="96" r="2" fill="#4aac78" opacity="0.6"/>

        {/* Circular text */}
        <text fontFamily="Arial,sans-serif" fontSize="11.5" fontWeight="700" fill={shinyText ? "url(#goldShiny)" : "#0f2318"} letterSpacing="2.5" filter={shinyText ? "drop-shadow(0px 2px 3px rgba(15,35,24,0.85))" : "none"} stroke={shinyText ? "rgba(15,35,24,0.7)" : "none"} strokeWidth={shinyText ? "0.4" : "0"}>
          <textPath href="#tArc" startOffset="8%">ERGOAFYA SOLUTIONS</textPath>
        </text>
        <text fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill={shinyText ? "#7ed4a6" : "#1d5c38"} letterSpacing="1.8" filter={shinyText ? "drop-shadow(0px 1px 2px rgba(15,35,24,0.85))" : "none"} stroke={shinyText ? "rgba(15,35,24,0.7)" : "none"} strokeWidth={shinyText ? "0.25" : "0"}>
          <textPath href="#bArc" startOffset="3%">HEALTHY PEOPLE  •  PRODUCTIVE WORKPLACE</textPath>
        </text>
      </svg>
    )
  }

  // variant === 'horizontal' — icon + text side by side (nav usage)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className={className} aria-label="ErgoAfya Solutions">
      <ErgoAfyaLogo size={size} variant="icon" />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          fontSize: size * 0.35,
          color: '#0f2318',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>
          ErgoAfya
        </span>
        <span style={{
          fontSize: size * 0.18,
          fontWeight: 600,
          color: '#4aac78',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.12em',
          lineHeight: 1,
          marginTop: 2,
        }}>
          Solutions · Kenya
        </span>
      </div>
    </div>
  )
}

export default ErgoAfyaLogo
