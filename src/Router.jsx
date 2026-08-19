import { useState, useEffect } from 'react'
import App from './App.jsx'
import VisionPage from './pages/VisionPage.jsx'
import Landing from './pages/Landing.jsx'

// Minimal History-API router. Path-based (not hash) on purpose — the audio
// portfolio uses #section anchors for in-page scrolling, so a hash router would
// collide with them. Routes: '/' (multi-domain landing splash), '/audio' (the
// audio portfolio), '/vision' (the computer-vision page).
export function navigate(to) {
  if (to === window.location.pathname) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export default function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (path.startsWith('/vision')) return <VisionPage />
  if (path.startsWith('/audio')) return <App />
  return <Landing />
}
