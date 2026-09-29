import type Lenis from 'lenis'

// Gemeinsamer Zugriff auf das weiche Scrollen (Lenis), z. B. für das Menü-Overlay.
let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

export const lockScroll = () => {
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  lenis?.start()
}

export const scrollToHash = (hash: string) => {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { duration: 1.4 })
  else target.scrollIntoView({ behavior: 'smooth' })
}
