import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'
import { flagship } from '../../content/projects'
import SectionWrapper from '../common/SectionWrapper'
import FlagshipCase, { metricPct } from './FlagshipCase'
import './Projects.css'

// Two slides. Scroll takes you case 1 → case 2 (sideways), then both zoom out
// and shed their body text as they settle side-by-side — case 1 sweeping back
// in from the left. Mobile / reduced motion fall back to a stacked read.
export default function FlagshipWork() {
  const root = useRef(null)

  useGSAP(
    () => {
      const section = root.current.closest('.section')
      const cards = gsap.utils.toArray('.fwork2__card', root.current)
      if (cards.length < 2) return
      const [c1, c2] = cards

      const mm = gsap.matchMedia()
      mm.add(MQ.desktop, () => {
        section.classList.add('fwork--v2')
        const W = () => root.current.clientWidth
        const cardPx = () => Math.min(1100, 0.92 * W())
        // compact scale so each card is ~44% of the stage (fits side by side at any width)
        const cScale = () => (0.44 * W()) / cardPx()
        // In the compact phase each card sheds its full-width narrative (top) and
        // its footer/chips (bottom) — both collapse (fade + height→0) with their
        // gap cancelled so nothing is left behind, leaving just title + spectrogram
        // + metric box for a clean, uniform side-by-side.
        const rowGap = (el) => (el ? parseFloat(getComputedStyle(el.parentElement).rowGap) || 0 : 0)
        const collapsibles = [c1, c2].map((c) => ({
          narr: c.querySelector('.flagship__narrative'),
          footer: c.querySelector('.flagship__footer'),
        }))

        gsap.set([c1, c2], { xPercent: -50, yPercent: -50 })
        gsap.set(c1, { x: 0, scale: 1, opacity: 1 })
        gsap.set(c2, { x: () => W() * 0.92, scale: 1, opacity: 0 })

        // mAP count-up prep — case 2's before/after metric (case 1 now also has a
        // metric, but it's the ranking shape with no `from`/`to`, so match by shape).
        const afterFill = c2.querySelector('.metric__fill--after')
        const afterVal = c2.querySelector('.metric__val--hot')
        const metric = flagship.find((p) => p.metric && p.metric.from != null)?.metric
        if (afterFill && afterVal && metric) {
          gsap.set(afterFill, { width: `${metricPct(metric.from)}%` })
          afterVal.textContent = metric.from.toFixed(2)
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=2800',
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        })

        // slide 1 → slide 2
        tl.to(c1, { x: () => -W() * 0.92, opacity: 0.15, ease: 'power1.inOut', duration: 1 }, 0)
          .to(c2, { x: 0, opacity: 1, ease: 'power1.inOut', duration: 1 }, 0)

        // mAP count-up while case 2 is centered
        if (afterFill && afterVal && metric) {
          const counter = { v: metric.from }
          tl.to(
            counter,
            {
              v: metric.to,
              ease: 'none',
              duration: 0.6,
              onUpdate: () => {
                afterVal.textContent = counter.v.toFixed(2)
                afterFill.style.width = `${metricPct(counter.v)}%`
              },
            },
            0.9
          )
        }

        tl.to({}, { duration: 0.4 }) // hold on case 2

        // both zoom out into a side-by-side compact; case 1 sweeps in from left
        tl.addLabel('compact')
          .to(c2, { x: () => W() * 0.24, scale: cScale, ease: 'power2.inOut', duration: 1 }, 'compact')
          .fromTo(
            c1,
            { x: () => -W() * 0.92, scale: 1, opacity: 0.15 },
            {
              x: () => -W() * 0.24,
              scale: cScale,
              opacity: 1,
              ease: 'power2.inOut',
              duration: 1,
              immediateRender: false,
            },
            'compact'
          )

        // Fully scrubbed collapse of the top (narrative) and bottom (footer) — the
        // body just rides into place, no frame snap.
        collapsibles.forEach(({ narr, footer }) => {
          if (narr) {
            tl.fromTo(
              narr,
              { height: () => narr.scrollHeight, marginBottom: 0, opacity: 1 },
              {
                height: 0,
                marginBottom: () => -rowGap(narr),
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.7,
                immediateRender: false,
              },
              'compact'
            )
          }
          if (footer) {
            tl.fromTo(
              footer,
              { height: () => footer.scrollHeight, marginTop: 0, opacity: 1 },
              {
                height: 0,
                marginTop: () => -rowGap(footer),
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.7,
                immediateRender: false,
              },
              'compact'
            )
          }
        })

        return () => section.classList.remove('fwork--v2')
      })
    },
    { scope: root }
  )

  return (
    <SectionWrapper
      id="work"
      headingId="work-title"
      label="// flagship work"
      title="Flagship work"
      className="fwork-section"
    >
      <div className="fwork2" ref={root}>
        {flagship.map((project, i) => (
          <div className={`fwork2__card fwork2__card--${i + 1}`} key={project.id}>
            <FlagshipCase project={project} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
