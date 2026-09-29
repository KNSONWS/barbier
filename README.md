# Amin B. Ahmadi — Barber & Friseur, Kaiserslautern

Minimalistischer One-Pager für den Salon, gestalterisch angelehnt an [crispmtl.com](https://www.crispmtl.com):
helles Layout mit feinen Rasterlinien, breite Versal-Headlines, kleine Serifen-Labels, eckige Buttons.
Jede Buchung läuft über die bestehende Setmore-Seite ([aminbahmadi.setmore.com](https://aminbahmadi.setmore.com)).

**Bereiche:** Menü-Overlay (Bild wechselt je Link) · Hero mit Foto aus dem Salon · Über uns mit Bild-Reveal ·
Team als Namensliste mit Porträtwechsel · Preise als Akkordeon (jede Zeile öffnet direkt die passende
Setmore-Buchung) · Footer mit Fotoraster, Adresse, Öffnungszeiten und Live-Status „Jetzt geöffnet“.

**Technik:** Vite, React, TypeScript, Tailwind CSS, Motion, Lenis. Schriften (Archivo, Instrument Serif)
liegen lokal, es gibt keine Cookies und keine externen Einbindungen.

## Starten

```bash
npm install
npm run dev      # Entwicklung auf http://localhost:5173
npm run build    # fertige Website in dist/
npm run preview  # Build lokal ansehen
```

## Inhalte ändern

| Was | Wo |
| --- | --- |
| Preise, Dauer, Leistungen, Öffnungszeiten, Team, Kontakt | `src/data/salon.ts` |
| Fotos (Hero, Menü) | `src/assets/photos/*.webp` |
| Logo | `src/assets/logo/emblem.svg` |
| Team-Porträts | `src/assets/team/*.webp` |
| Galerie „Momente“ (Bilder & Titel) | `src/assets/gallery/*.webp`, `src/components/Gallery.tsx` |
| Schriftzug oben in der Mitte | `src/components/Nav.tsx` |
| Favicon, App-Icon, Vorschaubild zum Teilen | `public/` |
| Impressum & Datenschutz | `impressum.html`, `datenschutz.html` |

**Hero:** Amin bei der Arbeit (per Bild-KI erstellt), abgelegt als `hero.webp` (2000 px), `hero-1000.webp`
und `hero-mobile.webp` (Hochformat-Ausschnitt fürs Handy). Die Headline steht unten links, damit Gesichter,
Schere und Kamm frei bleiben. Beim Austauschen alle drei Dateien ersetzen, den Handy-Ausschnitt so wählen,
dass Gesicht und Hände darin liegen. `hero-detail.webp` (Hände mit Schere und Kamm) erscheint im Menü.

**Logo:** Das Instagram-Profilbild (`src/assets/logo/instagram-profilbild.jpg`) wurde mit potrace
vektorisiert:
- `src/assets/logo/emblem.svg` – nur das Emblem, Farbe über `currentColor` (standardmäßig schwarz), für Druck & Co.
- `public/logo-profilbild.svg` – wie das Profilbild: quadratisch, weißes Emblem auf dunklem Grund.

Auf der Website steht es in „Über uns“: Die Linien zeichnen sich beim Scrollen, danach folgt ein Lichtreflex
dem Mauszeiger (`src/components/Emblem.tsx`). Liegt irgendwann die Original-Vektordatei vom Designer vor,
einfach `emblem.svg` ersetzen (ein `<path>` pro Form, `fill="currentColor"`).

**Salon-Foto:** Der Menüpunkt „Kontakt“ zeigt das Logo an der Wand im Salon (`emblem-breit-900.webp`).

**Team-Porträts:** Einheitliche Studio-Porträts (per Bild-KI aus den Originalfotos erstellt), je zweimal
abgelegt: `name.webp` (1000 px breit, Team-Liste) und `name-thumb.webp` (320 × 320, Fotoraster und
Preis-Thumbnails). Neue Porträts im selben Format ablegen und in `src/data/salon.ts` eintragen.

**Galerie:** Schwarze Section zwischen Team und Preise. Auf dem Desktop bleibt sie stehen und die Bilder
laufen beim Scrollen seitlich durch, auf dem Handy wird gewischt. Neues Bild: als WebP (900 px breit) in
`src/assets/gallery/` ablegen und in `moments` in `Gallery.tsx` eintragen (Titel + Seitenverhältnis).

**Direktbuchung:** Jede Leistung trägt ihre Setmore-ID (`id`). Wird bei Setmore eine Leistung
neu angelegt, bekommt sie eine neue ID. Sie steht im Buchungslink der Leistung auf der
Setmore-Seite hinter `products=`.

## Vor dem Livegang

- [ ] Platzhalter in `impressum.html` und `datenschutz.html` ausfüllen (`[…]`) und rechtlich prüfen lassen
- [ ] Domain in `.env` bei `VITE_SITE_URL` eintragen (für das Vorschaubild bei WhatsApp/Facebook)
- [ ] Rollen im Team prüfen (`src/data/salon.ts`)
- [ ] Einverständnis der Kunden auf den Galerie-Fotos einholen
- [ ] Einverständnis des Teams für die Verwendung der Fotos einholen (Porträts und Hero sind KI-Bilder
      nach echten Fotos – vor der Veröffentlichung freigeben lassen)

Der Live-Status „Jetzt geöffnet“ rechnet mit den Öffnungszeiten aus `src/data/salon.ts` und
kennt keine Feiertage.

## Veröffentlichen

`npm run build` erzeugt den Ordner `dist/`. Er läuft auf jedem Webspace (z. B. IONOS, Strato,
All-Inkl), auf Netlify oder Vercel und in Unterordnern, denn alle Pfade sind relativ.
Einfach den Inhalt von `dist/` hochladen.
