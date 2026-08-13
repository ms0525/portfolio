import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ, pinnedAutoplay } from '../../lib/gsap'
import { labNotebook } from '../../content/projects'
import SectionWrapper from '../common/SectionWrapper'
import ProjectCard from './ProjectCard'
import './Projects.css'

// Scene 5, reworked: the section pins on the heading, then the three cards fly
// in from the side one by one and settle into the final grid. Mobile keeps it
// simple (fade-up, no pin — touch scroll fights pinning).
export default function LabNotebookGrid() {
  const root = useRef(null)

  useGSAP(
    () => {
      const section = root.current.closest('.section')
      const cards = gsap.utils.toArray('.pcard', root.current)

      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        if (ctx.conditions.desktop) {
          // Pin, snap into view, and autoplay the cards flying in on arrival.
          const tl = gsap.timeline({ paused: true })
          tl.from(cards, { x: 220, opacity: 0, ease: 'power2.out', stagger: 0.2, duration: 0.6 })
          pinnedAutoplay(tl, section, '+=60%')
        } else {
          gsap.from(cards, {
            y: 24,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 45%', scrub: true },
          })
        }
      })
    },
    { scope: root }
  )

  return (
    <SectionWrapper
      id="notebook"
      headingId="notebook-title"
      label="// academic projects"
      title="Academic projects"
    >
      <div className="labgrid" ref={root}>
        {labNotebook.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  )
}
