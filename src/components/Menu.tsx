import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BOOKING_URL, image, salon, team } from '../data/salon'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'
import { scrollToHash, unlockScroll } from '../lib/scroll'
import { GridLines } from './GridLines'
import galleryCover from '../assets/gallery/twists.webp'

// Ein Bild oder – beim Team – ein 3 × 2 Raster aus allen Porträts
const items = [
  { href: '#preise', label: 'Preise', photos: [image('photos/hero-detail')] },
  { href: '#team', label: 'Team', photos: team.map((m) => m.thumb) },
  { href: '#galerie', label: 'Galerie', photos: [galleryCover] },
  { href: '#kontakt', label: 'Kontakt', photos: [image('photos/emblem-breit-900')] },
]

/** Vollbild-Menü: große Links, daneben wechselt das Bild zum Link unter dem Mauszeiger. */
export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0)
  const first = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (open) first.current?.focus()
  }, [open])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    onClose()
    unlockScroll()
    scrollToHash(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 isolate z-40 overflow-y-auto bg-ink text-paper"
        >
          <GridLines tone="dark" />
          <div className="flex min-h-full flex-col px-4 pt-28 pb-6 md:px-8 md:pt-32 md:pb-8">
            <div className="grid flex-1 gap-10 md:grid-cols-2">
              <nav aria-label="Menü">
                <ul onMouseLeave={() => setActive(0)}>
                  {items.map((item, i) => (
                    <li key={item.href} className="overflow-hidden">
                      <motion.a
                        ref={i === 0 ? first : undefined}
                        href={item.href}
                        onClick={(e) => go(e, item.href)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: EASE_OUT_EXPO }}
                        className={cn(
                          'display block py-1 text-[clamp(3rem,7vw,6.5rem)] transition-opacity duration-300',
                          active !== i && 'opacity-30',
                        )}
                      >
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="relative hidden md:block">
                {items.map((item, i) => (
                  <div
                    key={item.href}
                    className={cn(
                      'absolute inset-0 grid gap-[2px] transition-all duration-700 ease-out-expo',
                      item.photos.length > 1 && 'grid-cols-3',
                      active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                    )}
                  >
                    {item.photos.map((src) => (
                      <img key={src} src={src} alt="" className="size-full min-h-0 object-cover" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 text-sm md:grid-cols-3">
              <p>
                <span className="mini block text-paper/50">Adresse</span>
                {salon.street}, {salon.zip} {salon.city}
              </p>
              <p>
                <span className="mini block text-paper/50">Öffnungszeiten</span>
                Mo – Sa 9 – 19 Uhr
              </p>
              <p>
                <span className="mini block text-paper/50">Online</span>
                <a href={BOOKING_URL} target="_blank" rel="noopener" className="underline underline-offset-4 hover:opacity-60">
                  Termin buchen
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
