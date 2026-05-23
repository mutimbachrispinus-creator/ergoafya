'use client'
import HeroSection    from '@/components/HeroSection'
import RibbonBanner   from '@/components/RibbonBanner'
import StatsBand      from '@/components/StatsBand'
import ClientsSection  from '@/components/ClientsSection'
import BlogSection     from '@/components/BlogSection'
import InteractiveTabs from '@/components/InteractiveTabs'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'

export default function HomePage() {
  return (
    <main className="home-main">
      
      {/* Home Page Section */}
      <div className="section-wrapper hero-wrapper">
        <HeroSection />
        <StatsBand />
        <InteractiveTabs />
        <ServicesSection />
        <ClientsSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </div>

    </main>
  )
}
