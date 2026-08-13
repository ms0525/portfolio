import './SectionWrapper.css'

/**
 * Shared section shell: anchor id, consistent vertical rhythm, optional
 * eyebrow label (mono) + heading + intro. In Phase 2 this is where pin/scrub
 * boilerplate will hang; for Phase 1 it is purely layout.
 */
export default function SectionWrapper({
  id,
  label,
  title,
  intro,
  children,
  className = '',
  headingId,
}) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={headingId}>
      <div className="section__inner container">
        {(label || title || intro) && (
          <header className="section__head">
            {label && <p className="data-label section__label">{label}</p>}
            {title && (
              <h2 id={headingId} className="section__title">
                {title}
              </h2>
            )}
            {intro && <p className="section__intro measure">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
