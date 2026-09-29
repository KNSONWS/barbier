import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { member, serviceUrl, services, type Service, type ServiceCategory } from '../data/salon'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'
import { ArrowUpRight, Plus } from './Icons'
import { RevealLines } from './Reveal'

/** Kleine, überlappende Porträts: wer diese Leistungen anbietet. */
function Faces({ keys, className }: { keys: string[]; className?: string }) {
  return (
    <span className={cn('flex -space-x-1.5', className)}>
      {keys.map((key) => {
        const m = member(key)
        return (
          <img
            key={key}
            src={m.photo}
            alt={m.name}
            title={m.name}
            loading="lazy"
            className="size-8 border-2 border-paper object-cover grayscale transition duration-300 hover:relative hover:z-10 hover:scale-125 hover:grayscale-0"
          />
        )
      })}
    </span>
  )
}

function Row({ service: s }: { service: Service }) {
  return (
    <a
      href={serviceUrl(s)}
      target="_blank"
      rel="noopener"
      className="group flex items-baseline gap-3 border-t border-ink/10 py-3.5 transition-colors hover:bg-ink hover:text-paper md:px-2"
    >
      <span className="min-w-0 flex-1">
        <span className="font-semibold">{s.name}</span>
        {s.note && <span className="ml-2 hidden text-sm text-stone group-hover:text-paper/60 sm:inline">{s.note}</span>}
      </span>
      <span className="text-sm text-stone tabular-nums group-hover:text-paper/60">{s.minutes} Min.</span>
      <span className="w-20 text-right font-bold tabular-nums">
        {s.from && <span className="mr-1 text-xs font-medium">ab</span>}
        {s.price} €
      </span>
      <ArrowUpRight className="size-4 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="sr-only">– online buchen</span>
    </a>
  )
}

function Category({ category, open, onToggle }: { category: ServiceCategory; open: boolean; onToggle: () => void }) {
  const id = `preise-${category.key}`
  return (
    <div className="border-b border-ink">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left md:py-7"
        >
          <span className="display text-[clamp(1.6rem,3.6vw,3.25rem)]">{category.label}</span>
          <span className="flex items-center gap-5">
            <Faces keys={category.team} className="hidden md:flex" />
            <Plus className={cn('size-6 transition-transform duration-500 ease-out-expo md:size-7', open && 'rotate-45')} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-10">
              <Faces keys={category.team} className="mb-4 md:hidden" />
              <div className="grid md:grid-cols-2 md:gap-x-10">
                {category.items.map((s) => (
                  <Row key={s.id} service={s} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Prices() {
  const [open, setOpen] = useState<string | null>(services[0].key)

  return (
    <section id="preise" className="border-t border-ink/10 px-4 py-24 md:px-8 md:py-36">
      <div className="mini flex justify-between gap-6">
        <span>Leistungen</span>
        <span className="text-right">„ab“ = je nach Haarlänge</span>
      </div>
      <RevealLines className="display mt-8 text-[clamp(2.1rem,5vw,4.5rem)]" lines={['Preise.']} />

      <div className="mt-10 border-t border-ink md:mt-14">
        {services.map((c) => (
          <Category key={c.key} category={c} open={open === c.key} onToggle={() => setOpen(open === c.key ? null : c.key)} />
        ))}
      </div>
    </section>
  )
}
