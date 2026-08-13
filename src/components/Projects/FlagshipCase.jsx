import DetectionBox from '../common/DetectionBox'
import TechChips from '../common/TechChips'
import Spectrogram from '../common/Spectrogram'

// One detection box per dataset, spread across the time axis — the dataset
// names become the "detected" labels (Scene 3's literal touch).
function boxesFromDatasets(datasets) {
  const slots = [
    { x: 0.06, y: 0.2, w: 0.22, h: 0.36 },
    { x: 0.4, y: 0.3, w: 0.2, h: 0.36 },
    { x: 0.73, y: 0.18, w: 0.21, h: 0.3 },
  ]
  return datasets.slice(0, slots.length).map((label, i) => ({ ...slots[i], label }))
}

const METRIC_MIN = 0.3
const METRIC_MAX = 0.45
export const metricPct = (v) => ((v - METRIC_MIN) / (METRIC_MAX - METRIC_MIN)) * 100

// Multi-model comparison (case 1): one bar per model on a shared F1 axis; the
// best/post-processed result is the "hot" bar, mirroring the mAP box's "after".
function MetricRanking({ metric }) {
  const { label, results, note, min = 0.4, max = 0.7 } = metric
  const pct = (v) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))
  return (
    <div className="metric metric--rank">
      <p className="data-label metric__caption">{label}</p>
      {results.map((r) => (
        <div className="metric__row" key={r.tag}>
          <span className="data-label metric__tag">{r.tag}</span>
          <div className="metric__track">
            <div
              className={`metric__fill metric__fill--${r.hot ? 'after' : 'before'}`}
              style={{ width: `${pct(r.value)}%` }}
            />
          </div>
          <span className={`data-label metric__val${r.hot ? ' metric__val--hot' : ''}`}>
            {r.value.toFixed(3)}
          </span>
        </div>
      ))}
      {note && <p className="data-label metric__delta">{note}</p>}
    </div>
  )
}

function MetricBar({ metric }) {
  const { from, to } = metric
  return (
    <div className="metric">
      <p className="data-label metric__caption">{metric.label}</p>
      <div className="metric__row">
        <span className="data-label metric__tag">before</span>
        <div className="metric__track">
          <div className="metric__fill metric__fill--before" style={{ width: `${metricPct(from)}%` }} />
        </div>
        <span className="data-label metric__val">{from.toFixed(2)}</span>
      </div>
      <div className="metric__row">
        <span className="data-label metric__tag">after</span>
        <div className="metric__track">
          <div className="metric__fill metric__fill--after" style={{ width: `${metricPct(to)}%` }} />
        </div>
        <span className="data-label metric__val metric__val--hot">{to.toFixed(2)}</span>
      </div>
      <p className="data-label metric__delta">
        mAP {from.toFixed(2)} → {to.toFixed(2)} (+{(to - from).toFixed(2)})
      </p>
    </div>
  )
}

// Presentational — the horizontal gallery (FlagshipWork) drives the scroll and
// the mAP count-up; this just renders one full case.
export default function FlagshipCase({ project }) {
  const { title, kicker, datasets, narrative, tech, callout, metric } = project
  return (
    <DetectionBox as="article" className="flagship">
      <header className="flagship__head">
        <p className="data-label flagship__kicker">{kicker}</p>
        <h3 className="flagship__title">{title}</h3>
      </header>

      {Array.isArray(narrative) ? (
        <ul className="flagship__narrative flagship__narrative--list">
          {narrative.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      ) : (
        <p className="flagship__narrative">{narrative}</p>
      )}

      {/* Spectrogram and metric box sit side by side as equal-height focal
          elements, so neither column is left with a tall empty gap. */}
      <div className="flagship__body">
        <div className="flagship__visual">
          <Spectrogram
            fill
            cols={52}
            rows={24}
            boxes={boxesFromDatasets(datasets)}
            ariaLabel={`${title}: spectrogram with detected events labelled ${datasets.join(', ')}`}
          />
        </div>
        {metric ? (
          metric.results ? <MetricRanking metric={metric} /> : <MetricBar metric={metric} />
        ) : (
          <div className="flagship__metric-empty" aria-hidden="true" />
        )}
      </div>

      <div className="flagship__footer">
        {callout && <p className="data-label flagship__callout">{callout}</p>}
        <TechChips items={tech} className="flagship__chips" />
      </div>
    </DetectionBox>
  )
}
