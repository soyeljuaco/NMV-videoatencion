import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — triggers a CSS "revealed" state when the element enters the viewport.
 * Returns { ref, visible } — attach ref to the element, then toggle a class based on visible.
 *
 * @param {object} opts
 * @param {number} opts.threshold — fraction of element visible before firing (default 0.12)
 * @param {boolean} opts.once — disconnect after first reveal (default true)
 */
export function useReveal({ threshold = 0.12, once = true } = {}) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion — reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return { ref, visible }
}
