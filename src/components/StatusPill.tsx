import type { OpenStatus } from '../lib/hours'
import { cn } from '../lib/cn'

export function StatusPill({ status, className }: { status: OpenStatus; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink/40 px-3.5 py-1.5 text-xs text-bone/80 backdrop-blur-md',
        className,
      )}
    >
      <span className="relative flex size-2">
        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />}
        <span className={cn('relative size-2 rounded-full', status.open ? 'bg-emerald-400' : 'bg-rose-400')} />
      </span>
      {status.label}
    </p>
  )
}
