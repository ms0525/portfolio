import DetectionBox from '../common/DetectionBox'
import TechChips from '../common/TechChips'

// Compact summary of a flagship case — shown in the final "both side by side"
// panel of the horizontal gallery.
export default function FlagshipMini({ project }) {
  const { title, kicker, tech, metric, callout } = project
  return (
    <DetectionBox as="article" className="fmini">
      <p className="data-label fmini__kicker">{kicker}</p>
      <h4 className="fmini__title">{title}</h4>
      {metric && (
        <p className="data-label fmini__metric">
          mAP {metric.from.toFixed(2)} → {metric.to.toFixed(2)}
        </p>
      )}
      {callout && <p className="data-label fmini__callout">{callout}</p>}
      <TechChips items={tech.slice(0, 4)} className="fmini__chips" />
    </DetectionBox>
  )
}
