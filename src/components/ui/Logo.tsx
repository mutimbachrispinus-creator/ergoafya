import React from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon' | 'horizontal'
  className?: string
  shinyText?: boolean
}

export function ErgoAfyaLogo({ size = 48, variant = 'horizontal', className = '', shinyText = false }: LogoProps) {
  // We use the same image for all variants now, adjusting size if necessary
  const displaySize = variant === 'horizontal' ? size * 1.5 : size

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Image 
        src="/logo.png" 
        alt="ErgoAfya Solutions Logo" 
        width={displaySize} 
        height={displaySize}
        style={{ objectFit: 'contain', borderRadius: '50%' }}
      />
    </div>
  )
}
