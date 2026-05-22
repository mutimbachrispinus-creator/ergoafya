'use client'
import HeroSection    from '@/components/HeroSection'
import RibbonBanner   from '@/components/RibbonBanner'
import StatsBand      from '@/components/StatsBand'
import ClientsSection  from '@/components/ClientsSection'
import BlogSection     from '@/components/BlogSection'

export default function HomePage() {
  return (
    <main className="home-main">
      
      {/* Home Page Section */}
      <div className="section-wrapper hero-wrapper">
        <HeroSection />
        <StatsBand />
        <ClientsSection />
        <BlogSection />
      </div>

    </main>
  )
}
