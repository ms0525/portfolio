import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import Router from './Router.jsx'

// Note: React.StrictMode is intentionally omitted. Its dev-only double-invocation
// of effects double-creates GSAP ScrollTrigger pins (nesting pin-spacers and
// breaking pinSpacing). This is a known GSAP + StrictMode conflict; dropping it
// makes the dev pinning behaviour match production.
createRoot(document.getElementById('root')).render(<Router />)
