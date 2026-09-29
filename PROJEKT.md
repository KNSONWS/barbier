# Projektdokumentation – Website Amin B. Ahmadi Friseur Salon

One-Pager für den Barber- und Friseursalon **Amin B. Ahmadi** in Kaiserslautern
(Richard-Wagner-Straße 10). Ziel: minimalistisch, modern, wenig Text, interaktive
Bild-Elemente – alle Buchungen laufen über die bestehende Setmore-Seite
([aminbahmadi.setmore.com](https://aminbahmadi.setmore.com)).

Wie man die Seite startet, Inhalte ändert und veröffentlicht, steht in der [README](README.md).
Dieses Dokument beschreibt, **wie die Seite entstanden ist** und **woher Inhalte und Bilder stammen**.

---

## 1. Datengrundlage

Alle Salon-Daten stammen aus der öffentlichen Setmore-Buchungsseite:

- 36 Leistungen mit Preisen und Dauer, sortiert in Herren, Damen, Farbe & Form, Kinder, Beauty
- Team: Amin B. Ahmadi (Inhaber), Atena, Ahmad, Ali, Younes, Mo Bargus
- Adresse, Telefon, E-Mail, Öffnungszeiten (Mo–Sa 9–19 Uhr)
- Setmore-ID jeder Leistung → jede Preiszeile öffnet direkt die passende Buchung

Bereinigt: Tippfehler („Machinenschnitt“, „Balyage“ …), ein doppeltes „Men's Special“ und ein
vermutlich falsch einsortiertes „Dauerwelle lang“ unter Kosmetik wurden nicht übernommen.
Alles steht zentral in `src/data/salon.ts`.

## 2. Verlauf der Gestaltung

| Schritt | Ergebnis |
| --- | --- |
| 1. Entwurf | Dunkle Seite mit animiertem Seidenhintergrund (WebGL), Chrom-Schriftzug, Laufband, vielen Buttons. |
| 2. Feedback | Zu viel Call-to-Action, zu viel Text, Schriftzug gefällt nicht, Hero soll ein **Foto** sein, mehr **interaktive Bild-Elemente**. Vorbild: [crispmtl.com](https://www.crispmtl.com). |
| 3. Redesign | Heller, minimalistischer Stil wie CRISP: feine Rasterlinien, breite Versal-Headlines (Archivo Expanded), kleine Serifen-Labels (Instrument Serif), eckige Buttons. „Termin buchen“ nur noch oben rechts als Textlink, im Hero und im Footer. |
| 4. Team-Porträts | Einheitliche Studio-Porträts per Bild-KI (siehe 3.1). |
| 5. Hero-Bild | Amin bei der Arbeit, per Bild-KI nach dem Vorbild des CRISP-Heros (siehe 3.2). |
| 6. Logo | Instagram-Profilbild vektorisiert und in „Über uns“ als animiertes Emblem eingebaut; das „A“ ist das Favicon (siehe 4). |
| 7. Galerie | Schwarze Section „Momente“ mit echten Fotos aus dem Salon. |
| 8. Körnung | Filmkorn auf allen Fotos, Varianten per Preview ausgewählt (siehe 5). |

### Aufbau der Seite

1. **Navigation** – Menü-Button, Name in der Mitte, „Termin buchen“. Farbe passt sich per
   `mix-blend-difference` automatisch hellen und dunklen Flächen an.
2. **Menü** (Vollbild) – große Links; daneben wechselt das Bild zum Link unter der Maus
   (bei „Team“ ein Raster aus allen Porträts).
3. **Hero** – Foto „Amin bei der Arbeit“, Headline „Dein Look. Unser Handwerk.“ unten links,
   damit Gesichter, Schere und Kamm frei bleiben. Eigener Hochformat-Ausschnitt fürs Handy.
4. **Über uns** – „Sechs Profis. Ein Salon.“ mit dem Logo: Die Linien zeichnen sich beim
   Scrollen, danach folgt ein Lichtreflex wie auf Metall dem Mauszeiger.
5. **Team** – Namen als große Liste, das Porträt schiebt sich beim Überfahren/Antippen ins Bild.
6. **Momente** – schwarze Galerie; am Desktop bleibt die Section stehen und die Bilder laufen
   beim Scrollen seitlich durch, am Handy wird gewischt.
7. **Preise** – Akkordeon mit kleinen Porträts der Profis, die die Leistungen anbieten;
   jede Zeile führt direkt zur Setmore-Buchung.
8. **Footer** – „Bis zum [Fotoraster] nächsten Schnitt.“, Adresse, Öffnungszeiten mit
   Live-Status „Jetzt geöffnet“, Kontakt, Impressum, Datenschutz.

## 3. Bildgenerierung (Nano Banana Pro / Gemini)

Die Team-Porträts und das Hero-Bild wurden mit **Nano Banana Pro** (Google Gemini) erstellt.
Vorgehen: pro Person ein echtes Foto als Referenz hochladen, immer derselbe Prompt – so sehen
alle Bilder aus wie aus einem Shooting. Die KI-Bilder bitte vor der Veröffentlichung von den
abgebildeten Personen freigeben lassen.

### 3.1 Team-Porträts

Referenz: das jeweilige Foto der Person (für Amin ein eigenes Foto, bei Setmore gab es keins).
Einstellungen: Seitenverhältnis 4:5, mindestens 2K.

```
Use the uploaded photo only as the identity reference for this person. Create a new, photorealistic studio team portrait of exactly this person for a modern barbershop website.

Identity: keep the face 100% identical – facial structure, skin tone, eye shape and colour, eyebrows, nose, lips, ears, hairline, hairstyle and hair length, beard shape and density, visible tattoos and earrings. Keep the apparent age. Do not beautify, slim, smooth or alter the person in any way.

Framing: vertical 4:5, head-and-shoulders portrait from mid-chest up, person centred, eyes at about 38% from the top edge, generous space above the head and on both sides so the image can also be cropped to a square. Shoulders turned about 15 degrees to the left, face and gaze directly into the camera.

Expression: calm, confident and friendly, relaxed face, subtle closed-mouth smile.

Wardrobe: plain black crew-neck T-shirt, no logos, no print.

Background: seamless studio paper backdrop in warm light grey (#d6d4cf), perfectly even, no texture, no objects, very soft slightly darker falloff towards the edges.

Lighting: large softbox key light from 45 degrees front-left, slightly above eye level; soft fill from the right about 1.5 stops darker; subtle rim light from behind to separate hair and shoulders from the background; soft natural shadows, no hard highlights.

Camera: full-frame, 85 mm lens, f/5.6, eye level, tack-sharp focus on the eyes.

Look: high-end editorial portrait photography, neutral white balance, slightly muted natural colours, gentle contrast, natural skin texture with visible pores, no plastic retouching, no HDR, no heavy grain.

Do not add text, logos, watermarks, props, hands, extra jewellery or accessories that are not in the reference, or other people.
```

Tipp für Konsistenz: das erste gelungene Porträt bei allen weiteren als zweites Bild mitgeben und
anhängen: *„Match the background, lighting, framing, crop and colour grading of the second image
exactly; take only the person from the first image.“*

### 3.2 Hero-Bild „Amin bei der Arbeit“

Referenz: nur Amins Porträt. Die Szene (Pose, Hände, Schere, Kamm, Kunde, Licht) ist komplett
beschrieben, angelehnt an das Hero-Foto von crispmtl.com. Der Kunde ist eine erfundene Person.
Einstellungen: 16:9, 4K.

```
Photorealistic editorial photograph for a barbershop website hero image. Landscape 16:9. The image only – absolutely no text, letters, headline, logo, button, watermark or graphic overlay.

BARBER (identity from the attached reference photo):
The barber is exactly the man in the attached reference image. Keep his face 100% identical: face shape, skin tone, eyes, eyebrows, nose, lips, ears, beard shape and density, apparent age. Do not beautify or alter him. He wears the same black baseball cap as in the reference, but plain black without any logo or embroidery.

SCENE AND POSITIONS:
A barber at work on a seated client, captured in a calm, precise moment.
- The barber stands behind and slightly to the left of the client (as seen from the camera), upper body visible from the cap down to the hips. His head is in the upper left third (about 33% from the left edge, close to the top edge with a little headroom). His torso is turned about 30 degrees towards the client on the right. His head is tilted down about 20 degrees and his eyes look down at the client's head with a focused, calm expression, mouth closed.
- His RIGHT hand (lower hand, left of image centre, at chest height about 45% from the left and 50% from the top) holds professional hair-cutting shears: polished stainless steel, slim straight 6-inch blades, blades closed. Thumb in the lower ring, ring finger in the upper ring, index finger resting along the shank. The blade tips point diagonally up and to the right at about 45 degrees towards the side of the client's head, about 20 cm away, not touching.
- His LEFT arm is raised, elbow bent outwards to the right, forearm almost horizontal above the client's head. His LEFT hand (about 64% from the left, 25% from the top) points the index finger straight down towards the top of the client's head, checking the line. A long, slim ivory-white cutting comb (about 20 cm) sits clamped between his middle and ring fingers and sticks out horizontally to the right.
- The client sits in the foreground, right of centre, in a barber chair that is completely hidden under the cape. He faces the camera straight on, head upright and level, eyes closed, face relaxed and serene, lips closed. His head is centred about 62% from the left; the top of his head is about 35% from the top, just below the barber's pointing finger, and his chin is at about 65% of the height. He is a young man in his mid-twenties with a fresh high skin fade on the sides, a very short dark crop on top, a neat dark moustache and short goatee, and light stubble along the jaw.

WARDROBE:
- Barber: relaxed-fit sage-green long-sleeve button-up shirt with collar, cuffs buttoned, a chest pocket with a small sprig of dried flowers tucked in. A gold curb-chain bracelet on his right wrist, a gold signet ring on his left hand.
- Client: matte ivory/cream barber cape with a ribbed elastic collar snug around the neck. The cape covers his shoulders and body and fills the lower right of the frame down to the bottom edge as a large, calm, light area.

BACKGROUND:
Seamless, plain, very light grey-white studio wall (#e6e7e4), no objects, no mirror, no salon interior, no floor visible. Soft, even tone with a slight falloff from lighter upper left to slightly darker grey at the right edge. The right 15% of the frame is empty background.

LIGHT:
Soft, diffused high-key studio light from a large source at front-left, slightly above eye level. Very soft shadows on the right side of both faces, low contrast, no hard highlights, no dramatic lighting.

CAMERA:
Full-frame camera, 45 mm lens, f/4, at the client's eye level, straight-on frontal perspective, no tilt. Both faces, both hands, the shears and the comb in sharp focus.

COLOUR AND LOOK:
Muted, airy and slightly desaturated palette: pale grey-white, sage green, ivory, natural warm skin tones, polished silver steel, small gold accents. Matte, natural finish like a premium editorial campaign, natural skin texture, no HDR, no heavy grain, no plastic retouching.

AVOID:
Any text or logos (including on the cap), extra people, extra or missing fingers, distorted hands, fingers not correctly inside the scissor rings, hair clippings in the air, mirrors, salon furniture, props other than shears and comb.
```

Weiterverarbeitung: Desktop-Version (2000 px), kleinere Version (1000 px), Hochformat-Ausschnitt
fürs Handy mit Amin und Schere, Detail-Ausschnitt (Hände, Schere, Kamm) für das Menü.

## 4. Logo

- Quelle: Instagram-Profilbild des Salons (`src/assets/logo/instagram-profilbild.jpg`, 583 × 583 px).
- Vektorisiert mit **potrace** (Bild 6-fach vergrößert, geschärft, Schwellwert, Kurven-Tracing),
  Koordinaten bereinigt und komprimiert.
- `src/assets/logo/emblem.svg` – nur das Emblem, Farbe `currentColor`, frei skalierbar.
- `public/logo-profilbild.svg` – wie das Profilbild: weißes Emblem auf dunklem Quadrat.
- **Favicon:** nur das Serifen-„A“ aus dem Emblem (im Tab gut erkennbar); **App-Icon** fürs
  Handy: das komplette Emblem.
- Hinweis: Wegen der kleinen Vorlage ist das Ornament unten minimal kräftiger als im Original.
  Liegt die Original-Vektordatei vom Designer vor, einfach `emblem.svg` ersetzen.

## 5. Körnung (Filmkorn)

Für einen analogen Nacht-Look wurden vier Varianten als Preview erstellt und verglichen:
A fein & dezent · B Film ISO 800 · C Nacht ISO 3200 · D Nacht mit Lichthof.

Ausgewählt:
- **Galerie „Momente“:** Variante B (sichtbares, leicht farbiges Korn, angehobenes Schwarz, leicht entsättigt)
- **Alle anderen Fotos** (Hero, Team-Porträts, Menü): Variante A (fein)

Die Körnung ist fest in die Bilddateien eingerechnet. Die unbearbeiteten Originale liegen in
`design/original/`; `python3 scripts/grain.py` wendet den Effekt reproduzierbar erneut an.

## 6. Technik

- **Vite + React + TypeScript**, **Tailwind CSS**, **Motion** (Animationen), **Lenis** (weiches Scrollen)
- Schriften lokal eingebunden (Archivo, Instrument Serif) – keine Google-Fonts-Anfragen
- Keine Cookies, kein Tracking, keine externen Einbindungen; Setmore, Google Maps und Facebook
  nur als normale Links
- Bilder als WebP, Galerie- und Team-Bilder werden erst beim Scrollen geladen
- Rücksicht auf „Bewegung reduzieren“ in den Systemeinstellungen, Tastaturbedienung
  (Menü mit Esc, Akkordeon, Team-Liste)
- Impressum und Datenschutz als eigene Seiten; SEO-Daten (Schema.org `HairSalon`, Vorschaubild)

## 7. Offen vor dem Livegang

- [ ] Platzhalter in `impressum.html` und `datenschutz.html` ausfüllen und rechtlich prüfen lassen
- [ ] Domain in `.env` bei `VITE_SITE_URL` eintragen
- [ ] Freigabe aller abgebildeten Personen (KI-Porträts, Hero, Kunden in der Galerie)
- [ ] Rollen im Team prüfen (`src/data/salon.ts`)
