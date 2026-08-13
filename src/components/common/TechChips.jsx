import './TechChips.css'

/**
 * Tech tags as small monospace chips (not uppercased — "PyTorch" must stay
 * "PyTorch"). Reused across timeline entries, flagship cases, and lab cards.
 */
export default function TechChips({ items, className = '' }) {
  if (!items || items.length === 0) return null
  return (
    <ul className={`chips ${className}`}>
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}
