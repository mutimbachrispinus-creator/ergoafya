'use client'
import HeroSection        from '@/components/HeroSection'
import StatsBand          from '@/components/StatsBand'
import InteractiveTabs    from '@/components/InteractiveTabs'
import ServicesSection    from '@/components/ServicesSection'
import ClientsSection     from '@/components/ClientsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection         from '@/components/FAQSection'
import BlogSection        from '@/components/BlogSection'
import ApproachSection    from '@/components/ApproachSection'
import LeadConsultantSection from '@/components/LeadConsultantSection'
import FinalCTASection    from '@/components/FinalCTASection'
import LeadMagnetSection  from '@/components/LeadMagnetSection'

export default function HomePage() {
  return (
    <main className="home-main">
      <div className="section-wrapper hero-wrapper">
        <HeroSection />
        <StatsBand />
        <ServicesSection />
        <InteractiveTabs />
        <ClientsSection />
        <ApproachSection />
        <LeadConsultantSection />
        <TestimonialsSection />
        <FAQSection />
        <LeadMagnetSection />
        <BlogSection />
        <FinalCTASection />
      </div>
    </main>
  )
}
