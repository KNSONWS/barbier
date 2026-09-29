import { salon } from '../data/salon'
import { Facebook } from './Icons'
import { Logo } from './Logo'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 pt-12 pb-28 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12">
        <div className="flex items-center gap-4">
          <Logo className="size-12 text-bone" />
          <div className="text-sm">
            <p className="font-medium">{salon.legalName}</p>
            <p className="text-ash">
              {salon.street}, {salon.zip} {salon.city}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ash">
          <a href="impressum.html" className="transition-colors hover:text-bone">
            Impressum
          </a>
          <a href="datenschutz.html" className="transition-colors hover:text-bone">
            Datenschutz
          </a>
          <a
            href={salon.facebook}
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 hover:text-bone"
          >
            <Facebook className="size-4" />
          </a>
          <span className="font-mono text-xs">© {YEAR}</span>
        </div>
      </div>
    </footer>
  )
}
