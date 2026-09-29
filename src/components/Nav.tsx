import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'
import { BookButton } from './BookButton'
import { Logo } from './Logo'

const links = [
  { href: '#leistungen', label: 'Preise' },
  { href: '#team', label: 'Team' },
  { href: '#kontakt', label: 'Kontakt' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 480)
  })

  return (
    <motion.header
      initial={{ y: '-100%' }}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -bottom-6 bg-linear-to-b from-ink/90 via-ink/60 to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Amin B. Ahmadi – zum Seitenanfang">
          <Logo className="size-10 text-bone" label="" />
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            Amin B. Ahmadi
            <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-ash">Barber · Friseur</span>
          </span>
        </a>

        <nav aria-label="Hauptnavigation" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/40 p-1 backdrop-blur-xl">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-full px-4 py-2 text-sm text-bone/70 transition-colors hover:bg-white/8 hover:text-bone"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BookButton />
      </div>
    </motion.header>
  )
}
