import { useId, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../../lib/gsap'
import './Waveform.css'

const W = 1000
const MID = 50

// A periodic wave whose shape depends on a phase. Advancing the phase by 2π
// returns the identical shape, so a 0→2π loop travels seamlessly.
function buildPath(phase, points = 160) {
  let d = ''
  for (let i = 0; i <= points; i++) {
    const t = i / points
    const x = t * W
    const env = Math.sin(t * Math.PI) // fade amplitude at both ends
    const y = MID + env * 16 * (0.6 * Math.sin(t * 42 + phase) + 0.4 * Math.sin(t * 17 + phase))
    d += i === 0 ? `M0,${y.toFixed(2)}` : ` L${x.toFixed(1)},${y.toFixed(2)}`
  }
  return d
}

/**
 * A single calm waveform line. When `animate` is set it travels continuously
 * (an oscilloscope-style flowing signal). Gated by reduced motion.
 */
export default function Waveform({ className = '', animate = false, strokeWidth = 2 }) {
  const pathRef = useRef(null)
  const gradId = 'wf-' + useId().replace(/:/g, '')
  const initial = useMemo(() => buildPath(0), [])

  useGSAP(
    () => {
      if (!animate) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const state = { phase: 0 }
        const tween = gsap.to(state, {
          phase: Math.PI * 2,
          duration: 5,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            if (pathRef.current) pathRef.current.setAttribute('d', buildPath(state.phase))
          },
        })
        return () => tween.kill()
      })
    },
    { dependencies: [animate] }
  )

  return (
    <svg
      className={`waveform ${className}`}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      role="img"
      aria-label="Audio waveform"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--violet)" />
          <stop offset="50%" stopColor="var(--coral)" />
          <stop offset="100%" stopColor="var(--amber)" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={initial}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
