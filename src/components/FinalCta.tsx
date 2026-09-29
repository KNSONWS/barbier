import { motion, useMotionValue, useSpring } from 'motion/react'
import { BOOKING_URL } from '../data/salon'
import { useFitText } from '../lib/useFitText'
import { ArrowUpRight } from './Icons'
import { Logo } from './Logo'
import { FadeIn } from './Reveal'
import { SectionLabel } from './SectionLabel'

export function FinalCta() {
  const fit = useFitText<HTMLSpanElement>()
  // Kreis mit Pfeil folgt dem Mauszeiger über dem großen Link
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="termin" className="relative isolate overflow-hidden border-t border-white/10">
      <Logo
        label=""
        className="pointer-events-none absolute top-1/2 -right-[12%] -z-10 size-[min(90vw,52rem)] -translate-y-1/2 text-white/[0.035]"
      />
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="04">Termin</SectionLabel>
          <FadeIn>
            <p className="max-w-sm text-ash">Leistung wählen, Profi wählen, Uhrzeit wählen. Online — rund um die Uhr.</p>
          </FadeIn>
        </div>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          onPointerMove={onMove}
          className="group relative mt-10 block cursor-pointer md:mt-16 md:cursor-none"
        >
          <span ref={fit} className="cta-text block w-max pr-[0.06em] font-serif leading-[0.9] tracking-[-0.035em]">
            Termin
            <br className="md:hidden" /> <em>buchen</em>
          </span>
          <motion.span aria-hidden="true" style={{ x, y }} className="pointer-events-none absolute top-0 left-0 hidden md:block">
            <span className="grid size-28 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center rounded-full bg-champagne text-ink transition-transform duration-500 ease-out-expo group-hover:scale-100">
              <ArrowUpRight className="size-8" />
            </span>
          </motion.span>
          <span className="mt-8 inline-flex items-center gap-2 text-sm text-bone/70 md:hidden">
            Jetzt online buchen <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
