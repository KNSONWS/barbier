import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div }

const lineVariants: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
}

/** Zeilen gleiten nacheinander aus einer Maske nach oben — beim Scrollen oder direkt beim Laden. */
export function RevealLines({
  lines,
  as = 'h2',
  className,
  delay = 0,
  onLoad = false,
  srLabel,
}: {
  lines: ReactNode[]
  as?: keyof typeof tags
  className?: string
  delay?: number
  onLoad?: boolean
  /** Text für Screenreader, wenn die sichtbaren Zeilen nur ein Ausschnitt sind */
  srLabel?: string
}) {
  const Tag = tags[as]
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } }
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {srLabel && <span className="sr-only">{srLabel}</span>}
      {lines.map((line, i) => (
        <span key={i} aria-hidden={srLabel ? true : undefined} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Sanftes Einblenden beim Scrollen. */
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  )
}

/** Bild, das sich von unten aufdeckt und dabei leicht herauszoomt. */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}) {
  const transition = { duration: 1.3, ease: EASE_OUT_EXPO }
  // Beobachtet wird der ungeclippte Rahmen: ein komplett weggeclipptes Element gilt nie als sichtbar
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.div
        className="size-full overflow-hidden"
        variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)', transition } }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn('size-full object-cover', imgClassName)}
          variants={{ hidden: { scale: 1.2 }, show: { scale: 1, transition: { ...transition, duration: 1.7 } } }}
        />
      </motion.div>
    </motion.div>
  )
}
