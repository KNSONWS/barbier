import { hours, salon } from '../data/salon'
import { cn } from '../lib/cn'
import { useOpenStatus } from '../lib/useOpenStatus'
import { BookButton } from './BookButton'
import { Mail, Phone } from './Icons'
import { FadeIn, RevealLines } from './Reveal'
import { SectionLabel } from './SectionLabel'
import { StatusPill } from './StatusPill'

export function Visit() {
  const status = useOpenStatus()

  return (
    <section id="kontakt" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionLabel index="03">Besuch</SectionLabel>

      <div className="mt-8 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
        <div>
          <RevealLines
            className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl"
            lines={['Richard-Wagner-', 'Straße 10']}
          />
          <FadeIn>
            <p className="mt-5 text-xl text-ash md:text-2xl">
              {salon.zip} {salon.city}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <BookButton href={salon.mapsUrl} variant="ghost">
                Route planen
              </BookButton>
              <a
                href={`tel:${salon.phone}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <Phone className="size-4" />
                {salon.phoneDisplay}
              </a>
            </div>
            <a
              href={`mailto:${salon.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
            >
              <Mail className="size-4" />
              {salon.email}
            </a>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
              {salon.geo.lat.toFixed(4)}° N · {salon.geo.lng.toFixed(4)}° E
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-serif text-4xl">Öffnungszeiten</h3>
            <StatusPill status={status} />
          </div>
          <ul className="mt-8 border-t border-white/10">
            {hours.map((h, i) => {
              const today = i === status.today
              return (
                <li
                  key={h.day}
                  className={cn(
                    'flex items-center justify-between border-b border-white/10 py-4 md:py-5',
                    today ? 'text-bone' : 'text-bone/55',
                  )}
                >
                  <span className="flex items-center gap-3">
                    {h.day}
                    {today && (
                      <span className="rounded-full bg-champagne/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-champagne">
                        Heute
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-sm md:text-base">{h.open ? `${h.open} – ${h.close}` : 'Geschlossen'}</span>
                </li>
              )
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
