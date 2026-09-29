import { useState } from 'react'
import { team } from '../data/salon'
import { cn } from '../lib/cn'

/**
 * Team als große Namensliste — das Porträt daneben wechselt beim Überfahren
 * (auf dem Handy per Tippen) und schiebt sich von unten ins Bild.
 */
export function TeamList() {
  // `previous` bleibt sichtbar, bis das neue Bild darübergeglitten ist
  const [{ active, previous }, setSelection] = useState({ active: 0, previous: 0 })
  const select = (i: number) => setSelection((s) => (s.active === i ? s : { active: i, previous: s.active }))

  const current = team[active]

  return (
    <section id="team" className="border-t border-ink/10 px-4 py-24 md:px-8 md:py-36">
      <div className="mini flex justify-between gap-6">
        <span>Team</span>
        <span className="text-right" aria-live="polite">
          {current.name} — {current.role}
        </span>
      </div>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2">
        <ul className="order-2 md:order-1">
          {team.map((m, i) => (
            <li key={m.key}>
              <button
                type="button"
                aria-pressed={active === i}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => select(i)}
                className={cn(
                  'display block cursor-pointer py-0.5 text-left text-[clamp(2.6rem,6.5vw,6rem)] transition-opacity duration-300',
                  active === i ? 'opacity-100' : 'opacity-25 hover:opacity-60',
                )}
              >
                {m.short}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative order-1 aspect-square overflow-hidden bg-ink md:order-2 md:aspect-auto md:min-h-[32rem]">
          {team.map((m, i) => (
            <img
              key={m.key}
              src={m.photo}
              alt={i === active ? `Porträt: ${m.name}` : ''}
              loading="lazy"
              decoding="async"
              className={cn(
                'absolute inset-0 size-full object-cover',
                i === active
                  ? 'z-20 [clip-path:inset(0_0_0_0)] transition-[clip-path] duration-700 ease-out-expo'
                  : i === previous
                    ? 'z-10 [clip-path:inset(0_0_0_0)]'
                    : 'z-0 [clip-path:inset(100%_0_0_0)]',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
