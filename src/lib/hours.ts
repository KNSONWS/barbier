import { hours } from '../data/salon'

export type OpenStatus = {
  open: boolean
  /** Index in `hours` (0 = Montag) für den heutigen Tag in Kaiserslautern */
  today: number
  label: string
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** „09:00“ → „9 Uhr“, „18:30“ → „18:30 Uhr“ */
export const formatTime = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return m === 0 ? `${h} Uhr` : `${h}:${String(m).padStart(2, '0')} Uhr`
}

/** Aktuelle Uhrzeit in Kaiserslautern — unabhängig von der Zeitzone des Besuchers. */
function berlinNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const jsDay = WEEKDAYS.indexOf(get('weekday'))
  return { day: (jsDay + 6) % 7, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = berlinNow(date)
  const todayHours = hours[day]

  if (todayHours.open && todayHours.close) {
    const open = toMinutes(todayHours.open)
    const close = toMinutes(todayHours.close)
    if (minutes >= open && minutes < close) {
      return { open: true, today: day, label: `Jetzt geöffnet · bis ${formatTime(todayHours.close)}` }
    }
    if (minutes < open) {
      return { open: false, today: day, label: `Geschlossen · öffnet heute um ${formatTime(todayHours.open)}` }
    }
  }

  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7]
    if (next.open) {
      const when = i === 1 ? 'morgen' : next.day
      return { open: false, today: day, label: `Geschlossen · öffnet ${when} um ${formatTime(next.open)}` }
    }
  }
  return { open: false, today: day, label: 'Geschlossen' }
}

/** Öffnungszeiten kompakt, z. B. ["Mo – Sa 9 – 19 Uhr", "So geschlossen"] */
export function compactHours() {
  const groups: { from: string; to: string; open: string | null; close: string | null }[] = []
  for (const h of hours) {
    const last = groups[groups.length - 1]
    if (last && last.open === h.open && last.close === h.close) last.to = h.short
    else groups.push({ from: h.short, to: h.short, open: h.open, close: h.close })
  }
  return groups.map((g) => {
    const days = g.from === g.to ? g.from : `${g.from} – ${g.to}`
    if (!g.open || !g.close) return `${days} geschlossen`
    return `${days} ${formatTime(g.open).replace(' Uhr', '')} – ${formatTime(g.close)}`
  })
}
