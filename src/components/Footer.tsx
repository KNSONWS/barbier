import { motion } from 'motion/react'
import { salon, team } from '../data/salon'
import { compactHours } from '../lib/hours'
import { EASE_OUT_EXPO } from '../lib/motion'
import { useOpenStatus } from '../lib/useOpenStatus'
import { Button } from './Button'
import { GridLines } from './GridLines'
import { ArrowUpRight } from './Icons'

const YEAR = new Date().getFullYear()

// 3 × 2 Fotoraster zwischen den Wörtern: das ganze Team
const tiles = team.map((m) => ({ src: m.thumb, alt: m.name }))

function PhotoGrid() {
  return (
    <span aria-hidden="true" className="my-3 grid w-[min(62vw,19rem)] grid-cols-3 gap-[2px] border-2 border-paper bg-paper md:my-5">
      {tiles.map((t, i) => (
        <motion.span
          key={t.alt}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT_EXPO }}
          className="block aspect-square overflow-hidden bg-ink"
        >
          <img
            src={t.src}
            alt=""
            loading="lazy"
            className="size-full object-cover grayscale transition duration-500 hover:scale-110 hover:grayscale-0"
          />
        </motion.span>
      ))}
    </span>
  )
}

export function Footer() {
  const status = useOpenStatus()

  return (
    <footer id="kontakt" className="relative isolate bg-ink px-4 pt-24 pb-6 text-paper md:px-8 md:pt-36">
      <GridLines tone="dark" />

      <p className="mini text-center text-paper/60">Termin</p>
      <h2 className="display mt-4 flex flex-col items-center text-center text-[clamp(2.1rem,5vw,4.5rem)]">
        <span>Bis zum</span>
        <PhotoGrid />
        <span>nächsten Schnitt.</span>
      </h2>
      <div className="mt-8 flex justify-center md:mt-10">
        <Button tone="light" />
      </div>

      <div className="mt-24 grid gap-10 text-[15px] leading-relaxed md:mt-36 md:grid-cols-3 md:gap-8">
        <div>
          <p className="mini text-paper/50">Adresse</p>
          <address className="mt-2 not-italic">
            {salon.street}
            <br />
            {salon.zip} {salon.city}
          </address>
          <a
            href={salon.mapsUrl}
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-60"
          >
            Route planen <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div>
          <p className="mini text-paper/50">Öffnungszeiten</p>
          <p className="mt-2">
            {compactHours().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-2 flex items-center gap-2 text-paper/70">
            <span className={`size-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-paper/40'}`} />
            {status.label}
          </p>
        </div>

        <div>
          <p className="mini text-paper/50">Kontakt</p>
          <p className="mt-2">
            <a href={`tel:${salon.phone}`} className="block hover:opacity-60">
              {salon.phoneDisplay}
            </a>
            <a href={`mailto:${salon.email}`} className="block hover:opacity-60">
              {salon.email}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/60 md:mt-28">
        <span>
          © {YEAR} {salon.legalName}
        </span>
        <span className="flex gap-6">
          <a href="impressum.html" className="hover:text-paper">
            Impressum
          </a>
          <a href="datenschutz.html" className="hover:text-paper">
            Datenschutz
          </a>
          <a href={salon.facebook} target="_blank" rel="noopener" className="hover:text-paper">
            Facebook
          </a>
        </span>
      </div>
    </footer>
  )
}
