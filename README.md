# Amin B. Ahmadi — Barber & Friseur, Kaiserslautern

One-Pager für den Salon: dunkel, modern, wenig Text. Jede Buchung läuft über die bestehende
Setmore-Seite ([aminbahmadi.setmore.com](https://aminbahmadi.setmore.com)).

**Bereiche:** Hero mit animiertem Seidenhintergrund (WebGL) · Laufband · Leistungen & Preise
(jede Zeile öffnet direkt die passende Setmore-Buchung) · Team · Adresse & Öffnungszeiten mit
Live-Status „Jetzt geöffnet“ · großer Buchungs-CTA · Impressum & Datenschutz.

**Technik:** Vite, React, TypeScript, Tailwind CSS, Motion, Lenis. Effekte nach Vorlagen von
[React Bits](https://reactbits.dev) (Silk, Scroll Velocity, Circular Text, Chroma Grid, Magnet,
Split Text). Schriften (Instrument Serif, Geist) liegen lokal, es gibt keine Cookies und keine
externen Einbindungen.

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
| Logo | `src/assets/logo.svg` |
| Team-Fotos | `src/assets/team/*.webp` |
| Favicon, App-Icon, Vorschaubild zum Teilen | `public/` |
| Impressum & Datenschutz | `impressum.html`, `datenschutz.html` |

**Logo:** Das aktuelle Logo ist ein Platzhalter-Monogramm. Das echte Logo als SVG unter
`src/assets/logo.svg` ablegen. Die Farbe im SVG ist egal (die Seite färbt es selbst ein), der
Hintergrund muss aber transparent sein.

**Direktbuchung:** Jede Leistung trägt ihre Setmore-ID (`id`). Wird bei Setmore eine Leistung
neu angelegt, bekommt sie eine neue ID. Sie steht im Buchungslink der Leistung auf der
Setmore-Seite hinter `products=`.

## Vor dem Livegang

- [ ] Echtes Logo einsetzen (siehe oben)
- [ ] Platzhalter in `impressum.html` und `datenschutz.html` ausfüllen (`[…]`) und rechtlich prüfen lassen
- [ ] Domain in `.env` bei `VITE_SITE_URL` eintragen (für das Vorschaubild bei WhatsApp/Facebook)
- [ ] Rollen im Team prüfen (`src/data/salon.ts`)

Der Live-Status „Jetzt geöffnet“ rechnet mit den Öffnungszeiten aus `src/data/salon.ts` und
kennt keine Feiertage.

## Veröffentlichen

`npm run build` erzeugt den Ordner `dist/`. Er läuft auf jedem Webspace (z. B. IONOS, Strato,
All-Inkl), auf Netlify oder Vercel und in Unterordnern, denn alle Pfade sind relativ.
Einfach den Inhalt von `dist/` hochladen.
