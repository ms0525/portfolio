import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, MQ, pinnedAutoplay } from '../../lib/gsap'
import { manifesto } from '../../content/site'
import Spectrogram from '../common/Spectrogram'
import './Manifesto.css'

export default function Manifesto() {
  const root = useRef(null)

  useGSAP(
    () => {
      const textEl = root.current.querySelector('.manifesto__text')
      const scan = root.current.querySelector('.manifesto__scan')

      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const split = SplitText.create(textEl, { type: 'words' })
        gsap.set(split.words, { opacity: 0.25 })
        gsap.set(scan, { opacity: 0.85 })

        // Pin briefly; words light and the scan line sweeps as you scroll.
        const desktop = ctx.conditions.desktop
        const stagger = desktop ? 0.03 : 0.02
        // match the scan-line sweep to the full word-reveal duration so both
        // progress together (default tween dur 0.5 + the staggered start times)
        const sweepDur = 0.5 + stagger * (split.words.length - 1)

        const buildTl = (tl) =>
          tl.to(split.words, { opacity: 1, stagger, ease: 'none' }, 0).fromTo(
            scan,
            { left: '0%' },
            { left: '100%', ease: 'none', duration: sweepDur },
            0
          )

        if (desktop) {
          // Pin, snap into view, and autoplay the reveal on arrival.
          const tl = buildTl(gsap.timeline({ paused: true }))
          pinnedAutoplay(tl, root.current, '+=60%')
        } else {
          buildTl(
            gsap.timeline({
              scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 40%', scrub: true },
            })
          )
        }

        return () => split.revert()
      })
    },
    { scope: root }
  )

  return (
    <section id="manifesto" className="manifesto" aria-label="Manifesto" ref={root}>
      <div className="manifesto__bg" aria-hidden="true">
        <Spectrogram cols={72} rows={32} faint fill animated ariaLabel="" />
        <div className="manifesto__scan" />
      </div>
      <div className="manifesto__inner container">
        <p className="manifesto__text measure">{manifesto}</p>
      </div>
    </section>
  )
}
