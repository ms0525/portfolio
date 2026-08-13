import { useRef } from 'react'
import { hero } from '../../content/site'
import Waveform from '../common/Waveform'
import Spectrogram from '../common/Spectrogram'
import { useHeroMorph } from './useHeroMorph'
import './Hero.css'

// The resolved end-state (Frame D): spectrogram with detected events. Also the
// reduced-motion fallback.
const HERO_BOXES = [
  { x: 0.18, y: 0.16, w: 0.18, h: 0.34, label: 'EVENT · 0.94' },
  { x: 0.55, y: 0.3, w: 0.16, h: 0.34, label: 'EVENT · 0.88' },
  { x: 0.79, y: 0.2, w: 0.13, h: 0.26, label: '0.91' },
]

export default function Hero() {
  const root = useRef(null)
  useHeroMorph(root)

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__inner container">
        <div className="hero__text">
          <p className="data-label hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__name">{hero.name}</h1>
          <p className="hero__tagline">{hero.tagline}</p>
          <p className="hero__supporting measure">{hero.supporting}</p>
        </div>

        {/* Auto-looping signature: a floating waveform that transitions into a
            spectrogram, then detection boxes — on its own timer, not on scroll. */}
        <div className="hero__visual">
          <div className="hero__stack">
            <div className="hero__spec">
              <Spectrogram
                cols={48}
                rows={24}
                boxes={HERO_BOXES}
                fill
                ariaLabel="A sound rendered as a spectrogram with detected events outlined in cyan"
              />
            </div>
            <Waveform animate strokeWidth={2.5} className="hero__wave" />
          </div>
        </div>
      </div>

      {/* Centered scroll cue: wave line, text, bouncing arrow. */}
      <div className="hero__scroll">
        <Waveform strokeWidth={2} className="hero__scroll-wave" />
        <a className="hero__cue data-label" href="#manifesto">
          {hero.scrollCue}
        </a>
        <span className="hero__scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  )
}
