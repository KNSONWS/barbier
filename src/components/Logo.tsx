import logoUrl from '../assets/logo.svg'
import { cn } from '../lib/cn'

/**
 * Das Logo wird als Maske gerendert und übernimmt so die Textfarbe (bzw. einen Verlauf).
 * Zum Austauschen einfach `src/assets/logo.svg` ersetzen — die Farbe im SVG spielt keine Rolle,
 * nur der Hintergrund muss transparent sein.
 */
export function Logo({ className, label = 'Amin B. Ahmadi' }: { className?: string; label?: string }) {
  return (
    <span
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        maskImage: `url("${logoUrl}")`,
        WebkitMaskImage: `url("${logoUrl}")`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
