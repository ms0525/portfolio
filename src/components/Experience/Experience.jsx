import { experience } from '../../content/experience'
import SectionWrapper from '../common/SectionWrapper'
import Timeline from './Timeline'
import './Experience.css'

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      headingId="experience-title"
      label="// experience"
      title="Experience"
    >
      <Timeline entries={experience} />
    </SectionWrapper>
  )
}
