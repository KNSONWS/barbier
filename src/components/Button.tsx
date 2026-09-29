import type { ReactNode } from 'react'
import { BOOKING_URL } from '../data/salon'
import { cn } from '../lib/cn'

type Props = {
  children?: ReactNode
  href?: string
  tone?: 'dark' | 'light'
  className?: string
}

/** Eckiger Button: beim Hover läuft eine Fläche von unten hoch und der Text rollt nach oben. */
export function Button({ children = 'Termin buchen', href = BOOKING_URL, tone = 'dark', className }: Props) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={cn(
        'group relative inline-flex overflow-hidden border px-4 pt-[13px] pb-[10px] text-[14px] leading-none font-extrabold uppercase [font-stretch:125%] md:text-[15px]',
        tone === 'dark' ? 'border-ink bg-ink text-paper' : 'border-paper bg-paper text-ink',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0',
          tone === 'dark' ? 'bg-graphite' : 'bg-[#dcdad5]',
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </a>
  )
}
