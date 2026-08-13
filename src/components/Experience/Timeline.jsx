import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'
import DetectionBox from '../common/DetectionBox'
import TechChips from '../common/TechChips'

const shortRole = (role) => role.split(',')[0].trim()
const startDate = (dates) => dates.split(/[–-]/)[0].trim()

// Experience: pinned + SCROLL-CONTROLLED (scrub) so each role card can be read
// at your own pace — stopping the scroll holds the card. Cards appear one at a
// time (zoom in → long hold → zoom out), ending on a "path so far" line that
// marks all three roles. Mobile / reduced motion fall back to a stacked list.
export default function Timeline({ entries }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const section = root.current.closest('.section')
      const cards = gsap.utils.toArray('.xp__card', root.current)
      const summary = root.current.querySelector('.xp__summary')
      const fill = root.current.querySelector('.xp__summary-fill')

      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        if (ctx.conditions.desktop) {
          section.classList.add('xp--active')
          gsap.set(cards, { opacity: 0, scale: 0.82 })
          gsap.set(summary, { opacity: 0 })
          gsap.set(fill, { scaleX: 0 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=' + (entries.length * 1400 + 1600),
              scrub: true,
              pin: true,
            },
          })

          // fromTo + immediateRender:false keeps values deterministic even when
          // the timeline first renders at a non-zero progress.
          cards.forEach((card) => {
            tl.fromTo(
              card,
              { opacity: 0, scale: 0.82 },
              { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', immediateRender: false }
            )
              .to({}, { duration: 1.6 }) // long hold — the readable stretch
              .fromTo(
                card,
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.25, duration: 0.5, ease: 'power2.in', immediateRender: false }
              )
          })

          tl.fromTo(
            summary,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, immediateRender: false },
            '>-0.1'
          )
            .fromTo(
              fill,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.4, ease: 'power1.inOut', immediateRender: false },
              '<0.15'
            )
            .to({}, { duration: 0.8 }) // hold on the summary

          return () => section.classList.remove('xp--active')
        }

        // Mobile: readable stacked cards, light fade-up.
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 40%', scrub: true },
        })
      })
    },
    { scope: root }
  )

  return (
    <div className="xp" ref={root}>
      <div className="xp__stage">
        {entries.map((e) => (
          <DetectionBox
            as="article"
            key={e.id}
            variant={e.status === 'active' ? 'active' : 'default'}
            className="xp__card"
          >
            <div className="xp__card-meta">
              <p className="data-label xp__dates">{e.dates}</p>
              <h3 className="xp__role">{e.role}</h3>
              <p className="xp__org">{e.org}</p>
              {e.project && <p className="xp__project">{e.project}</p>}
            </div>
            <div className="xp__card-detail">
              {Array.isArray(e.body) ? (
                <ul className="xp__body xp__body--list">
                  {e.body.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="xp__body">{e.body}</p>
              )}
              <TechChips items={e.tech} className="xp__chips" />
            </div>
          </DetectionBox>
        ))}
      </div>

      <div className="xp__summary" aria-hidden="true">
        <p className="data-label xp__summary-label">The path so far</p>
        <div className="xp__track">
          <div className="xp__rail">
            <div className="xp__summary-fill" />
          </div>
          <div className="xp__pts">
            {entries.map((e, i) => (
              <div
                className={`xp__pt${i === 0 ? ' xp__pt--first' : ''}${
                  i === entries.length - 1 ? ' xp__pt--last' : ''
                }`}
                style={{ left: `${(i / (entries.length - 1)) * 100}%` }}
                key={e.id}
              >
                <span className={`xp__pt-dot${e.status === 'active' ? ' xp__pt-dot--active' : ''}`} />
                <span className="xp__pt-label">
                  <span className="xp__pt-date">{startDate(e.dates)}</span>
                  <span className="xp__pt-role">{shortRole(e.role)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
