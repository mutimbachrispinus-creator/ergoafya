import type { Metadata } from 'next'
import './globals.css'
import Nav     from '@/components/ui/Nav'
import Footer  from '@/components/ui/Footer'
import WaFloat from '@/components/ui/WaFloat'
import Topbar  from '@/components/ui/Topbar'

export const metadata: Metadata = {
  title: 'ErgoAfya Solutions | Ergonomics & Occupational Health Kenya',
  description: 'Kenya-based ergonomics consultancy led by a licensed Occupational Therapist. Workplace assessments, MSD prevention, back care training in Nairobi.',
  keywords: ['ergonomics Kenya','occupational health Nairobi','workplace assessment','MSD prevention','back care training'],
  openGraph: {
    title: 'ErgoAfya Solutions — Healthy People • Productive Workplace',
    description: 'Evidence-based ergonomics consultancy in Nairobi, Kenya.',
    url: 'https://ergoafya.com',
    siteName: 'ErgoAfya Solutions',
    locale: 'en_KE',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Nav />
        {children}
        <Footer />
        <WaFloat />
      </body>
    </html>
  )
}

