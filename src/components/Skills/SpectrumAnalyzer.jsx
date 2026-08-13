import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ, pinnedAutoplay } from '../../lib/gsap'
import { skillClusters } from '../../content/skills'
import SectionWrapper from '../common/SectionWrapper'
import './Skills.css'

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
        {skillClusters.map((cluster) => (
          <div className="analyzer__cluster" key={cluster.id}>
            <p className="data-label analyzer__cluster-label">{cluster.label}</p>
            <ul className="analyzer__chart">
              {cluster.skills.map((skill) => (
                <li className="analyzer__col" key={skill.name}>
                  <div className="analyzer__bar-area">
                    <div className="analyzer__bar" style={{ height: `${skill.level}%` }} />
                  </div>
                  <span className="analyzer__skill">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
