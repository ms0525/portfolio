// Central GSAP setup — register the (now-free, since 3.13) plugins once.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin)

// Media-query strings for gsap.matchMedia(). Keying every animation to
// "no-preference" is how the reduced-motion fallback is implemented in
// practice: under `prefers-reduced-motion: reduce`, the callbacks never run,
// no initial states are set, and the static Phase 1 layout shows through.
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(prefers-reduced-motion: no-preference) and (min-width: 769px)',
  mobile: '(prefers-reduced-motion: no-preference) and (max-width: 768px)',
}

// Snap a pinned ScrollTrigger to its start or end, so scrolling settles the
// section at the top of the viewport (or moves on to the next).
export const SNAP = {
  snapTo: [0, 1],
  duration: { min: 0.15, max: 0.4 },
  delay: 0,
  ease: 'power1.inOut',
}

// Pin a section and play its timeline the moment it snaps into view — autoplay
// on arrival, not scrubbed. The timeline is owned by the ScrollTrigger via
// toggleActions ('restart' on enter, 'reverse' on scroll-back-up), which resets
// and plays it correctly. The pin gives a "landing zone" the snap settles into;
// nothing locks the scroll.
export function pinnedAutoplay(tl, trigger, end = '+=60%') {
  ScrollTrigger.create({
    animation: tl,
    trigger,
    start: 'top top',
    end,
    pin: true,
    anticipatePin: 1,
    snap: SNAP,
    toggleActions: 'restart none none reverse',
  })
  return tl
}

// Dev-only: expose for manual scroll-driving during verification. Stripped
// from production builds by Vite's dead-code elimination on import.meta.env.DEV.
if (import.meta.env.DEV) {
  window.gsap = gsap
  window.ScrollTrigger = ScrollTrigger
  window.ScrollSmoother = ScrollSmoother
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin }
