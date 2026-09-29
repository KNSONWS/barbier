import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { salon } from '../data/salon'
import { EASE_OUT_EXPO } from '../lib/motion'
import { useFitText } from '../lib/useFitText'
import { useOpenStatus } from '../lib/useOpenStatus'
import { BookButton } from './BookButton'
import { ArrowDown } from './Icons'
import { RevealChars } from './Reveal'
import { RotatingBadge } from './RotatingBadge'
import { SilkBackground } from './SilkBackground'
import { StatusPill } from './StatusPill'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.2, delay, ease: EASE_OUT_EXPO },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const status = useOpenStatus()
  const wordmark = useFitText<HTMLSpanElement>()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section id="top" ref={ref} className="relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_70%_20%,#2a2724_0%,#0a0a0a_70%)]">
        <SilkBackground />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_40%,transparent_0%,rgba(10,10,10,0.55)_100%),linear-gradient(to_bottom,rgba(10,10,10,0.5)_0%,transparent_30%,transparent_55%,#0a0a0a_100%)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-6 md:px-10 md:pb-10"
      >
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div {...fadeUp(0.5)}>
              <StatusPill status={status} />
            </motion.div>
            <motion.p {...fadeUp(0.6)} className="mt-6 font-serif text-[2.6rem] leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Barber & Friseur
              <br />
              <em className="text-bone/55">in {salon.city}.</em>
            </motion.p>
            <motion.div {...fadeUp(0.75)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookButton size="lg" />
              <a
                href="#leistungen"
                className="group inline-flex items-center gap-2 text-sm text-bone/70 transition-colors hover:text-bone"
              >
                Preise ansehen
                <ArrowDown className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>
          <motion.div {...fadeUp(0.9)} className="hidden md:block">
            <RotatingBadge />
          </motion.div>
        </div>

        <h1 className="mt-10 md:mt-12">
          <span className="sr-only">
            {salon.name} – Barber & Friseur in {salon.city}
          </span>
          <span ref={wordmark} className="block w-max font-serif leading-[0.82] tracking-[-0.035em]">
            <RevealChars
              charClassName="chrome-text"
              words={[{ text: 'Amin' }, { text: 'B.', className: 'italic', mobileBreak: true }, { text: 'Ahmadi' }]}
            />
          </span>
        </h1>
      </motion.div>
    </section>
  )
}
