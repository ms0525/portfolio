// Site-level copy and structured data not itemized elsewhere — hero, manifesto,
// status line, education, languages, contact, links, nav. Sourced from
// 02-content-copy.md. Edit copy here, never hardcoded inside JSX.

export const hero = {
  eyebrow: 'Machine Learning Engineer · Audio & Signal Processing',
  name: 'Maaz Saeed',
  tagline: 'I teach machines to see what we hear.',
  supporting:
    'Deep learning engineer specializing in spectrogram-based audio understanding — sound event detection, speech enhancement, and audio compression — currently at Fraunhofer IDMT.',
  scrollCue: 'Scroll — watch a sound become visible',
}

export const manifesto =
  'Sound is invisible until you know how to look at it. I work at the intersection of audio signal processing and computer vision — converting sound into spectrograms, then training neural networks to detect, localize, and separate events inside them. The same way a vision model finds a cat in a photo, mine finds a gunshot in a city recording, or a whale call in an ocean dataset.'

export const statusLine = '// status: thesis_mode — Fraunhofer IDMT — since Jul 2026'

export const education = [
  {
    degree: 'M.Sc. Research in Media Engineering',
    org: 'Technische Universität Ilmenau, Germany',
    dates: 'Apr 2023 – Present',
  },
  {
    degree: 'B.S. Information Technology',
    org: 'International Islamic University, Pakistan',
    dates: 'Sep 2017 – Aug 2021',
  },
]

export const languages = [
  { name: 'English', level: 'C1 (Fluent)' },
  { name: 'German', level: 'A2 (Beginner)' },
]

export const contact = {
  heading: "Let's talk about sound, signal, or what's next.",
  body: 'Based in Ilmenau, Germany. Reach out directly, or find the code on GitHub.',
  email: 'maazsaeed61998@gmail.com',
  phone: '+49 176 56897279',
  location: 'Ilmenau, Germany',
  resume: '/resume.pdf',
}

// Profile URLs from Maaz's CV. (`url: null` would render a visible "TODO"
// placeholder — kept as the fallback for the SocialLinks component.)
export const links = {
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/maaz-saeed-ml' },
  github: { label: 'GitHub', url: 'https://github.com/ms0525' },
}

// In-page nav targets (mono labels). Section ids match the rendered <section>s.
export const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Academic', href: '#notebook' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
