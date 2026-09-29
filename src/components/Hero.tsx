import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { image, salon } from '../data/salon'
import { EASE_OUT_EXPO } from '../lib/motion'
import { Button } from './Button'
import { RevealLines } from './Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section id="top" ref={ref} className="relative isolate h-svh min-h-[560px] overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        {/* Handy: eigener Hochformat-Ausschnitt mit Amin und der Schere */}
        <picture>
          <source media="(max-width: 767px)" srcSet={image('photos/hero-mobile')} />
          <motion.img
            src={image('photos/hero')}
            srcSet={`${image('photos/hero-1000')} 1000w, ${image('photos/hero')} 2000w`}
            sizes="100vw"
            alt={`${salon.name} schneidet einem Kunden mit Schere und Kamm die Haare`}
            fetchPriority="high"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
            className="size-full object-cover md:object-[50%_25%]"
          />
        </picture>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/30" />
      {/* oben dunkler, damit die Navigation auf dem hellen Studiohintergrund lesbar bleibt */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-ink/80 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-linear-to-t from-ink/75 to-transparent" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 hidden w-3/5 bg-linear-to-r from-ink/35 to-transparent md:block" />

      {/* Text unten links: Gesichter, Schere und Kamm bleiben frei */}
      <div className="flex h-full flex-col items-center justify-end px-4 pb-10 text-center md:items-start md:px-8 md:pb-12 md:text-left">
        <RevealLines
          as="h1"
          onLoad
          delay={0.3}
          srLabel={`${salon.name} – Barber & Friseur in ${salon.city}. Dein Look, unser Handwerk.`}
          className="display text-[clamp(1.55rem,4.2vw,4.5rem)]"
          lines={['Dein Look.', 'Unser Handwerk.']}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="mt-6 md:mt-7"
        >
          <Button tone="light" />
        </motion.div>
      </div>
    </section>
  )
}
