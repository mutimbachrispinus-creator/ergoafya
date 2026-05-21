'use client'
import { useState, useEffect } from 'react'
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
  const [hash, setHash] = useState('#home')

  useEffect(() => {
    // Check initial hash
    if (typeof window !== 'undefined') {
      setHash(window.location.hash || '#home')

      const handleHashChange = () => {
        setHash(window.location.hash || '#home')
        // Scroll back to top of page when changing page tabs on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Map hash to the appropriate CSS pagination class
  const getActiveClass = () => {
    if (hash === '#services') return 'show-services'
    if (hash === '#about') return 'show-about'
    if (hash === '#booking') return 'show-booking'
    return 'show-home'
  }

  return (
    <main className={`home-main ${getActiveClass()}`}>
      
      {/* Home Page Section */}
      <div className="section-wrapper hero-wrapper">
        <HeroSection />
        <RibbonBanner />
        <StatsBand />
        <ClientsSection />
        <BlogSection />
      </div>

      {/* Services Section */}
      <div className="section-wrapper services-wrapper" id="services">
        <ServicesSection />
      </div>

      {/* About Section */}
      <div className="section-wrapper about-wrapper" id="about">
        <AboutSection />
        <ApproachSection />
      </div>

      {/* Booking Section */}
      <div className="section-wrapper booking-wrapper" id="booking">
        <BookingSection />
      </div>

    </main>
  )
}
