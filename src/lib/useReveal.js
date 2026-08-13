import { useGSAP } from '@gsap/react'
import { gsap, MQ } from './gsap'

/**
 * Lightweight scrubbed reveal (fade + slide up, staggered) for the quieter
 * scenes — Scene 5 (lab notebook) and Scene 7 (now/contact). No pin. The reveal
 * is tied to scroll position over a short range as the block enters, so it's
 * driven by scroll rather than a one-shot toggle. Under reduced motion the
 * callback never runs, so items stay fully visible.
 */
export function useReveal(root, { selector, y = 24, stagger = 0.08, start = 'top 88%', end = 'top 55%' } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const items = gsap.utils.toArray(selector, root.current)
        if (!items.length) return
        gsap.from(items, {
          y,
          opacity: 0,
          ease: 'power2.out',
          stagger,
          scrollTrigger: { trigger: root.current, start, end, scrub: true },
        })
      })
    },
    { scope: root }
  )
}
