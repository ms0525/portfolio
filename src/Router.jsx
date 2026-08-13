import { useState, useEffect } from 'react'
import App from './App.jsx'
import VisionPage from './pages/VisionPage.jsx'

// Minimal History-API router. Path-based (not hash) on purpose — the home page
// already uses #section anchors for in-page scrolling, so a hash router would
// collide with them. Two routes: '/' (audio portfolio) and '/vision'.
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

  return path.startsWith('/vision') ? <VisionPage /> : <App />
}
