'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ArtisticBackground from '../components/ArtisticBackground'

// Dynamically import the 3D WebGL Canvas to prevent server-side execution failures
const InteractiveIslandProjects = dynamic(
  () => import('../components/InteractiveIslandProjects'),
  { ssr: false }
)

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative">
      <ArtisticBackground />
      <div className="relative z-10">
        <Navigation activeSection={activeSection} />
        <Hero />
        <About />
        <InteractiveIslandProjects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
