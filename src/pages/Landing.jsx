import { useEffect } from 'react'
import { navigate } from '../Router'
import Spectrogram from '../components/common/Spectrogram'
import DetectionScene from './DetectionScene'
import { contact, links } from '../content/site'
import './Landing.css'

// The two signature visuals, side by side — the whole point of the landing.
const AUDIO_BOXES = [
  { x: 0.18, y: 0.16, w: 0.18, h: 0.34, label: 'EVENT · 0.94' },
  { x: 0.55, y: 0.3, w: 0.16, h: 0.34, label: 'EVENT · 0.88' },
  { x: 0.79, y: 0.2, w: 0.13, h: 0.26, label: '0.91' },
]

const go = (to) => (e) => {
  e.preventDefault()
  navigate(to)
}

export default function Landing() {
  useEffect(() => {
    document.title = 'Maaz Saeed — Multi-domain ML Engineer'
    return () => {
      document.title = 'Maaz Saeed — Seeing Sound'
    }
  }, [])

  return (
    <div className="landing">
      <header className="landing__top">
        <span className="landing__brand">
          <span className="landing__brand-mark" aria-hidden="true" />
          Maaz&nbsp;Saeed
        </span>
        <a className="landing__resume data-label" href={contact.resume} download>
          Résumé&nbsp;↓
        </a>
      </header>

      <main className="landing__main" id="main">
        <div className="landing__intro">
          <p className="data-label landing__eyebrow">Multi-domain Machine Learning Engineer</p>
          <h1 className="landing__title">
            Audio <span className="landing__plus">+</span> Computer&nbsp;Vision
          </h1>
          <p className="landing__sub">
            I teach machines to hear a scene and to see one — two sides of the same signal-processing
            craft. Pick a world to explore.
          </p>
        </div>

        <div className="landing__blocks">
          <a
            href="/audio"
            onClick={go('/audio')}
            className="landing__block landing__block--audio"
            aria-label="Enter the audio portfolio"
          >
            <div className="landing__visual">
              <Spectrogram
                cols={48}
                rows={24}
                boxes={AUDIO_BOXES}
                fill
                animated
                ariaLabel="Audio: a spectrogram with detected sound events outlined in cyan"
              />
            </div>
            <div className="landing__block-copy">
              <p className="data-label landing__block-kicker">Audio · Signal Processing</p>
              <h2 className="landing__block-title">Seeing Sound</h2>
              <p className="landing__block-desc">
                Spectrogram-based sound event detection, speech enhancement, and audio compression.
              </p>
              <span className="landing__enter data-label">
                Enter <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>

          <a
            href="/vision"
            onClick={go('/vision')}
            className="landing__block landing__block--vision"
            aria-label="Enter the computer vision page"
          >
            <div className="landing__visual">
              <DetectionScene />
            </div>
            <div className="landing__block-copy">
              <p className="data-label landing__block-kicker">Computer Vision · Perception</p>
              <h2 className="landing__block-title">Seeing in 3D</h2>
              <p className="landing__block-desc">
                Camera/LiDAR 3D tracking, object detection, and multimodal perception on KITTI.
              </p>
              <span className="landing__enter data-label">
                Enter <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        </div>
      </main>

      <footer className="landing__footer">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {links.github.url && (
          <a href={links.github.url} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
        {links.linkedin.url && (
          <a href={links.linkedin.url} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        )}
        <span className="landing__loc">{contact.location}</span>
      </footer>
    </div>
  )
}
