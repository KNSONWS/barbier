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
| Fotos (Hero, Über uns, Menü, Fotoraster) | `src/assets/photos/*.webp` |
| Team-Porträts | `src/assets/team/*.webp` |
| Schriftzug oben in der Mitte | `src/components/Nav.tsx` |
| Favicon, App-Icon, Vorschaubild zum Teilen | `public/` |
| Impressum & Datenschutz | `impressum.html`, `datenschutz.html` |

**Fotos:** Hero, „Über uns“ und Menü nutzen die Fotos von der Logo-Wand im Salon (Setmore-Seite). Für den
Hero lohnt sich ein eigenes, hochauflösendes Foto (mind. 2400 px breit), z. B. ein Barber bei der Arbeit.
Einfach `salon-wand.webp` bzw. `salon-wand-800.webp` ersetzen.

**Team-Porträts:** Einheitliche Studio-Porträts (per Bild-KI aus den Originalfotos erstellt), je zweimal
abgelegt: `name.webp` (1000 px breit, Team-Liste) und `name-thumb.webp` (320 × 320, Fotoraster und
Preis-Thumbnails). Für Amin fehlt noch ein Foto – bis dahin zeigt die Seite bei ihm das Wandlogo. Neues
Porträt als `amin.webp` / `amin-thumb.webp` ablegen und in `src/data/salon.ts` eintragen.

**Direktbuchung:** Jede Leistung trägt ihre Setmore-ID (`id`). Wird bei Setmore eine Leistung
neu angelegt, bekommt sie eine neue ID. Sie steht im Buchungslink der Leistung auf der
Setmore-Seite hinter `products=`.

## Vor dem Livegang

- [ ] Platzhalter in `impressum.html` und `datenschutz.html` ausfüllen (`[…]`) und rechtlich prüfen lassen
- [ ] Domain in `.env` bei `VITE_SITE_URL` eintragen (für das Vorschaubild bei WhatsApp/Facebook)
- [ ] Rollen im Team prüfen (`src/data/salon.ts`)
- [ ] Einverständnis des Teams für die Verwendung der Fotos einholen

Der Live-Status „Jetzt geöffnet“ rechnet mit den Öffnungszeiten aus `src/data/salon.ts` und
kennt keine Feiertage.

## Veröffentlichen

`npm run build` erzeugt den Ordner `dist/`. Er läuft auf jedem Webspace (z. B. IONOS, Strato,
All-Inkl), auf Netlify oder Vercel und in Unterordnern, denn alle Pfade sind relativ.
Einfach den Inhalt von `dist/` hochladen.
