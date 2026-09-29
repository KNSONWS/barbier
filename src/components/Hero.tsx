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
        <motion.img
          src={image('photos/salon-wand')}
          srcSet={`${image('photos/salon-wand-800')} 800w, ${image('photos/salon-wand')} 1317w`}
          sizes="100vw"
          alt={`Barber vor dem Logo an der Wand im Salon ${salon.name}`}
          fetchPriority="high"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
          className="size-full object-cover object-[50%_60%] md:object-[50%_100%]"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-ink/70 to-transparent" />

      <div className="flex h-full flex-col items-center justify-end px-4 pb-10 text-center md:pb-14">
        <RevealLines
          as="h1"
          onLoad
          delay={0.3}
          srLabel={`${salon.name} – Barber & Friseur in ${salon.city}. Dein Look, unser Handwerk.`}
          className="display text-[clamp(1.55rem,6.4vw,5.75rem)]"
          lines={['Dein Look.', 'Unser Handwerk.']}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="mt-6 md:mt-8"
        >
          <Button tone="light" />
        </motion.div>
      </div>
    </section>
  )
}
