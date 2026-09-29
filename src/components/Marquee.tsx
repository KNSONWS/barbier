// Laufband, das auf Scroll-Geschwindigkeit reagiert — adaptiert von „Scroll Velocity“ aus React Bits (reactbits.dev).
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function VelocityRow({ children, baseVelocity, className }: { children: ReactNode; baseVelocity: number; className?: string }) {
  const container = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLSpanElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)
  const inView = useInView(container)
  const reduce = useReducedMotion()

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)

  useLayoutEffect(() => {
    const el = copy.current
    if (!el) return
    const measure = () => setCopyWidth(el.offsetWidth)
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const x = useTransform(baseX, (v) => (copyWidth ? `${wrap(-copyWidth, 0, v)}px` : '0px'))

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={container} className="overflow-hidden">
      <motion.div className={cn('flex whitespace-nowrap', className)} style={{ x }}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} ref={i === 0 ? copy : undefined} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-[0.35em] size-[0.4em] shrink-0 fill-champagne">
    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
  </svg>
)

const row = (words: string[]) =>
  words.map((w) => (
    <span key={w} className="flex items-center">
      {w}
      <Star />
    </span>
  ))

export function Marquee() {
  return (
    <section aria-hidden="true" className="relative -mt-px border-y border-white/10 bg-ink py-6 md:py-10">
      <VelocityRow baseVelocity={-40} className="font-serif text-6xl italic leading-none tracking-tight md:text-8xl">
        {row(['Haarschnitt', 'Bart', 'Nassrasur', 'Styling', 'Farbe', 'Balayage', 'Make-up'])}
      </VelocityRow>
      <VelocityRow
        baseVelocity={30}
        className="mt-2 font-mono text-sm uppercase tracking-[0.3em] text-ash md:mt-4 md:text-base"
      >
        {row(['Kaiserslautern', 'Mo – Sa 9 – 19 Uhr', 'Online buchen', 'Herren', 'Damen', 'Kinder'])}
      </VelocityRow>
    </section>
  )
}
