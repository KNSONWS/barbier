import { cn } from '../lib/cn'

/** Feine vertikale Rasterlinien hinter dem Inhalt (4 Spalten mobil, 8 ab Tablet). */
export function GridLines({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grid-lines pointer-events-none absolute inset-y-0 inset-x-4 -z-10 [--grid-cols:4] md:inset-x-8 md:[--grid-cols:8]',
        tone === 'dark' && '[--grid-line:rgb(245_244_241/0.08)]',
      )}
    />
  )
}
