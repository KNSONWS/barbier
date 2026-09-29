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
    const ro = new ResizeObserver(fit)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [max])

  return ref
}
