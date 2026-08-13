import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'
import { statusLine, education, languages } from '../../content/site'
import { useReveal } from '../../lib/useReveal'
import SectionWrapper from '../common/SectionWrapper'
import DetectionBox from '../common/DetectionBox'
import './Now.css'

const EQ_BARS = Array.from({ length: 18 })

export default function Now() {
  const root = useRef(null)
  const eqRef = useRef(null)
  useReveal(root, { selector: '.now__status, .now__col, .now__monitor', stagger: 0.12 })

  // One traveling wave across the bars (not per-bar bounces) — a single wave
  // that flows and continuously varies. Gated by reduced motion.
  useGSAP(
    () => {
      const bars = gsap.utils.toArray('.now__eq-bar', eqRef.current)
      if (!bars.length) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const n = bars.length
        gsap.set(bars, { transformOrigin: 'bottom center' })
        const state = { phase: 0 }
        const tween = gsap.to(state, {
          phase: Math.PI * 2,
          duration: 2.6,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            for (let i = 0; i < n; i++) {
              const wave = 0.5 + 0.5 * Math.sin((i / n) * Math.PI * 2 + state.phase)
              bars[i].style.transform = `scaleY(${(0.22 + 0.78 * wave).toFixed(3)})`
            }
          },
        })
        return () => tween.kill()
      })
    },
    { scope: eqRef }
  )

  return (
    <SectionWrapper id="now" headingId="now-title" label="// now" title="Currently">
      <div className="now__layout" ref={root}>
        <div className="now__main">
          <p className="now__status">
            <span className="now__cursor" aria-hidden="true" />
            {statusLine}
          </p>

          <div className="now__cols">
            <div className="now__col">
              <h3 className="data-label now__subhead">Education</h3>
              <ul className="now__list">
                {education.map((e) => (
                  <li className="now__item" key={e.degree}>
                    <p className="now__degree">{e.degree}</p>
                    <p className="now__meta data-label">{e.org}</p>
                    <p className="now__meta data-label">{e.dates}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="now__col">
              <h3 className="data-label now__subhead">Languages</h3>
              <ul className="now__list">
                {languages.map((l) => (
                  <li className="now__item now__item--lang" key={l.name}>
                    <span className="now__lang-name">{l.name}</span>
                    <span className="now__meta data-label">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Live "signal monitor" — a decorative, on-theme equalizer that fills
            the space and reinforces "currently active". */}
        <DetectionBox variant="active" className="now__monitor">
          <div className="now__monitor-head">
            <span className="now__monitor-dot" aria-hidden="true" />
            <span className="data-label now__monitor-label">signal: live</span>
          </div>
          <div className="now__eq" aria-hidden="true" ref={eqRef}>
            {EQ_BARS.map((_, i) => (
              <span className="now__eq-bar" key={i} />
            ))}
          </div>
          <p className="data-label now__monitor-caption">audio · signal · ml</p>
        </DetectionBox>
      </div>
    </SectionWrapper>
  )
}
