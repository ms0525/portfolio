import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, ScrollSmoother, MQ } from './lib/gsap'
import Nav from './components/common/Nav'
import Footer from './components/common/Footer'
import Hero from './components/Hero/Hero'
import Manifesto from './components/Manifesto/Manifesto'
import Experience from './components/Experience/Experience'
import FlagshipWork from './components/Projects/FlagshipWork'
import LabNotebookGrid from './components/Projects/LabNotebookGrid'
import SpectrumAnalyzer from './components/Skills/SpectrumAnalyzer'
import Now from './components/Now/Now'
import Contact from './components/Contact/Contact'

export default function App() {
  // Smooth scroll only when motion is allowed. Under reduced motion no
  // ScrollSmoother is created — native scrolling, fully static layout.
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Smooth scroll on DESKTOP ONLY. On touch devices ScrollSmoother's
    // normalizeScroll hijacks native momentum and makes scrolling feel laggy and
    // "stuck" (especially scrolling back up) — native touch scroll is far better.
    mm.add(MQ.desktop, () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,
        effects: false,
        normalizeScroll: true,
      })
      return () => smoother.kill()
    })

    // Pinned-section heights shift when web fonts finish loading — refresh once
    // they're ready so every ScrollTrigger measures correctly (all breakpoints).
    let cancelled = false
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh()
      })
    }
    return () => {
      cancelled = true
    }
  })

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main">
            <Hero />
            <Manifesto />
            <Experience />
            <FlagshipWork />
            <LabNotebookGrid />
            <SpectrumAnalyzer />
            <Now />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
