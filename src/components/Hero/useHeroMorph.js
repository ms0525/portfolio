import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'

// Hero signature — the waveform → spectrogram → detection sequence, but on its
// OWN loop (auto, not scroll-driven). The waveform floats (Waveform `animate`)
// during the dwell, then the spectrogram wipes in and detection boxes draw on,
// holds, and reverses back to the floating wave — repeating.
//
// Under reduced motion nothing runs; CSS leaves the resolved spectrogram +
// detection visible (and the floating wave hidden), so the static state still
// tells the "seeing sound" story.
export function useHeroMorph(root) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const introText = q('.hero__eyebrow, .hero__name, .hero__tagline, .hero__supporting')
      const scroll = q('.hero__scroll')
      const waveSvg = q('.hero__wave')
      const spec = q('.hero__spec')
      const corners = q('.spectrogram__corner')
      const labels = q('.spectrogram__label')

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // Load intro (once): settle the text + scroll cue in.
        gsap.set(introText, { opacity: 0, y: 24 })
        gsap.set(scroll, { opacity: 0 })
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(introText, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 0.1)
          .to(scroll, { opacity: 1, duration: 0.6 }, 0.7)

        // Visual loop. Start = floating wave, spectrogram + boxes hidden.
        gsap.set(waveSvg, { opacity: 1 })
        gsap.set(spec, { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.set(corners, { drawSVG: '0%' })
        gsap.set(labels, { opacity: 0, y: 4 })

        gsap
          .timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })
          .to({}, { duration: 2.6 }) // float dwell (wave travels on its own)
          .to(spec, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3 }) // spectrogram wipes in
          .to(waveSvg, { opacity: 0, duration: 0.7 }, '<0.15') // wave fades out
          .to(corners, { drawSVG: '100%', stagger: 0.08, duration: 0.7 }, '>-0.15') // boxes draw
          .to(labels, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4 }, '<0.35') // labels
          .to({}, { duration: 2.4 }) // hold the detected state
          .to(labels, { opacity: 0, y: 4, duration: 0.4 }) // reset
          .to(corners, { drawSVG: '0%', duration: 0.5 }, '<')
          .to(spec, { clipPath: 'inset(0% 100% 0% 0%)', duration: 1.0 }, '<0.2')
          .to(waveSvg, { opacity: 1, duration: 0.7 }, '<0.3') // floating wave returns
          .to({}, { duration: 0.4 })
      })
    },
    { scope: root }
  )
}
