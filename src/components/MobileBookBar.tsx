import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { BOOKING_URL, salon } from '../data/salon'
import { EASE_OUT_EXPO } from '../lib/motion'
import { ArrowUpRight, Phone } from './Icons'

/** Fixierte Buchungsleiste am unteren Rand — nur auf dem Smartphone, sobald der Hero verlassen wurde. */
export function MobileBookBar() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const cta = document.getElementById('termin')
    const ctaVisible = cta ? cta.getBoundingClientRect().top < window.innerHeight : false
    setShow(y > window.innerHeight * 0.8 && !ctaVisible)
  })

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '130%' }}
          animate={{ y: '0%' }}
          exit={{ y: '130%' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden"
        >
          <div className="flex gap-1.5 rounded-full border border-white/10 bg-ink/75 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-bone font-medium text-ink"
            >
              Termin buchen
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={`tel:${salon.phone}`}
              aria-label={`Anrufen: ${salon.phoneDisplay}`}
              className="grid size-12 place-items-center rounded-full border border-white/15"
            >
              <Phone className="size-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
