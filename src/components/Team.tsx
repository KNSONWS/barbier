// Team-Raster mit Farb-Spotlight — inspiriert von „Chroma Grid“ aus React Bits (reactbits.dev).
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { team, type Member } from '../data/salon'
import { cn } from '../lib/cn'
import { Logo } from './Logo'
import { EASE_OUT_EXPO } from '../lib/motion'
import { RevealLines } from './Reveal'
import { SectionLabel } from './SectionLabel'

const SPOTLIGHT = 320

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay: (index % 3) * 0.08, ease: EASE_OUT_EXPO }}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-smoke md:rounded-3xl"
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={`Porträt von ${member.name}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04]"
        />
      ) : (
        <div className="grid size-full place-items-center bg-[radial-gradient(80%_60%_at_50%_35%,#34302c_0%,#141312_70%)]">
          <Logo label="" className="size-2/5 bg-linear-to-b from-white via-[#a39d96] to-[#ece6df]" />
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 via-ink/50 to-transparent p-4 pt-16 md:p-6 md:pt-24">
        <span className="block font-serif text-2xl leading-none md:text-4xl">{member.name}</span>
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60 md:text-[11px]">{member.role}</span>
      </figcaption>
    </motion.figure>
  )
}

export function Team() {
  const grid = useRef<HTMLDivElement>(null)

  // Weiches Nachziehen des Spotlights (x, y, Radius) per requestAnimationFrame
  useEffect(() => {
    const el = grid.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return

    const s = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 }
    let raf = 0
    const tick = () => {
      s.x += (s.tx - s.x) * 0.14
      s.y += (s.ty - s.y) * 0.14
      s.r += (s.tr - s.r) * 0.1
      el.style.setProperty('--x', `${s.x}px`)
      el.style.setProperty('--y', `${s.y}px`)
      el.style.setProperty('--r', `${s.r}px`)
      const settled = Math.abs(s.tx - s.x) < 0.5 && Math.abs(s.ty - s.y) < 0.5 && Math.abs(s.tr - s.r) < 0.5
      raf = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      s.tx = e.clientX - r.left
      s.ty = e.clientY - r.top
      if (s.r < 1) {
        s.x = s.tx
        s.y = s.ty
      }
      s.tr = SPOTLIGHT
      kick()
    }
    const onLeave = () => {
      s.tr = 0
      kick()
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section id="team" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionLabel index="02">Team</SectionLabel>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealLines
          className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl"
          lines={['Sechs Profis.', <em key="anspruch" className="text-bone/45">Ein Anspruch.</em>]}
        />
        <p className="max-w-xs text-ash md:pb-3 md:text-right">Bei der Online-Buchung wählst du einfach deinen Favoriten.</p>
      </div>

      <div
        ref={grid}
        className="relative mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-4"
        style={{ '--x': '50%', '--y': '50%', '--r': '0px' } as React.CSSProperties}
      >
        {team.map((m, i) => (
          <MemberCard key={m.name} member={m} index={i} />
        ))}
        {/* Graustufen-Ebene mit Loch am Mauszeiger (nur bei Maus/Trackpad) */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 z-10 hidden [@media(pointer:fine)]:block',
            'backdrop-grayscale backdrop-brightness-[0.8]',
          )}
          style={{
            maskImage:
              'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 75%, #000 100%)',
            WebkitMaskImage:
              'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 75%, #000 100%)',
          }}
        />
      </div>
    </section>
  )
}
