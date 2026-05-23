'use client'
import HeroSection        from '@/components/HeroSection'
import StatsBand          from '@/components/StatsBand'
import InteractiveTabs    from '@/components/InteractiveTabs'
import ServicesSection    from '@/components/ServicesSection'
import ClientsSection     from '@/components/ClientsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection         from '@/components/FAQSection'
import BlogSection        from '@/components/BlogSection'

export default function HomePage() {
  return (
    <main className="home-main">
      <div className="section-wrapper hero-wrapper">
        <HeroSection />
        <StatsBand />
        <ServicesSection />
        <InteractiveTabs />
        <ClientsSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </div>
    </main>
  )
}
