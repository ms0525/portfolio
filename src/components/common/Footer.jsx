import { contact } from '../../content/site'
import SocialLinks from './SocialLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__name">Maaz Saeed</span>
          <span className="data-label footer__loc">{contact.location}</span>
        </div>

        <div className="footer__links">
          <a className="data-label footer__email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <SocialLinks />
        </div>

        <a className="data-label footer__top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
