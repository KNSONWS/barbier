// Rotierender Kreistext, inspiriert von „Circular Text“ aus React Bits (reactbits.dev).
import { useId } from 'react'
import { BOOKING_URL } from '../data/salon'
import { cn } from '../lib/cn'
import { ArrowUpRight } from './Icons'
import { Magnetic } from './Magnetic'

const RADIUS = 78
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function RotatingBadge({ className, text = 'Termin buchen • Online • 24/7 • ' }: { className?: string; text?: string }) {
  const id = useId()
  return (
    <Magnetic strength={0.25} className={className}>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener"
        aria-label="Online Termin buchen"
        className="group relative grid size-40 place-items-center rounded-full text-bone"
      >
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="absolute inset-0 size-full animate-spin-slow group-hover:[animation-duration:7s] motion-reduce:animate-none"
        >
          <defs>
            <path id={id} d={`M100,100 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`} />
          </defs>
          <text className="fill-current font-mono text-[15px] uppercase">
            <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
        <span
          className={cn(
            'grid size-[4.5rem] place-items-center rounded-full bg-bone text-ink transition-all duration-500 ease-out-expo',
            'group-hover:scale-110 group-hover:bg-champagne',
          )}
        >
          <ArrowUpRight className="size-6 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
        </span>
      </a>
    </Magnetic>
  )
}
