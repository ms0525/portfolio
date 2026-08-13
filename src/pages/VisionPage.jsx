import { Fragment, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, MQ } from '../lib/gsap'
import { navigate } from '../Router'
import DetectionBox from '../components/common/DetectionBox'
import TechChips from '../components/common/TechChips'
import DetectionScene from './DetectionScene'
import { visionIntro, cameraLidar, visionSkills, moreVision } from '../content/vision'
import './Vision.css'

function backHome(e) {
  e.preventDefault()
  navigate('/')
}

function ResultsTable({ data }) {
  return (
    <figure className="vtable">
      <figcaption className="vtable__caption data-label">{data.caption}</figcaption>
      <div className="vtable__scroll">
        <table>
          <thead>
            <tr>
              {data.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? 'vtable__label' : 'vtable__num'}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.note && <p className="vtable__note">{data.note}</p>}
    </figure>
  )
}

export default function VisionPage() {
  const { pipeline, projection, results, highlights, engineering, caveats, tech, repo, demo } = cameraLidar
  const vision = pipeline.filter((p) => p.lane === 'vision')
  const geometry = pipeline.filter((p) => p.lane === 'geometry')
  const fused = pipeline.find((p) => p.lane === 'fused')
  const pageRef = useRef(null)

  useEffect(() => {
    document.title = 'Maaz Saeed — Computer Vision'
    return () => {
      document.title = 'Maaz Saeed — Seeing Sound'
    }
  }, [])

  // Scroll reveals (fade-up as blocks enter) + a metric count-up when the deltas
  // card arrives. IntersectionObserver, not GSAP ScrollTrigger — this page uses
  // native scroll (no ScrollSmoother), so IO fires reliably. Gated behind motion:
  // under reduced motion the hidden state is never applied, so everything shows.
  useEffect(() => {
    const root = pageRef.current
    if (!root || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    root.classList.add('reveal-on')
    const targets = gsap.utils.toArray(
      '.vhero__copy > *, .vsection__kicker, .vsection__title, .vsection__lead, .vsection__sub, .vcard, .vpipe, .vtable, .vsection__tech, .vembed',
      root
    )
    targets.forEach((el) => el.setAttribute('data-reveal', ''))
    // light stagger within the hero and within each grid
    root.querySelectorAll('.vhero__copy > *').forEach((el, i) => (el.style.transitionDelay = `${i * 0.07}s`))
    root.querySelectorAll('.vgrid').forEach((grid) => {
      Array.from(grid.children).forEach((el, i) => {
        if (el.hasAttribute('data-reveal')) el.style.transitionDelay = `${i * 0.08}s`
      })
    })

    const countUp = (el) => {
      const from = parseFloat(el.dataset.countFrom)
      const to = parseFloat(el.dataset.countTo)
      const unit = el.dataset.countUnit || ''
      const dec = parseInt(el.dataset.countDecimals || '0', 10)
      const proxy = { v: from }
      gsap.to(proxy, {
        v: to,
        duration: 1,
        ease: 'power1.out',
        onUpdate: () => {
          el.textContent = proxy.v.toFixed(dec) + unit
        },
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-revealed')
          e.target.querySelectorAll('.vdelta__to[data-count-to]').forEach(countUp)
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    targets.forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      root.classList.remove('reveal-on')
    }
  }, [])

  // Cool ambient motion — a signal glow travels through the fusion pipeline, and
  // a live "camera feed" frame counter ticks. Motion-gated (static under reduced
  // motion), and killed on unmount so it doesn't leak when you navigate away.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const root = pageRef.current
        if (!root) return
        const kills = []

        // 1) pipeline flow: glow hops node → node down both lanes, into the fused box
        const pipe = root.querySelector('.vpipe')
        if (pipe) {
          const lanes = gsap.utils.toArray('.vpipe__lane', pipe)
          const visionNodes = lanes[0] ? gsap.utils.toArray('.vpipe__node', lanes[0]) : []
          const geoNodes = lanes[1] ? gsap.utils.toArray('.vpipe__node', lanes[1]) : []
          const fused = pipe.querySelector('.vpipe__fused')
          const glow = '0 0 22px -4px rgba(92, 244, 214, 0.85)'
          const dark = '0 0 0px 0px rgba(92, 244, 214, 0)'
          gsap.set([...visionNodes, ...geoNodes, fused].filter(Boolean), { boxShadow: dark })
          const flash = (tl, el, at) => {
            if (!el) return
            tl.to(el, { boxShadow: glow, duration: 0.25, ease: 'power2.out' }, at).to(
              el,
              { boxShadow: dark, duration: 0.5, ease: 'power2.in' },
              at + 0.3
            )
          }
          const flow = gsap.timeline({ repeat: -1, repeatDelay: 1 })
          visionNodes.forEach((n, i) => flash(flow, n, i * 0.4))
          geoNodes.forEach((n, i) => flash(flow, n, i * 0.4 + 0.2))
          flash(flow, fused, Math.max(visionNodes.length, geoNodes.length) * 0.4 + 0.2)
          kills.push(flow)
        }

        // 2) live frame counter
        const frameEl = root.querySelector('.vhud__frame')
        if (frameEl) {
          const c = { v: 142 }
          const ticker = gsap.to(c, {
            v: 142 + 1e5,
            duration: 1e5 / 14,
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
              frameEl.textContent = 'FRAME ' + String(Math.floor(c.v)).padStart(4, '0')
            },
          })
          kills.push(ticker)
        }

        return () => kills.forEach((k) => k.kill())
      })
    },
    { scope: pageRef }
  )

  const Lane = ({ label, nodes }) => (
    <div className="vpipe__lane">
      <span className="vpipe__lane-label data-label">{label}</span>
      <div className="vpipe__flow">
        {nodes.map((s, i) => (
          <Fragment key={s.id}>
            {i > 0 && <span className="vpipe__arrow" aria-hidden="true">→</span>}
            <div className="vpipe__node">
              <span className="vpipe__stage">{s.stage}</span>
              <span className="vpipe__detail">{s.detail}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <div className="vpage" ref={pageRef}>
      <a className="skip-link" href="#vmain">
        Skip to content
      </a>

      <header className="vpage__header">
        <a className="vpage__back" href="/" onClick={backHome}>
          <span aria-hidden="true">←</span> Maaz&nbsp;Saeed
        </a>
        <nav className="vpage__links" aria-label="Project links">
          <a href="/" onClick={backHome} className="data-label vpage__navlink">
            Audio portfolio
          </a>
          <a href={repo} target="_blank" rel="noreferrer" className="data-label vpage__navlink">
            GitHub ↗
          </a>
          <a href={demo} target="_blank" rel="noreferrer" className="data-label vpage__navlink vpage__navlink--cta">
            Live demo ↗
          </a>
        </nav>
      </header>

      <main id="vmain">
        {/* Hero */}
        <section className="vhero">
          <div className="vhero__copy">
            <p className="data-label vhero__eyebrow">{visionIntro.eyebrow}</p>
            <h1 className="vhero__title">{visionIntro.title}</h1>
            <p className="vhero__tagline">{visionIntro.tagline}</p>
            <p className="vhero__supporting">{visionIntro.supporting}</p>
            <ul className="vhero__skills">
              {visionSkills.map((s) => (
                <li key={s} className="data-label">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="vhero__visual">
            <DetectionScene />
            <div className="vhud" aria-hidden="true">
              <span className="vhud__rec">
                <i />
                Rec
              </span>
              <span className="vhud__frame">FRAME 0142</span>
              <span className="vhud__stat">3 tracked · 220 pts</span>
            </div>
          </div>
        </section>

        {/* Project */}
        <section className="vsection" aria-labelledby="cl-title">
          <p className="data-label vsection__kicker">{cameraLidar.kicker}</p>
          <h2 id="cl-title" className="vsection__title">
            {cameraLidar.title}
          </h2>
          <p className="vsection__lead">{cameraLidar.summary}</p>

          <div className="vgrid vgrid--split">
            <DetectionBox className="vcard">
              <h3 className="vcard__head data-label">What it does</h3>
              <ul className="vlist">
                {cameraLidar.does.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </DetectionBox>

            <DetectionBox className="vcard">
              <h3 className="vcard__head data-label">Detector swap · same tracker</h3>
              <div className="vdeltas">
                {highlights.map((h) => (
                  <div key={h.label} className="vdelta">
                    <span className="vdelta__label data-label">{h.label}</span>
                    <span className="vdelta__vals">
                      <span className="vdelta__from">
                        {h.from}
                        {h.unit}
                      </span>
                      <span className="vdelta__arrow" aria-hidden="true">→</span>
                      <span
                        className="vdelta__to"
                        data-count-from={h.from}
                        data-count-to={h.to}
                        data-count-unit={h.unit}
                        data-count-decimals={Number.isInteger(h.to) ? 0 : 2}
                      >
                        {h.to}
                        {h.unit}
                      </span>
                    </span>
                    {h.lowerBetter && <span className="vdelta__hint data-label">lower is better</span>}
                  </div>
                ))}
              </div>
            </DetectionBox>
          </div>

          {/* Pipeline */}
          <div className="vpipe" aria-label="Fusion pipeline">
            <Lane label="Vision" nodes={vision} />
            <Lane label="Geometry" nodes={geometry} />
            <div className="vpipe__merge" aria-hidden="true">
              <span>↓ fuse ↓</span>
            </div>
            <div className="vpipe__fused">
              <span className="vpipe__stage">{fused.stage}</span>
              <span className="vpipe__detail">{fused.detail}</span>
            </div>
            <code className="vpipe__formula">{projection}</code>
          </div>

          {/* Results */}
          <h3 className="vsection__sub data-label">Results</h3>
          <div className="vgrid vgrid--tables">
            <ResultsTable data={results.control} />
            <ResultsTable data={results.split} />
          </div>

          {/* Engineering + caveats */}
          <div className="vgrid vgrid--split vgrid--notes">
            <DetectionBox className="vcard">
              <h3 className="vcard__head data-label">Engineering</h3>
              <ul className="vlist">
                {engineering.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </DetectionBox>
            <DetectionBox className="vcard vcard--caveat" variant="plain">
              <h3 className="vcard__head data-label">Honest scope</h3>
              <ul className="vlist vlist--caveat">
                {caveats.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </DetectionBox>
          </div>

          <TechChips items={tech} className="vsection__tech" />
        </section>

        {/* More CV work */}
        <section className="vsection" aria-labelledby="more-title">
          <p className="data-label vsection__kicker">More computer-vision work</p>
          <h2 id="more-title" className="vsection__title">
            Beyond tracking
          </h2>
          <div className="vmore">
            {moreVision.map((p) => (
              <DetectionBox key={p.id} className="vcard vcard--project">
                <div className="vproject__grid">
                  <div className="vproject__intro">
                    <p className="data-label vcard__kicker">{p.kicker}</p>
                    <h3 className="vcard__title">{p.title}</h3>
                    <p className="vcard__summary">{p.summary}</p>
                  </div>
                  <ul className="vlist vproject__points">
                    {p.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
                <TechChips items={p.tech} className="vcard__tech" />
              </DetectionBox>
            ))}
          </div>
        </section>

        {/* Live demo embed */}
        <section className="vsection vsection--demo" aria-labelledby="demo-title">
          <p className="data-label vsection__kicker">Interactive · Streamlit Community Cloud</p>
          <h2 id="demo-title" className="vsection__title">
            Try the live dashboard
          </h2>
          <p className="vsection__lead">
            Four synchronized panels — YOLO11 and YOLO26, each in camera-2D and LiDAR-3D — with frame seeking,
            autoplay, and ground-truth overlays. The hosted mode runs on deterministic synthetic data.
          </p>

          <div className="vembed">
            <div className="vembed__bar">
              <span className="vembed__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="vembed__url data-label">camera-lidar-model-lab.streamlit.app</span>
              <a href={demo} target="_blank" rel="noreferrer" className="vembed__open data-label">
                Open ↗
              </a>
            </div>
            <iframe
              className="vembed__frame"
              src={`${demo}?embed=true`}
              title="Camera / LiDAR 3D Tracking — live Streamlit dashboard"
              loading="lazy"
              allow="fullscreen; clipboard-read; clipboard-write"
            />
          </div>
          <p className="vembed__fallback">
            Not loading?{' '}
            <a href={demo} target="_blank" rel="noreferrer">
              Open the dashboard in a new tab ↗
            </a>
          </p>
        </section>

        <footer className="vpage__footer">
          <a href="/" onClick={backHome} className="vpage__back">
            <span aria-hidden="true">←</span> Back to the audio portfolio
          </a>
        </footer>
      </main>
    </div>
  )
}
