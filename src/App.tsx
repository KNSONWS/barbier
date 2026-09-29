import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { MobileBookBar } from './components/MobileBookBar'
import { Nav } from './components/Nav'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Visit } from './components/Visit'

export default function App() {
  // Weiches Scrollen (Lenis) — nur, wenn keine reduzierte Bewegung gewünscht ist
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true })
    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#leistungen"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Zum Inhalt springen
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Team />
        <Visit />
        <FinalCta />
      </main>
      <Footer />
      <MobileBookBar />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[70]" />
    </MotionConfig>
  )
}
