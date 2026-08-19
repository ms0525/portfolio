import { useState } from 'react'
import { navLinks, contact } from '../../content/site'
import { navigate } from '../../Router'
import './Nav.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const goVision = (e) => {
    e.preventDefault()
    close()
    navigate('/vision')
  }
  const goLanding = (e) => {
    e.preventDefault()
    close()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="/" onClick={goLanding}>
          <span className="nav__brand-mark" aria-hidden="true" />
          Maaz&nbsp;Saeed
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__toggle-bars" data-open={open} aria-hidden="true" />
        </button>

        <nav id="nav-menu" className="nav__menu" data-open={open} aria-label="Primary">
          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a className="nav__link data-label" href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav__vision data-label" href="/vision" onClick={goVision}>
            Vision&nbsp;↗
          </a>
          <a className="nav__resume data-label" href={contact.resume} download onClick={close}>
            Resume&nbsp;↓
          </a>
        </nav>
      </div>
    </header>
  )
}
