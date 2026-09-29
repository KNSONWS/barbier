import { useLayoutEffect, useRef } from 'react'

/**
 * Skaliert die Schriftgröße eines einzeiligen Elements so, dass es genau die Breite
 * seines Elternelements ausfüllt (randlose Wortmarke).
 */
export function useFitText<T extends HTMLElement>(max = 400) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const fit = () => {
      el.style.fontSize = '100px'
      const natural = el.scrollWidth
      const available = parent.clientWidth
      if (!natural || !available) return
      el.style.fontSize = `${Math.min(max, (100 * available) / natural) * 0.995}px`
    }

    fit()
    document.fonts?.ready.then(fit)

    let frame = 0
    let lastWidth = parent.clientWidth
    const ro = new ResizeObserver(() => {
      // Höhenänderungen entstehen durch die Schriftgröße selbst — nur auf neue Breiten reagieren
      const width = parent.clientWidth
      if (width === lastWidth) return
      lastWidth = width
      // außerhalb der Observer-Runde anpassen, sonst meldet der Browser eine Resize-Schleife
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    })
    ro.observe(parent)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [max])

  return ref
}
