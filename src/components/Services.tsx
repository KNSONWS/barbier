import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { serviceUrl, services, type Service } from '../data/salon'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'
import { ArrowUpRight } from './Icons'
import { FadeIn, RevealLines } from './Reveal'
import { SectionLabel } from './SectionLabel'

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

function ServiceRow({ service: s }: { service: Service }) {
  return (
    <motion.li variants={rowVariants}>
      <a
        href={serviceUrl(s)}
        target="_blank"
        rel="noopener"
        className="group relative flex items-center gap-4 border-b border-white/10 py-5 md:gap-6 md:py-6"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-linear-to-r from-white/[0.06] to-transparent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
        />
        <span className="relative min-w-0 flex-1 md:flex md:items-center md:gap-6">
          <span className="block font-serif text-[1.7rem] leading-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:w-1/2 md:text-4xl">
            {s.name}
          </span>
          <span className="mt-1 block text-sm text-ash md:mt-0 md:flex-1">
            {s.note}
            <span className="md:hidden">
              {s.note && ' · '}
              {s.minutes} Min.
            </span>
          </span>
        </span>
        <span className="relative hidden w-20 font-mono text-sm text-ash md:block">{s.minutes} Min.</span>
        <span className="relative whitespace-nowrap text-right font-mono text-lg md:w-28 md:text-xl">
          {s.from && <span className="mr-1 text-sm text-ash">ab</span>}
          {s.price} €
        </span>
        <span className="relative hidden size-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-bone group-hover:bg-bone group-hover:text-ink md:grid">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
        </span>
        <span className="sr-only">– jetzt buchen</span>
      </a>
    </motion.li>
  )
}

export function Services() {
  const [active, setActive] = useState(services[0].key)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const category = services.find((c) => c.key === active) ?? services[0]

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + services.length) % services.length
    setActive(services[next].key)
    tabs.current[next]?.focus()
  }

  return (
    <section id="leistungen" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionLabel index="01">Leistungen & Preise</SectionLabel>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <RevealLines
          className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl"
          lines={['Klarer Schnitt.', <em key="preis" className="text-bone/45">Klarer Preis.</em>]}
        />

        <FadeIn>
          <div
            role="tablist"
            aria-label="Kategorien"
            className="flex flex-wrap gap-2 md:w-max md:gap-1 md:rounded-full md:border md:border-white/10 md:bg-white/[0.03] md:p-1"
          >
            {services.map((c, i) => {
              const selected = c.key === active
              return (
                <button
                  key={c.key}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${c.key}`}
                  aria-selected={selected}
                  aria-controls="leistungen-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.key)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'relative cursor-pointer rounded-full border px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-300 md:border-transparent md:px-5',
                    selected ? 'border-transparent text-ink' : 'border-white/10 text-bone/65 hover:text-bone',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>
        </FadeIn>
      </div>

      <div id="leistungen-panel" role="tabpanel" aria-labelledby={`tab-${category.key}`} className="mt-12 border-t border-white/10 md:mt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={category.key}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          >
            {category.items.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      <p className="mt-6 max-w-xl text-sm text-ash">
        „ab“-Preise je nach Haarlänge und Aufwand. Ein Klick auf eine Leistung öffnet direkt die Online-Buchung.
      </p>
    </section>
  )
}
