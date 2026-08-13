import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'
import './Spectrogram.css'

// Magma stops (the colormap Librosa/matplotlib render spectrograms in).
const MAGMA = ['#000004', '#1b0c41', '#331067', '#842681', '#d6456c', '#fc8c63', '#fcfdbf']

// Deterministic hash so the spectrogram is stable across renders.
function hash(i, j) {
  const s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
  return s - Math.floor(s)
}

// A plausible spectrogram field: frequency roll-off (more energy low) plus a
// few "events" along the time axis, modulated by noise.
function energy(i, j, cols, rows) {
  const byFreq = Math.pow(j / (rows - 1), 0.7) // 0 (top/high) -> 1 (bottom/low)
  const t = i / cols
  const events =
    Math.exp(-(((t - 0.26) / 0.07) ** 2)) +
    0.85 * Math.exp(-(((t - 0.61) / 0.05) ** 2)) +
    0.7 * Math.exp(-(((t - 0.83) / 0.045) ** 2))
  const base = 0.15 + 0.5 * byFreq
  const v = base * (0.45 + 0.8 * events) * (0.55 + 0.6 * hash(i, j))
  return Math.max(0, Math.min(1, v))
}

// A shimmer value for a cell — keeps the frequency gradient (brighter low) but
// jitters brightness, so animated cells still read as a spectrogram.
function shimmerFill(j, rows) {
  const freqBias = Math.pow(j / (rows - 1), 0.7)
  const v = Math.min(1, (0.14 + 0.5 * freqBias) * (0.4 + 1.2 * Math.random()))
  return MAGMA[Math.round(v * (MAGMA.length - 1))]
}

/**
 * Static SVG spectrogram. `boxes` overlays cyan detection brackets; `animated`
 * makes random cells drift in colour over time (a live "changing pixels" feel).
 */
export default function Spectrogram({
  cols = 44,
  rows = 22,
  boxes = [],
  faint = false,
  fill = false,
  animated = false,
  className = '',
  ariaLabel = 'Spectrogram',
}) {
  const svgRef = useRef(null)
  const cells = useMemo(() => {
    const out = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const v = energy(i, j, cols, rows)
        out.push({ i, j, c: MAGMA[Math.round(v * (MAGMA.length - 1))] })
      }
    }
    return out
  }, [cols, rows])

  useGSAP(
    () => {
      if (!animated) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const rects = svgRef.current.querySelectorAll('.spectrogram__cell')
        if (!rects.length) return
        const perTick = Math.max(6, Math.round(rects.length * 0.025))
        const tick = () => {
          for (let m = 0; m < perTick; m++) {
            const idx = (Math.random() * rects.length) | 0
            const j = (idx / cols) | 0
            rects[idx].setAttribute('fill', shimmerFill(j, rows))
          }
        }
        const t = gsap.to({}, { duration: 0.16, repeat: -1, onRepeat: tick })
        return () => t.kill()
      })
    },
    { scope: svgRef, dependencies: [animated, cols, rows] }
  )

  const gap = 0.12
  return (
    <svg
      ref={svgRef}
      className={`spectrogram ${faint ? 'spectrogram--faint' : ''} ${
        animated ? 'spectrogram--animated' : ''
      } ${className}`}
      viewBox={`0 0 ${cols} ${rows}`}
      style={fill ? { width: '100%', height: '100%' } : { aspectRatio: `${cols} / ${rows}` }}
      preserveAspectRatio={fill ? 'none' : 'xMidYMid meet'}
      role="img"
      aria-label={ariaLabel}
    >
      <rect x="0" y="0" width={cols} height={rows} fill="var(--bg)" />
      {cells.map(({ i, j, c }) => (
        <rect
          key={`${i}-${j}`}
          className="spectrogram__cell"
          x={i + gap / 2}
          y={j + gap / 2}
          width={1 - gap}
          height={1 - gap}
          fill={c}
        />
      ))}

      {!faint &&
        boxes.map((b, idx) => {
          const bx = b.x * cols
          const by = b.y * rows
          const bw = b.w * cols
          const bh = b.h * rows
          const L = Math.min(bw, bh) * 0.3
          const rightHalf = b.x + b.w / 2 > 0.5
          const corners = [
            `M${bx},${by + L} L${bx},${by} L${bx + L},${by}`,
            `M${bx + bw - L},${by} L${bx + bw},${by} L${bx + bw},${by + L}`,
            `M${bx},${by + bh - L} L${bx},${by + bh} L${bx + L},${by + bh}`,
            `M${bx + bw - L},${by + bh} L${bx + bw},${by + bh} L${bx + bw},${by + bh - L}`,
          ]
          return (
            <g key={idx}>
              {corners.map((d, k) => (
                <path
                  key={k}
                  className="spectrogram__corner"
                  d={d}
                  fill="none"
                  stroke="var(--detect)"
                  strokeWidth="0.35"
                />
              ))}
              {b.label && (
                <text
                  className="spectrogram__label"
                  x={rightHalf ? bx + bw : bx}
                  y={by - 0.7}
                  textAnchor={rightHalf ? 'end' : 'start'}
                  fill="var(--detect)"
                >
                  {b.label}
                </text>
              )}
            </g>
          )
        })}
    </svg>
  )
}
