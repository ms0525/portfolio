import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ, pinnedAutoplay } from '../../lib/gsap'
import { skillClusters } from '../../content/skills'
import SectionWrapper from '../common/SectionWrapper'
import './Skills.css'

// Near-uniform bar heights — deliberately NOT a proficiency meter (the CV makes
// no such claim). The variation is just visual life for the analyzer look.
function barHeight(ci, si) {
  const s = Math.sin(ci * 3.1 + si * 1.7) * 0.5 + 0.5
  return 72 + Math.round(s * 26) // 72%..98%
}

export default function SpectrumAnalyzer() {
  const root = useRef(null)

  useGSAP(
    () => {
      // The pinned/triggered element is the ancestor <section id="skills">.
      // Use the element itself, not the string '#skills' — useGSAP's scope would
      // scope that selector to the .analyzer ref and fail to find it.
      const section = root.current.closest('.section')

      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const bars = gsap.utils.toArray('.analyzer__bar', root.current)
        const labels = gsap.utils.toArray('.analyzer__cluster-label', root.current)

        // start collapsed (only ever set when motion is allowed)
        gsap.set(bars, { transformOrigin: 'bottom center', scaleY: 0 })
        gsap.set(labels, { opacity: 0, y: 10 })

        if (ctx.conditions.desktop) {
          // Pin, snap into view, and autoplay the bars rising on arrival.
          const tl = gsap.timeline({ paused: true })
          tl.to(labels, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, ease: 'power1.inOut' }, 0)
            .to(
              bars,
              { scaleY: 1, duration: 0.6, ease: 'power1.inOut', stagger: { each: 0.03, from: 'start' } },
              0.1
            )
          pinnedAutoplay(tl, section, '+=60%')
        } else {
          // Mobile: rise on enter, no pin (touch scroll fights pinning).
          gsap.to(labels, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 75%' },
          })
          gsap.to(bars, {
            scaleY: 1,
            stagger: 0.015,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 70%' },
          })
        }
      })
    },
    { scope: root }
  )

  return (
    <SectionWrapper
      id="skills"
      headingId="skills-title"
      label="// instrumentation"
      title="Instrumentation"
    >
      <div className="analyzer" ref={root}>
        {skillClusters.map((cluster, ci) => (
          <div className="analyzer__cluster" key={cluster.id}>
            <p className="data-label analyzer__cluster-label">{cluster.label}</p>
            <ul className="analyzer__chart">
              {cluster.skills.map((skill, si) => (
                <li className="analyzer__col" key={skill}>
                  <div className="analyzer__bar-area">
                    <div className="analyzer__bar" style={{ height: `${barHeight(ci, si)}%` }} />
                  </div>
                  <span className="analyzer__skill">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
