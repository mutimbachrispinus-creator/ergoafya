// Logo.tsx — SVG logo component matching the ErgoAfya brand mark
// Person seated with spine dots, teal swoosh, circular text

import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon' | 'horizontal'
  className?: string
}

export function ErgoAfyaLogo({ size = 48, variant = 'horizontal', className = '' }: LogoProps) {
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
          <style>{`
            .r1{fill:none;stroke:#1d5c38;stroke-width:4}
            .r2{fill:none;stroke:#4aac78;stroke-width:2;stroke-dasharray:3 3}
            .bd{fill:none;stroke:#0f2318;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
            .sd{fill:#4aac78}
            .sw{fill:none;stroke:#4aac78;stroke-linecap:round}
          `}</style>
        </defs>
        <ellipse cx="100" cy="100" rx="95" ry="95" className="r1"/>
        <ellipse cx="100" cy="100" rx="88" ry="88" className="r2"/>
        <circle cx="108" cy="42" r="10" fill="none" stroke="#0f2318" strokeWidth="3"/>
        <path d="M108 52 Q106 72 102 88" className="bd"/>
        <path d="M72 118 L118 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M95 118 L95 148" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M78 148 L112 148" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M118 88 L118 118" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M102 88 Q98 100 85 112 Q80 116 80 118" className="bd"/>
        <path d="M85 118 L112 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M112 118 L115 145" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M115 145 L126 148" stroke="#0f2318" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M106 65 Q120 72 124 90" stroke="#0f2318" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        {[59,67,75,83,91,98].map((y, i) => (
          <circle key={y} cx={104-i*0.8} cy={y} r={2.8 - i*0.1} className="sd"/>
        ))}
        <path d="M68 52 Q58 70 65 90 Q72 110 62 130" stroke="#4aac78" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M75 48 Q63 68 72 92 Q80 115 68 138" stroke="#4aac78" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55"/>
      </svg>
    )
  }

  if (variant === 'full') {
    // Full circular badge
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
          <path id="tArc" d="M 100,100 m -72,0 a 72,72 0 1,1 144,0"/>
          <path id="bArc" d="M 100,100 m -68,0 a 68,68 0 0,0 136,0"/>
        </defs>
        <ellipse cx="100" cy="100" rx="95" ry="95" fill="none" stroke="#1d5c38" strokeWidth="4"/>
        <ellipse cx="100" cy="100" rx="88" ry="88" fill="none" stroke="#4aac78" strokeWidth="2" strokeDasharray="3 3"/>
        <circle cx="108" cy="42" r="10" fill="none" stroke="#0f2318" strokeWidth="3"/>
        <path d="M108 52 Q106 72 102 88" fill="none" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M72 118 L118 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M95 118 L95 148" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M78 148 L112 148" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M118 88 L118 118" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M102 88 Q98 100 85 112 Q80 116 80 118" fill="none" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M85 118 L112 118" stroke="#0f2318" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M112 118 L115 145" stroke="#0f2318" strokeWidth="3" strokeLinecap="round"/>
        <path d="M115 145 L126 148" stroke="#0f2318" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M106 65 Q120 72 124 90" stroke="#0f2318" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        {[59,67,75,83,91,98].map((y, i) => (
          <circle key={y} cx={104-i*0.8} cy={y} r={2.8 - i*0.1} fill="#4aac78"/>
        ))}
        <path d="M68 52 Q58 70 65 90 Q72 110 62 130" stroke="#4aac78" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M75 48 Q63 68 72 92 Q80 115 68 138" stroke="#4aac78" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55"/>
        <text fontFamily="Arial,sans-serif" fontSize="11.5" fontWeight="700" fill="#0f2318" letterSpacing="2.5">
          <textPath href="#tArc" startOffset="8%">ERGOAFYA SOLUTIONS</textPath>
        </text>
        <text fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#1d5c38" letterSpacing="1.8">
          <textPath href="#bArc" startOffset="3%">HEALTHY PEOPLE  •  PRODUCTIVE WORKPLACE</textPath>
        </text>
      </svg>
    )
  }

  // variant === 'horizontal' — icon + text side by side (nav usage)
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="ErgoAfya Solutions">
      <ErgoAfyaLogo size={size} variant="icon" />
      <div className="flex flex-col leading-tight">
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
          fontSize: size * 0.2,
          fontWeight: 600,
          color: '#4aac78',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
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
