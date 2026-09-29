// Text-Reveals im Stil von „Split Text“ / „Blur Text“ aus React Bits (reactbits.dev).
import { motion, type Variants } from 'motion/react'
import { Fragment, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div }

const lineVariants: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
}

/** Zeilen gleiten nacheinander aus einer Maske nach oben — ausgelöst beim Scrollen. */
export function RevealLines({
  lines,
  as = 'h2',
  className,
  delay = 0,
}: {
  lines: ReactNode[]
  as?: keyof typeof tags
  className?: string
  delay?: number
}) {
  const Tag = tags[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.12em] block overflow-hidden pr-[0.08em] pb-[0.12em]">
          <motion.span className="block" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Einzelne Buchstaben steigen gestaffelt auf — für die große Wortmarke im Hero. */
export function RevealChars({
  words,
  className,
  charClassName,
  delay = 0.15,
  stagger = 0.035,
}: {
  /** `mobileBreak`: auf kleinen Bildschirmen nach diesem Wort umbrechen */
  words: { text: string; className?: string; mobileBreak?: boolean }[]
  className?: string
  /** wird auf jeden Buchstaben angewendet (z. B. Verlauf per background-clip) */
  charClassName?: string
  delay?: number
  stagger?: number
}) {
  let index = 0
  return (
    <motion.span
      aria-hidden="true"
      className={cn('inline-block whitespace-nowrap', className)}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className={cn('inline-block', word.className)}>
            {Array.from(word.text).map((char) => (
              <span key={index++} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={cn('inline-block', charClassName)}
                  variants={{
                    hidden: { y: '105%', rotate: 6 },
                    show: { y: '0%', rotate: 0, transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
          {w < words.length - 1 && (
            <span className={cn('w-[0.2em]', word.mobileBreak ? 'hidden md:inline-block' : 'inline-block')} />
          )}
          {word.mobileBreak && <br className="md:hidden" />}
        </Fragment>
      ))}
    </motion.span>
  )
}

/** Sanftes Einblenden mit Unschärfe beim Scrollen. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  )
}
