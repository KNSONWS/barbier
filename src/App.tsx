import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { GridLines } from './components/GridLines'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Prices } from './components/Prices'
import { TeamList } from './components/TeamList'
import { setLenis } from './lib/scroll'

export default function App() {
  // Weiches Scrollen (Lenis) — nur, wenn keine reduzierte Bewegung gewünscht ist
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true })
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#preise"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-[100] focus:-translate-x-1/2 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Zu den Preisen springen
      </a>
      <Nav />
      <main className="relative isolate">
        <GridLines />
        <Hero />
        <Intro />
        <TeamList />
        <Gallery />
        <Prices />
      </main>
      <Footer />
    </MotionConfig>
  )
}
