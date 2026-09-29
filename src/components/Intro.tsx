import { image, salon } from '../data/salon'
import { FadeIn, ImageReveal, RevealLines } from './Reveal'

export function Intro() {
  return (
    <section id="salon" className="px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <ImageReveal
          src={image('photos/emblem')}
          alt={`Das Logo von ${salon.name} aus Edelstahl an der Schieferwand im Salon`}
          className="aspect-[4/5] md:col-span-4"
        />

        <div className="flex flex-col justify-between gap-12 md:col-span-8">
          <div className="mini flex justify-between">
            <span>Über uns</span>
            <span>{salon.city}</span>
          </div>

          <div className="grid gap-6 md:grid-cols-8 md:items-end md:gap-8">
            <RevealLines
              className="display text-[clamp(2.1rem,5vw,4.5rem)] md:col-span-5"
              lines={['Sechs Profis.', 'Ein Salon.']}
            />
            <FadeIn className="md:col-span-3">
              <p className="max-w-sm text-[15px] leading-snug">
                Barber & Friseur in {salon.city}: präzise Schnitte, gepflegte Bärte, Farbe und Styling – für
                Herren, Damen und Kinder.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
