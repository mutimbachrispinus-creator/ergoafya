// Logo.tsx — SVG logo component matching the ErgoAfya brand mark
import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon' | 'horizontal'
  className?: string
  shinyText?: boolean
}

export function ErgoAfyaLogo({ size = 48, variant = 'horizontal', className = '', shinyText = false }: LogoProps) {
  
  // The core graphic is highly reusable. 
  // It represents a perfect ergonomic setup (desk, monitor, chair, person with perfect posture)
  // cradled inside a glowing green shield/leaf representing Health & Protection.
  const coreGraphic = (
    <g transform="translate(0, -5)">
      {/* Inner core - Shield / Leaf representing Afya (Health) */}
      <path d="M 100,35 C 145,35 160,80 160,110 C 160,150 100,175 100,175 C 100,175 40,150 40,110 C 40,80 55,35 100,35 Z" fill={shinyText ? "rgba(255,255,255,0.03)" : "rgba(74,172,120,0.08)"} stroke={shinyText ? "url(#accentGrad)" : "url(#leafGrad)"} strokeWidth="1.5" strokeDasharray="4 6" />

      {/* The Graphic (Ergonomic Setup) */}
      <g filter="url(#glow)">
        {/* Desk */}
        <path d="M 110,120 L 150,120" fill="none" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="5" strokeLinecap="round" />
        <path d="M 140,120 L 140,155" fill="none" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Monitor */}
        <rect x="118" y="82" width="24" height="32" rx="4" fill="none" stroke={shinyText ? "#f5d688" : "url(#leafGrad)"} strokeWidth="4.5" />
        <path d="M 130,114 L 130,120" stroke={shinyText ? "#f5d688" : "url(#leafGrad)"} strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Chair Base & Stem */}
        <path d="M 65,155 L 85,155" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 75,125 L 75,155" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 60,125 L 85,125" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="5" strokeLinecap="round" />
        
        {/* Chair Backrest */}
        <path d="M 65,125 Q 58,105 65,85" fill="none" stroke={shinyText ? "url(#accentGrad)" : "#1d5c38"} strokeWidth="5" strokeLinecap="round" />
        
        {/* Person */}
        <circle cx="85" cy="65" r="8.5" fill={shinyText ? "#7ed4a6" : "url(#leafGrad)"} />
        
        {/* Spine & Legs (Perfect Ergonomic Angle) */}
        <path d="M 82,78 Q 92,95 85,118 L 105,118 L 105,145" fill="none" stroke={shinyText ? "#7ed4a6" : "url(#leafGrad)"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Arm typing */}
        <path d="M 85,88 L 100,105 L 115,105" fill="none" stroke={shinyText ? "#7ed4a6" : "url(#leafGrad)"} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Posture indicators (Glowing dots on joints) */}
        <circle cx="85" cy="118" r="2.5" fill={shinyText ? "#fff" : "#0f2318"} />
        <circle cx="105" cy="118" r="2.5" fill={shinyText ? "#fff" : "#0f2318"} />
        <circle cx="100" cy="105" r="2.5" fill={shinyText ? "#fff" : "#0f2318"} />
      </g>
    </g>
  )

  const defs = (
    <defs>
      <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1d5c38" />
        <stop offset="100%" stopColor="#4aac78" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a843" />
        <stop offset="100%" stopColor="#e8b84b" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity={shinyText ? "0.2" : "0.05"} />
      </filter>
      <path id="tArc" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0" />
      <path id="bArc" d="M 100,100 m -76,0 a 76,76 0 0,0 152,0" />
    </defs>
  )

  if (variant === 'icon') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="ErgoAfya Solutions Logo">
        {defs}
        {coreGraphic}
      </svg>
    )
  }

  if (variant === 'full') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="ErgoAfya Solutions">
        {defs}
        {/* Circular text */}
        <text fontFamily="'Outfit', sans-serif" fontSize="13.5" fontWeight="800" fill={shinyText ? "#f5d688" : "#0f2318"} letterSpacing="3.5" filter={shinyText ? "drop-shadow(0px 2px 3px rgba(15,35,24,0.7))" : "none"}>
          <textPath href="#tArc" startOffset="50%" textAnchor="middle">ERGOAFYA SOLUTIONS</textPath>
        </text>
        <text fontFamily="'Outfit', sans-serif" fontSize="9" fontWeight="600" fill={shinyText ? "#7ed4a6" : "#4aac78"} letterSpacing="2.8" filter={shinyText ? "drop-shadow(0px 1px 2px rgba(15,35,24,0.7))" : "none"}>
          <textPath href="#bArc" startOffset="50%" textAnchor="middle">HEALTHY PEOPLE • PRODUCTIVE WORKPLACE</textPath>
        </text>
        {coreGraphic}
      </svg>
    )
  }

  // variant === 'horizontal'
  return (
    <svg viewBox="0 0 650 200" width={size * 3.5} height={size} className={className} aria-label="ErgoAfya Solutions">
      {defs}
      {coreGraphic}
      <g transform="translate(190, 110)">
        <text y="-10" fontFamily="'Outfit', sans-serif" fontSize="64" fontWeight="800" fill={shinyText ? "url(#accentGrad)" : "#0f2318"} letterSpacing="-0.5">
          Ergo<tspan fill={shinyText ? "#7ed4a6" : "url(#leafGrad)"}>Afya</tspan>
        </text>
        <text y="30" fontFamily="'Outfit', sans-serif" fontSize="22" fontWeight="600" fill={shinyText ? "#f5d688" : "#4a6358"} letterSpacing="4">
          SOLUTIONS
        </text>
      </g>
    </svg>
  )
}
