import { motion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'
import { GridLines } from './GridLines'
import { RevealLines } from './Reveal'

const photos = import.meta.glob<string>('../assets/gallery/*.webp', { eager: true, import: 'default' })
const photo = (name: string) => photos[`../assets/gallery/${name}.webp`]

// Seitenverhältnis (Breite/Höhe) der Dateien, damit nichts beschnitten wird
const moments = [
  { src: photo('platin'), title: 'Platin Buzz', ratio: 900 / 1119 },
  { src: photo('twists'), title: 'Twists', ratio: 900 / 1068 },
  { src: photo('crew'), title: 'Nach Feierabend', ratio: 900 / 1200 },
  { src: photo('fade-bart'), title: 'Skin Fade & Bart', ratio: 900 / 1078 },
  { src: photo('blond'), title: 'Blond Crop', ratio: 900 / 1200 },
]

function Moment({ m, i }: { m: (typeof moments)[number]; i: number }) {
  return (
    <figure className="group w-[78vw] shrink-0 snap-center md:w-auto">
      <div
        className="overflow-hidden bg-paper/5 md:h-[min(56svh,38rem)]"
        style={{ aspectRatio: m.ratio } as React.CSSProperties}
      >
        <img
          src={m.src}
          alt={m.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover grayscale-[35%] transition duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="display text-sm md:text-base">{m.title}</span>
        <span className="mini text-paper/50">{String(i + 1).padStart(2, '0')}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Galerie auf schwarzem Grund. Desktop: die Section bleibt stehen und die Bilder
 * laufen beim Scrollen seitlich durch. Handy: horizontal wischen.
 */
export function Gallery() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // Wie weit die Bildreihe über den Bildschirm hinausragt (nur Desktop)
  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const measure = () => setDistance(desktop.matches ? Math.max(0, el.scrollWidth - window.innerWidth) : 0)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    desktop.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      desktop.removeEventListener('change', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section
      id="galerie"
      ref={section}
      className="relative isolate bg-ink text-paper"
      style={{ height: distance ? `calc(100svh + ${distance}px)` : undefined }}
    >
      <GridLines tone="dark" />
      <div className={cn('flex flex-col overflow-hidden py-24 md:py-0', distance > 0 && 'md:sticky md:top-0 md:h-svh md:justify-center md:pt-16')}>
        <div className="px-4 md:px-8">
          <div className="mini flex justify-between gap-6 text-paper/60">
            <span>Galerie</span>
            <span>Aus dem Salon</span>
          </div>
          <RevealLines className="display mt-6 text-[clamp(2.1rem,5vw,4.5rem)]" lines={['Momente.']} />
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
          className="mt-10 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:mt-12 md:w-max md:snap-none md:gap-4 md:overflow-visible md:px-8"
        >
          {moments.map((m, i) => (
            <Moment key={m.title} m={m} i={i} />
          ))}
        </motion.div>

        {/* Fortschritt beim seitlichen Durchlaufen */}
        {distance > 0 && (
          <div className="mx-8 mt-8 hidden h-px bg-paper/15 md:block">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-paper" />
          </div>
        )}
      </div>
    </section>
  )
}
