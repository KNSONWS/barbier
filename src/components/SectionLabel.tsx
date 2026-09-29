import { cn } from '../lib/cn'

export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ash', className)}>
      <span className="text-champagne">({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-white/20" />
      {children}
    </p>
  )
}
