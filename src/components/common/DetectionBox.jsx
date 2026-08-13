import { forwardRef } from 'react'
import './DetectionBox.css'

/**
 * The reusable corner-bracket motif — drawn like a detection bounding box
 * (sharp corner brackets, not a rounded card), per 01 + 03. Used for project
 * cards, timeline entries, and anything that "detects"/highlights content.
 *
 * Forwards a ref to the root element so scenes can use it as a pin trigger.
 *
 * variant: 'default' (magenta) | 'active' (detect cyan) | 'plain' (no fill)
 */
const DetectionBox = forwardRef(function DetectionBox(
  { as: Tag = 'div', variant = 'default', className = '', children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={`detection-box detection-box--${variant} ${className}`} {...rest}>
      <span className="detection-box__corner detection-box__corner--tl" aria-hidden="true" />
      <span className="detection-box__corner detection-box__corner--tr" aria-hidden="true" />
      <span className="detection-box__corner detection-box__corner--bl" aria-hidden="true" />
      <span className="detection-box__corner detection-box__corner--br" aria-hidden="true" />
      {children}
    </Tag>
  )
})

export default DetectionBox
