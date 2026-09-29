// Alle Inhalte der Website an einem Ort.
// Quelle: https://aminbahmadi.setmore.com — Preise/Zeiten hier anpassen, wenn sie sich bei Setmore ändern.

const SETMORE = 'https://aminbahmadi.setmore.com'

export const BOOKING_URL = `${SETMORE}/book`

export const salon = {
  name: 'Amin B. Ahmadi',
  legalName: 'Amin B. Ahmadi Friseur Salon',
  street: 'Richard-Wagner-Straße 10',
  zip: '67655',
  city: 'Kaiserslautern',
  phone: '+4963131165201',
  phoneDisplay: '0631 31165201',
  email: 'aminbahmadi28@gmail.com',
  facebook: 'https://facebook.com/amin_b_ahmadi',
  geo: { lat: 49.4431737, lng: 7.7656361 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Richard-Wagner-Stra%C3%9Fe+10%2C+67655+Kaiserslautern',
} as const

export type DayHours = { day: string; short: string; open: string | null; close: string | null }

// Reihenfolge Montag → Sonntag. `null` = geschlossen.
export const hours: DayHours[] = [
  { day: 'Montag', short: 'Mo', open: '09:00', close: '19:00' },
  { day: 'Dienstag', short: 'Di', open: '09:00', close: '19:00' },
  { day: 'Mittwoch', short: 'Mi', open: '09:00', close: '19:00' },
  { day: 'Donnerstag', short: 'Do', open: '09:00', close: '19:00' },
  { day: 'Freitag', short: 'Fr', open: '09:00', close: '19:00' },
  { day: 'Samstag', short: 'Sa', open: '09:00', close: '19:00' },
  { day: 'Sonntag', short: 'So', open: null, close: null },
]

// Setmore-ID von Atena — Leistungen, die nur sie anbietet, springen direkt zum nächsten Buchungsschritt.
const ATENA = 'ab5d989c7b138460e9ef970bb2716a8a9'

export type Service = {
  name: string
  note?: string
  minutes: number
  price: number
  /** „ab“-Preis (abhängig von Haarlänge/Aufwand) */
  from?: boolean
  /** Setmore-Service-ID für den Direktlink */
  id: string
  /** gesetzt, wenn nur eine Person die Leistung anbietet */
  staff?: string
}

export const serviceUrl = (s: Service) =>
  s.staff
    ? `${SETMORE}/book?step=additional-products&products=${s.id}&type=service&staff=${s.staff}&staffSelected=false`
    : `${SETMORE}/book?step=staff&products=${s.id}&type=service`

export type ServiceCategory = { key: string; label: string; items: Service[] }

export const services: ServiceCategory[] = [
  {
    key: 'herren',
    label: 'Herren',
    items: [
      { name: 'Maschinenschnitt', note: 'ohne Waschen', minutes: 20, price: 17, id: 'scab580064626bcfc2786e3e10e359241dc0c9d54' },
      { name: 'Herren Basic', note: 'Waschen, Schneiden, Föhnen', minutes: 30, price: 23, id: 'sc3f7ae51cdeb863047f5376611c179c78f33e84c' },
      { name: 'Herren Basic + Bart', note: 'Basic inklusive Bart', minutes: 45, price: 37, id: 's0d0186fc2795c7e0d5af3d7dc9b64c237551f228' },
      { name: 'Bart stutzen', note: 'mit Maschine', minutes: 15, price: 8, id: 's20de03f274a36fe115aaa5b50bae798c8f1a1a9b' },
      { name: 'Men’s Special', note: 'Basic, Zupfen & Nassrasur', minutes: 45, price: 38, id: 'sfdd1b1071cefc7092b91ad89f4407de4f31df53c' },
    ],
  },
  {
    key: 'damen',
    label: 'Damen',
    items: [
      { name: 'Damen Basic · kurz', note: 'Waschen, Schneiden, Föhnen', minutes: 30, price: 26, from: true, id: 'sbadfe20c7a6179c705a30d3cf379fbc77b113b0c' },
      { name: 'Damen Basic · lang', note: 'Waschen, Schneiden, Föhnen', minutes: 45, price: 30, from: true, id: 's6414812bfc137bb6cf41df66e12b6f5cf465b3f7', staff: ATENA },
      { name: 'Cut & Go · kurz', minutes: 25, price: 17, id: 's555fe7169cd2e0aa9dc5f4ca72cd6f156246de3c' },
      { name: 'Cut & Go · lang', minutes: 35, price: 20, id: 'sb23dec861932c50502b7b826e536d8d354f6a1e0' },
      { name: 'Waschen, Pflegen & Föhnen · kurz', minutes: 25, price: 20, from: true, id: 's1f0e304b9e921797e99fff3b758dcd953bdcc8a2', staff: ATENA },
      { name: 'Waschen, Pflegen & Föhnen · lang', minutes: 30, price: 25, from: true, id: 's5c179fe958768fa86c3594a56fd2a2679f00f115', staff: ATENA },
      { name: 'Quickstyling · kurz', note: 'Locken oder Glätten, ohne Waschen', minutes: 20, price: 25, from: true, id: 'sd017c6bba70af3eddfa59fb7652396bf696fa45f', staff: ATENA },
      { name: 'Quickstyling · lang', note: 'Locken oder Glätten, ohne Waschen', minutes: 30, price: 30, from: true, id: 's746e9e32c13956a9c77c7ef884e6961d556473c2', staff: ATENA },
      { name: 'Hochsteckfrisur', note: 'je nach Aufwand', minutes: 60, price: 40, id: 's4c0d1cb0c4806c372dbd35024bcefb2a595c6853', staff: ATENA },
    ],
  },
  {
    key: 'farbe',
    label: 'Farbe & Form',
    items: [
      { name: 'Farbe / Tönung · Ansatz', note: 'ab 3 cm Ansatz', minutes: 50, price: 40, from: true, id: 's44a840b1c42fdb53b6af3f1ffd24dfea6ee29a0d', staff: ATENA },
      { name: 'Farbe / Tönung komplett · kurz', minutes: 50, price: 38, from: true, id: 'se060cd30916ae62e34540083e6c1f6fef8f45a4e', staff: ATENA },
      { name: 'Farbe / Tönung komplett · lang', minutes: 50, price: 48, from: true, id: 's594ab068518d2d4b6b2126f7268a28de732246c5', staff: ATENA },
      { name: 'Blondierung Ansatz · kurz', note: 'bis 3 cm Ansatz', minutes: 40, price: 40, from: true, id: 's6b2a7fb591db39072acab1aa7e7f5320a557cc3f', staff: ATENA },
      { name: 'Blondierung Ansatz · lang', minutes: 40, price: 40, from: true, id: 's9a70e2189423d76c3f612fb38d2fe3f15f229041', staff: ATENA },
      { name: 'Strähnen komplett · kurz', minutes: 60, price: 60, from: true, id: 's044c48784b1916f9725f95e6f281ba5c28722fd3', staff: ATENA },
      { name: 'Strähnen komplett · lang', minutes: 90, price: 80, from: true, id: 's9ee23b0c359db87cdfcc0c6b10efd3242733760b', staff: ATENA },
      { name: 'Balayage · kurz', minutes: 120, price: 90, from: true, id: 'sf230a3eb6df440f44051f2007a2a8148df7ad2a1', staff: ATENA },
      { name: 'Balayage · lang', minutes: 240, price: 140, from: true, id: 's243539debed9c1b284f2b907d5103d68feea1c39', staff: ATENA },
      { name: 'Dauerwelle · kurz', minutes: 45, price: 45, from: true, id: 's9935eeca17760c3f03800f87f1bc64a7a32de37e', staff: ATENA },
      { name: 'Dauerwelle · lang', minutes: 60, price: 60, from: true, id: 'sd83d9fa34a16a1290e0173cfdc157dc0e70815f6' },
      { name: 'Haarglättung', note: 'nach Aufwand', minutes: 120, price: 120, from: true, id: 's37f058393a56acd92b9a4693a5dfd2fdf1d092aa', staff: ATENA },
    ],
  },
  {
    key: 'kinder',
    label: 'Kinder',
    items: [
      { name: 'Jungen', note: 'bis 12 Jahre', minutes: 20, price: 17, id: 's61b05497d001b8d46e3b8ecd88481f0836ff902d' },
      { name: 'Mädchen', note: 'bis 12 Jahre', minutes: 30, price: 17, id: 's73cda469cc3dbd3a134ef93916d12c6a0366084a', staff: ATENA },
    ],
  },
  {
    key: 'beauty',
    label: 'Beauty',
    items: [
      { name: 'Augenbrauen zupfen', note: 'mit Faden', minutes: 10, price: 8, id: 's68c001a88641dfd20758033ec42ab080eb7581a5', staff: ATENA },
      { name: 'Augenbrauen färben', minutes: 10, price: 8, id: 's861a13b3cee5389e7b1b7bcee268234b2a0c0d96', staff: ATENA },
      { name: 'Wimpern färben', minutes: 15, price: 8, id: 's9ae242ebb316198745180e3c6a4e24f1bd645223', staff: ATENA },
      { name: 'Gesichtsbehandlung', minutes: 90, price: 45, id: 's9d8b1c9b46e12d30b2fc25b07768a2d3ba35dc0b', staff: ATENA },
      { name: 'Tages-Make-up', minutes: 30, price: 20, id: 'sc4d7559daf52e84b3894519538ecbd6651a6b24b', staff: ATENA },
      { name: 'Abend-Make-up', minutes: 45, price: 35, id: 's4d0682896c5c11245231e561bbfce08fd335f35f', staff: ATENA },
    ],
  },
]

export type Member = { name: string; role: string; photo?: string }

const photos = import.meta.glob<string>('../assets/team/*.webp', { eager: true, import: 'default' })
const photo = (file: string) => photos[`../assets/team/${file}.webp`]

export const team: Member[] = [
  { name: 'Amin B. Ahmadi', role: 'Inhaber · Barber' },
  { name: 'Atena', role: 'Damen · Farbe · Beauty', photo: photo('atena') },
  { name: 'Ahmad', role: 'Barber', photo: photo('ahmad') },
  { name: 'Ali', role: 'Barber', photo: photo('ali') },
  { name: 'Younes', role: 'Barber', photo: photo('younes') },
  { name: 'Mo Bargus', role: 'Barber', photo: photo('mo') },
]
