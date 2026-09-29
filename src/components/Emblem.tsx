import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import raw from '../assets/logo/emblem.svg?raw'
import { cn } from '../lib/cn'

// Das Logo (Instagram-Profilbild, vektorisiert) liegt als SVG-Datei vor und wird hier inline gezeichnet,
// damit die Linien animiert und vom Licht angestrahlt werden können.
const viewBox = raw.match(/viewBox="([^"]+)"/)![1]
const [, , VB_W, VB_H] = viewBox.split(' ').map(Number)
const paths = [...raw.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1])

/**
 * Logo-Emblem:
 * - zeichnet sich beim ersten Erscheinen Linie für Linie, danach füllen sich die Linien
 * - ein Lichtreflex wie auf Metall folgt dem Mauszeiger (ohne Maus: der Scroll-Position)
 */
export function Emblem({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const gradient = useRef<SVGRadialGradientElement>(null)
  const id = `emblem-light-${useId().replace(/[^\w-]/g, '')}`
  const reduce = useReducedMotion()
  const drawn = useInView(wrap, { once: true, amount: 0.4 })

  // Lichtposition (0–1 relativ zum Logo): Ziel und aktueller, weich nachgezogener Wert
  const light = useRef({ x: 0.3, y: 0.25, tx: 0.3, ty: 0.25, hover: false, raf: 0 })

  const render = () => {
    const l = light.current
    l.x += (l.tx - l.x) * 0.12
    l.y += (l.ty - l.y) * 0.12
    gradient.current?.setAttribute('cx', String(l.x * VB_W))
    gradient.current?.setAttribute('cy', String(l.y * VB_H))
    const settled = Math.abs(l.tx - l.x) < 0.001 && Math.abs(l.ty - l.y) < 0.001
    l.raf = settled ? 0 : requestAnimationFrame(render)
  }
  const moveLight = (x: number, y: number) => {
    const l = light.current
    l.tx = x
    l.ty = y
    if (reduce) {
      l.x = x
      l.y = y
      render()
    } else if (!l.raf) l.raf = requestAnimationFrame(render)
  }

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start end', 'end start'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!light.current.hover) moveLight(0.1 + 0.8 * p, 0.15 + 0.5 * p)
  })

  useEffect(() => {
    const l = light.current
    return () => cancelAnimationFrame(l.raf)
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect()
    light.current.hover = true
    moveLight((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
  }
  const onPointerLeave = () => {
    light.current.hover = false
    const p = scrollYProgress.get()
    moveLight(0.1 + 0.8 * p, 0.15 + 0.5 * p)
  }

  return (
    <div
      ref={wrap}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-drawn={drawn || reduce ? '' : undefined}
      className={cn('emblem', className)}
    >
      <svg viewBox={viewBox} role="img" aria-label="Logo von Amin B. Ahmadi" className="block h-auto w-full overflow-visible">
        <defs>
          <radialGradient ref={gradient} id={id} gradientUnits="userSpaceOnUse" cx={0.3 * VB_W} cy={0.25 * VB_H} r={VB_W * 0.55}>
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#ece9e4" />
            <stop offset="1" stopColor="#8d8a85" />
          </radialGradient>
        </defs>
        {/* Konturen für die Zeichen-Animation */}
        <g className="emblem-lines" aria-hidden="true">
          {paths.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </g>
        {/* Gefüllte Linien mit Lichtreflex */}
        <g className="emblem-fill" fill={`url(#${id})`}>
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
    </div>
  )
}
