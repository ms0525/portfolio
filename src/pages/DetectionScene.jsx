import { useEffect, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../lib/gsap'

// A stylized KITTI-style perception frame: a depth-coloured LiDAR point cloud
// over a perspective ground grid, with cyan detection boxes (class · conf · ID).
// Deterministic (hash-seeded) so it's stable across renders. On mount (motion
// allowed) the cloud fades up, boxes lock on, and a scan line sweeps the frame.

const W = 640
const H = 380
const HORIZON = 148
const VANISH_X = W / 2

function hash(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

// near (0) → far (1): cyan → violet depth ramp
const DEPTH_STOPS = ['#5cf4d6', '#5ea8d6', '#7a5cc4', '#3a1a78']
const depthColor = (d) => DEPTH_STOPS[Math.min(DEPTH_STOPS.length - 1, Math.floor(d * DEPTH_STOPS.length))]

function bracketPaths(x, y, w, h, L) {
  return [
    `M${x},${y + L} L${x},${y} L${x + L},${y}`,
    `M${x + w - L},${y} L${x + w},${y} L${x + w},${y + L}`,
    `M${x},${y + h - L} L${x},${y + h} L${x + L},${y + h}`,
    `M${x + w - L},${y + h} L${x + w},${y + h} L${x + w},${y + h - L}`,
  ]
}

const BOXES = [
  { x: 78, y: 206, w: 150, h: 118, label: 'Car', conf: '0.94', id: '07' },
  { x: 300, y: 172, w: 80, h: 62, label: 'Car', conf: '0.88', id: '03' },
  { x: 470, y: 190, w: 60, h: 104, label: 'Pedestrian', conf: '0.79', id: '12' },
]

export default function DetectionScene({ className = '' }) {
  const svgRef = useRef(null)

  const points = useMemo(() => {
    const out = []
    for (let i = 0; i < 220; i++) {
      const rx = hash(i * 2 + 0.3)
      const ry = hash(i * 2 + 1.7)
      const y = HORIZON + Math.pow(ry, 1.6) * (H - HORIZON)
      const spread = (y - HORIZON) / (H - HORIZON) // 0 far, 1 near
      const x = VANISH_X + (rx - 0.5) * (90 + spread * 660)
      const depth = 1 - spread
      out.push({ x, y, r: 0.6 + spread * 1.6, c: depthColor(depth), o: 0.25 + spread * 0.6 })
    }
    return out
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const root = svgRef.current
        const cloud = root.querySelector('.vscene__points')
        const boxes = gsap.utils.toArray('.vscene__box', root)
        const scan = root.querySelector('.vscene__scan')

        // entrance: cloud fades up, boxes lock on
        const tl = gsap.timeline()
        tl.from(cloud, { opacity: 0, duration: 0.7, ease: 'power1.out' }, 0).from(
          boxes,
          { opacity: 0, scale: 0.5, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.14, ease: 'back.out(1.8)' },
          0.35
        )

        // continuous LiDAR scan sweep
        const scanTl = gsap.timeline({ repeat: -1, delay: 0.4 })
        scanTl
          .fromTo(scan, { attr: { y1: HORIZON, y2: HORIZON }, opacity: 0 }, { opacity: 0.6, duration: 0.25 })
          .to(scan, { attr: { y1: H, y2: H }, duration: 2.6, ease: 'none' }, 0)
          .to(scan, { opacity: 0, duration: 0.3 }, '>-0.3')

        return () => {
          tl.kill()
          scanTl.kill()
        }
      })
    },
    { scope: svgRef }
  )

  // Flashlight: points near the pointer brighten, enlarge, and turn cyan — like a
  // sensor sweeping the cloud. Works with mouse hover AND touch: tap / hold / drag
  // lights up the dots near your finger, then fades on release. Touch listeners are
  // passive, so scrolling past the scene is never blocked. Skipped under reduced motion.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    const circles = Array.from(svg.querySelectorAll('.vscene__points circle'))
    const base = circles.map((c) => ({
      x: +c.getAttribute('cx'),
      y: +c.getAttribute('cy'),
      o: +c.getAttribute('opacity'),
      r: +c.getAttribute('r'),
      fill: c.getAttribute('fill'),
    }))
    const R = 96
    let raf = 0
    let fadeRaf = 0
    let cur = null
    let fade = 1 // 1 while active; decays after a touch lifts so a quick tap leaves a glow
    let touchedAt = 0 // suppress the synthetic mouse events iOS fires right after a touch

    const paint = () => {
      for (let i = 0; i < circles.length; i++) {
        const b = base[i]
        let boost = 0
        if (cur) {
          const d = Math.hypot(b.x - cur.x, b.y - cur.y)
          if (d < R) boost = (1 - d / R) * fade
        }
        const c = circles[i]
        c.style.opacity = Math.min(1, b.o + boost * 0.9)
        c.setAttribute('r', (b.r + boost * 2.4).toFixed(2))
        c.setAttribute('fill', boost > 0.28 ? '#5cf4d6' : b.fill)
      }
    }
    const schedule = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          paint()
        })
    }
    const pointAt = (clientX, clientY) => {
      const ctm = svg.getScreenCTM()
      if (!ctm) return null
      const pt = svg.createSVGPoint()
      pt.x = clientX
      pt.y = clientY
      const p = pt.matrixTransform(ctm.inverse())
      return { x: p.x, y: p.y }
    }
    const activate = (clientX, clientY) => {
      cancelAnimationFrame(fadeRaf)
      fade = 1
      cur = pointAt(clientX, clientY)
      schedule()
    }

    const onMove = (e) => {
      if (performance.now() - touchedAt < 700) return // ignore synthetic mouse after touch
      activate(e.clientX, e.clientY)
    }
    const onLeave = () => {
      cur = null
      fade = 1
      schedule()
    }
    const onTouch = (e) => {
      touchedAt = performance.now()
      const t = e.touches[0]
      if (t) activate(t.clientX, t.clientY)
    }
    const onTouchEnd = () => {
      touchedAt = performance.now()
      cancelAnimationFrame(fadeRaf)
      const start = performance.now()
      const tick = (now) => {
        fade = Math.max(0, 1 - (now - start) / 450)
        paint()
        if (fade > 0) fadeRaf = requestAnimationFrame(tick)
        else {
          cur = null
          fade = 1
        }
      }
      fadeRaf = requestAnimationFrame(tick)
    }

    svg.addEventListener('mousemove', onMove)
    svg.addEventListener('mouseleave', onLeave)
    svg.addEventListener('touchstart', onTouch, { passive: true })
    svg.addEventListener('touchmove', onTouch, { passive: true })
    svg.addEventListener('touchend', onTouchEnd, { passive: true })
    svg.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      svg.removeEventListener('mousemove', onMove)
      svg.removeEventListener('mouseleave', onLeave)
      svg.removeEventListener('touchstart', onTouch)
      svg.removeEventListener('touchmove', onTouch)
      svg.removeEventListener('touchend', onTouchEnd)
      svg.removeEventListener('touchcancel', onTouchEnd)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(fadeRaf)
    }
  }, [])

  const rails = [-1, -0.55, -0.22, 0.22, 0.55, 1].map((k) => {
    const bx = VANISH_X + k * W
    return `M${VANISH_X},${HORIZON} L${bx},${H}`
  })
  const rungs = [0.06, 0.16, 0.3, 0.5, 0.76].map((t) => {
    const y = HORIZON + t * (H - HORIZON)
    return { y, x1: VANISH_X - t * W, x2: VANISH_X + t * W }
  })

  return (
    <svg
      ref={svgRef}
      className={`vscene ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Stylized KITTI perception frame: LiDAR point cloud with camera detection boxes for two cars and a pedestrian"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="vscene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0616" />
          <stop offset="1" stopColor="#000004" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#vscene-sky)" />

      {/* ground grid */}
      <g stroke="var(--violet)" strokeWidth="0.6" opacity="0.5" fill="none">
        {rails.map((d, i) => (
          <path key={`rail-${i}`} d={d} />
        ))}
        {rungs.map((r, i) => (
          <line key={`rung-${i}`} x1={r.x1} y1={r.y} x2={r.x2} y2={r.y} opacity={0.2 + i * 0.12} />
        ))}
      </g>
      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="var(--magenta)" strokeWidth="0.6" opacity="0.5" />

      {/* LiDAR point cloud */}
      <g className="vscene__points">
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={p.o} />
        ))}
      </g>

      {/* sweeping scan line (GSAP-animated via attrs; static under reduced motion) */}
      <line className="vscene__scan" x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="var(--detect)" strokeWidth="1" opacity="0" />

      {/* detection boxes */}
      {BOXES.map((b, i) => {
        const L = Math.min(b.w, b.h) * 0.28
        return (
          <g key={i} className="vscene__box">
            {bracketPaths(b.x, b.y, b.w, b.h, L).map((d, k) => (
              <path key={k} d={d} fill="none" stroke="var(--detect)" strokeWidth="1.6" />
            ))}
            <rect
              x={b.x}
              y={b.y - 15}
              width={b.label.length * 6.2 + 34}
              height="13"
              fill="var(--detect)"
              opacity="0.92"
            />
            <text x={b.x + 4} y={b.y - 5} className="vscene__tag" fill="#000004">
              {b.label} · {b.conf}
            </text>
            <text x={b.x + b.w} y={b.y + b.h + 12} textAnchor="end" className="vscene__id" fill="var(--detect)">
              ID {b.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
