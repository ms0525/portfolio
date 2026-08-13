import { useRef } from 'react'
import { contact } from '../../content/site'
import { useReveal } from '../../lib/useReveal'
import SectionWrapper from '../common/SectionWrapper'
import SocialLinks from '../common/SocialLinks'
import Waveform from '../common/Waveform'
import './Contact.css'

export default function Contact() {
  const root = useRef(null)
  useReveal(root, { selector: '.contact__primary, .contact__meta, .contact__wave', stagger: 0.12 })

  const telHref = `tel:${contact.phone.replace(/\s+/g, '')}`
  return (
    <SectionWrapper
      id="contact"
      headingId="contact-title"
      label="// contact"
      title={contact.heading}
      className="contact"
    >
      <div ref={root}>
        <div className="contact__grid">
          <div className="contact__primary">
            <p className="contact__body measure">{contact.body}</p>

            <div className="contact__actions">
              <a className="contact__email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <a className="contact__phone data-label" href={telHref}>
                {contact.phone}
              </a>
            </div>

            <SocialLinks className="contact__social" />

            <a className="contact__resume" href={contact.resume} download>
              Download résumé (PDF) <span aria-hidden="true">↓</span>
            </a>
          </div>

          <dl className="contact__meta">
            <div className="contact__meta-row">
              <dt className="data-label">Location</dt>
              <dd>{contact.location}</dd>
            </div>
            <div className="contact__meta-row">
              <dt className="data-label">Email</dt>
              <dd>
                <a className="contact__meta-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="contact__meta-row">
              <dt className="data-label">Phone</dt>
              <dd>
                <a className="contact__meta-link" href={telHref}>
                  {contact.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* The waveform resolves back to a single calm line, bookending the hero. */}
        <div className="contact__wave" aria-hidden="true">
          <Waveform animate />
        </div>
      </div>
    </SectionWrapper>
  )
}
