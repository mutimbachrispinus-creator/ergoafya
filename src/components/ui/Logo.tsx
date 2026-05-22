// Logo.tsx — SVG logo component matching the ErgoAfya brand mark
import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon' | 'horizontal'
  className?: string
  shinyText?: boolean
}

export function ErgoAfyaLogo({ size = 48, variant = 'horizontal', className = '', shinyText = false }: LogoProps) {
  
  // The core graphic illustrates a person standing, hunched over, holding their lower back.
  // A glowing red/orange node clearly indicates the pain point, matching the "occupational health" theme.
  const coreGraphic = (
    <g transform="translate(0, -5)">
      {/* Background medical/health ring */}
      <circle cx="100" cy="105" r="48" fill="none" stroke={shinyText ? "rgba(255,255,255,0.1)" : "rgba(74,172,120,0.15)"} strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="100" cy="105" r="40" fill={shinyText ? "rgba(255,255,255,0.02)" : "rgba(74,172,120,0.05)"} />

      <g filter="url(#glow)">
        {/* Person (Hunched in pain, facing left) */}
        
        {/* Head dropped forward */}
        <circle cx="82" cy="62" r="8.5" fill={shinyText ? "#f5d688" : "url(#leafGrad)"} />
        
        {/* Spine/Body: Hunched forward, back protruding right */}
        <path d="M 85,75 Q 125,85 105,120 L 100,150" fill="none" stroke={shinyText ? "#f5d688" : "url(#leafGrad)"} strokeWidth="6" strokeLinecap="round" />
        
        {/* Second leg (slightly bent forward for balance) */}
        <path d="M 103,130 L 115,150" fill="none" stroke={shinyText ? "#f5d688" : "url(#leafGrad)"} strokeWidth="6" strokeLinecap="round" opacity="0.4" />
        
        {/* Arm reaching back to hold the lower back */}
        <path d="M 90,82 Q 95,115 116,105" fill="none" stroke={shinyText ? "#f5d688" : "url(#leafGrad)"} strokeWidth="5" strokeLinecap="round" />
        
        {/* The Pain Indicator (Glowing red/orange lumbar area) */}
        <g transform="translate(112, 103)">
          <circle cx="0" cy="0" r="4" fill="#e74c3c" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="#e74c3c" strokeWidth="2.5" opacity="0.8" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#e74c3c" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 3" />
          {/* Subtle pulse lines indicating radiating pain */}
          <path d="M 10,-10 L 15,-15 M 14,0 L 20,0 M 10,10 L 15,15" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
      </g>
    </g>
  )

  const defs = (
    <defs>
      <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0f2318" />
        <stop offset="100%" stopColor="#4aac78" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a843" />
        <stop offset="100%" stopColor="#e8b84b" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity={shinyText ? "0.25" : "0.1"} />
      </filter>
      {/* Paths for the circular text */}
      <path id="tArc" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0" />
      <path id="bArc" d="M 100,100 m -76,0 a 76,76 0 0,0 152,0" />
    </defs>
  )

  if (variant === 'icon') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="ErgoAfya Solutions Logo" style={{ display: 'block', overflow: 'visible' }}>
        {defs}
        {coreGraphic}
      </svg>
    )
  }

  if (variant === 'full') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="ErgoAfya Solutions" style={{ display: 'block', overflow: 'visible' }}>
        {defs}
        {/* Outer subtle ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke={shinyText ? "rgba(255,255,255,0.1)" : "#4aac78"} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
        
        {/* Circular text */}
        <text fontFamily="'Outfit', sans-serif" fontSize="13.5" fontWeight="800" fill={shinyText ? "#f5d688" : "#0f2318"} letterSpacing="3.5" filter={shinyText ? "drop-shadow(0px 2px 3px rgba(15,35,24,0.7))" : "none"}>
          <textPath href="#tArc" startOffset="50%" textAnchor="middle">ERGOAFYA SOLUTIONS</textPath>
        </text>
        <text fontFamily="'Outfit', sans-serif" fontSize="8.5" fontWeight="600" fill={shinyText ? "#7ed4a6" : "#4aac78"} letterSpacing="2.8" filter={shinyText ? "drop-shadow(0px 1px 2px rgba(15,35,24,0.7))" : "none"}>
          <textPath href="#bArc" startOffset="50%" textAnchor="middle">HEALTHY PEOPLE • PRODUCTIVE WORKPLACE</textPath>
        </text>
        {coreGraphic}
      </svg>
    )
  }

  // variant === 'horizontal'
  return (
    <svg viewBox="0 0 650 200" width={size * 3.5} height={size} className={className} aria-label="ErgoAfya Solutions" style={{ display: 'block', overflow: 'visible' }}>
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
