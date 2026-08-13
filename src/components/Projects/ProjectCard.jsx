import DetectionBox from '../common/DetectionBox'
import TechChips from '../common/TechChips'

export default function ProjectCard({ project }) {
  const { title, subtitle, dates, org, body, tech } = project
  return (
    <DetectionBox as="article" className="pcard">
      <p className="data-label pcard__dates">{dates}</p>
      <h3 className="pcard__title">
        {title}
        {subtitle && <span className="pcard__subtitle"> · {subtitle}</span>}
      </h3>
      <p className="pcard__org data-label">{org}</p>
      <p className="pcard__body">{body}</p>
      <TechChips items={tech} className="pcard__chips" />
    </DetectionBox>
  )
}
