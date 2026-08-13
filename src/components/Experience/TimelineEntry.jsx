import DetectionBox from '../common/DetectionBox'
import TechChips from '../common/TechChips'

export default function TimelineEntry({ entry }) {
  const active = entry.status === 'active'
  return (
    <li className={`tl-entry ${active ? 'tl-entry--active' : ''}`}>
      <span
        className={`tl-entry__marker ${active ? 'tl-entry__marker--active' : ''}`}
        aria-hidden="true"
      />
      <DetectionBox variant={active ? 'active' : 'default'} className="tl-entry__card">
        <p className="data-label tl-entry__dates">{entry.dates}</p>
        <h3 className="tl-entry__role">{entry.role}</h3>
        <p className="tl-entry__org data-label">{entry.org}</p>
        {entry.project && <p className="tl-entry__project">{entry.project}</p>}
        <p className="tl-entry__body">{entry.body}</p>
        <TechChips items={entry.tech} className="tl-entry__chips" />
      </DetectionBox>
    </li>
  )
}
