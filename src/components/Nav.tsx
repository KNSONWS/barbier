import { useEffect, useRef, useState } from 'react'
import { BOOKING_URL } from '../data/salon'
import { cn } from '../lib/cn'
import { lockScroll, unlockScroll } from '../lib/scroll'
import { Menu } from './Menu'

export function Nav() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const button = toggle.current
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
      button?.focus()
    }
  }, [open])

  return (
    <>
      {/* mix-blend-difference: die Leiste bleibt auf hellen, dunklen und Bild-Flächen lesbar */}
      <header className="fixed inset-x-0 top-0 z-50 text-paper mix-blend-difference">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-5 md:px-8 md:py-6">
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            className="relative -m-2 size-10 cursor-pointer justify-self-start"
          >
            <span
              className={cn(
                'absolute top-1/2 left-2 h-[2px] w-6 bg-current transition-transform duration-500 ease-out-expo',
                open ? 'rotate-45' : '-translate-y-[5px]',
              )}
            />
            <span
              className={cn(
                'absolute top-1/2 left-2 h-[2px] w-6 bg-current transition-transform duration-500 ease-out-expo',
                open ? '-rotate-45' : 'translate-y-[5px]',
              )}
            />
          </button>

          <a href="#top" onClick={() => setOpen(false)} className="display text-[13px] tracking-[0.14em] md:text-[15px]">
            Amin B. Ahmadi
          </a>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="display justify-self-end text-[13px] transition-opacity hover:opacity-60 md:text-[15px]"
          >
            <span className="md:hidden">Termin</span>
            <span className="hidden md:inline">Termin buchen</span>
          </a>
        </div>
      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
