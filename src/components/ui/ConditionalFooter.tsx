'use client'
import { usePathname } from 'next/navigation'
import Footer from '@/components/ui/Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  // Don't show the persistent footer on the homepage (it's a full-screen paginated app)
  if (pathname === '/') return null
  return <Footer />
}
