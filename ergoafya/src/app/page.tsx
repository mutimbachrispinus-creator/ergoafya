import HeroSection    from '@/components/HeroSection'
import RibbonBanner   from '@/components/RibbonBanner'
import StatsBand      from '@/components/StatsBand'
import AboutSection   from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ApproachSection from '@/components/ApproachSection'
import ClientsSection  from '@/components/ClientsSection'
import BlogSection     from '@/components/BlogSection'
import BookingSection  from '@/components/BookingSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RibbonBanner />
      <StatsBand />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <ClientsSection />
      <BlogSection />
      <BookingSection />
    </main>
  )
}
