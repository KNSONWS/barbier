import { BOOKING_URL } from '../data/salon'
import { cn } from '../lib/cn'
import { ArrowUpRight } from './Icons'

type Props = {
  children?: React.ReactNode
  href?: string
  variant?: 'solid' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
}

/** Pill-Button mit „rollendem“ Pfeil — führt standardmäßig zur Online-Buchung. */
export function BookButton({ children = 'Termin buchen', href = BOOKING_URL, variant = 'solid', size = 'md', className }: Props) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={cn(
        'group relative inline-flex items-center gap-3 rounded-full font-medium tracking-tight transition-colors duration-300',
        size === 'lg' ? 'h-14 pl-7 pr-2 text-base' : 'h-11 pl-5 pr-1.5 text-sm',
        variant === 'solid'
          ? 'bg-bone text-ink hover:bg-champagne'
          : 'border border-white/15 text-bone backdrop-blur-md hover:border-white/40 hover:bg-white/5',
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'relative grid place-items-center overflow-hidden rounded-full',
          size === 'lg' ? 'size-10' : 'size-8',
          variant === 'solid' ? 'bg-ink text-bone' : 'bg-bone text-ink',
        )}
      >
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-5 group-hover:-translate-y-5" />
        <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  )
}
