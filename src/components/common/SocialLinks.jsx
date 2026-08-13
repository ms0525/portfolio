import { links } from '../../content/site'
import './SocialLinks.css'

/**
 * LinkedIn / GitHub links. Per decision #2 in the plan, a null URL renders a
 * visible "TODO: add URL" placeholder (not a blank or a broken link) until the
 * real profile URLs are provided.
 */
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`social ${className}`}>
      {Object.entries(links).map(([key, { label, url }]) =>
        url ? (
          <li key={key}>
            <a
              className="social__link data-label"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {label} ↗
            </a>
          </li>
        ) : (
          <li key={key}>
            <span
              className="social__link social__link--todo data-label"
              title={`${label} URL not provided yet`}
            >
              {label}: TODO
            </span>
          </li>
        )
      )}
    </ul>
  )
}
