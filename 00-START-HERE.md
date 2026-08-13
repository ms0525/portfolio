# Portfolio Build — Reference Pack
### For Maaz Saeed — Machine Learning Engineer (Audio & Signal Processing)

This folder is a complete creative and technical brief for a scrollytelling portfolio site, written to be handed directly to an AI coding agent (Claude Code or similar) as the source of truth for the build. Read top to bottom once, then return to whichever file matches what you're working on.

## The one-sentence pitch

He reframes sound as something you can see — turning audio into spectrograms and finding events in them the way a vision model finds objects in a photo. The site proves that, literally: the hero animation converts a waveform into a spectrogram into a detection box, live, on scroll, before a single word of copy is read.

## How to use this pack

Read `01` before touching code — every downstream decision depends on the concept holding together. `02` is the actual words to use; content shouldn't get invented on the fly while building. `03` and `04` can be worked in parallel, design system first if a choice has to be made, since `05` (the storyboard) leans on both. `06` is the literal build order.

| File | What's in it | Read this when… |
|---|---|---|
| `01-concept-and-narrative.md` | The big creative idea, why it fits, tone of voice, page flow | Before any design or copy decisions |
| `02-content-copy.md` | Every word for the site, pulled and rewritten from the CV | Writing or wiring up actual section content |
| `03-design-system.md` | Color, type, spacing, motion tokens, the one signature move | Building components / styling |
| `04-technical-architecture.md` | Stack, folder structure, libraries, performance rules | Setting up the project |
| `05-scene-storyboard.md` | Scroll-by-scroll choreography for every section | Wiring up ScrollTrigger timelines |
| `06-implementation-roadmap.md` | Phased build order with a checklist per phase | Planning the work / tracking progress |

## Non-negotiables

Whatever changes during the build, keep these:

- `prefers-reduced-motion` must produce a fully readable, static fallback, not a missing or broken page.
- The site has to read on mobile without the scroll-jacking feeling broken — see `06`, Phase 5.
- Every technical claim in the copy traces back to the CV. Nothing invented, no numbers padded.
- The hero morph (waveform → spectrogram → detection) is the one "spend your boldness here" moment. Everything else stays disciplined around it — see `03` for why that restraint matters.

## Open items — fill these in before launch

A few things weren't in the source material, so they're flagged as placeholders throughout this pack:

- **Thesis title/topic.** The M.Sc. thesis at Fraunhofer IDMT starts today. `02-content-copy.md` has a placeholder block for it — likely a continuation of the sound-event-detection-via-vision-models thread, but confirm before publishing.
- **LinkedIn and GitHub URLs.** The CV references both but the actual links weren't recoverable from the PDF text. Drop them into `02-content-copy.md` and the site footer/nav.
- **Profile photo.** A usable headshot exists on the CV. Decide whether it appears on the site at all — `01-concept-and-narrative.md` has the reasoning for why this genre of portfolio often skips a literal headshot in favor of the signature visual, and the counter-argument for including one anyway.
- **Domain / hosting choice.** Not opinionated on this. `04` suggests Vercel or Netlify as easy, free defaults.

## A note on what changed from the CV

Today is the last day as a Working Student and the first day of the M.Sc. thesis, both at Fraunhofer IDMT. The CV's single "Jan 2026 – Present" entry has been split into two in `02-content-copy.md`: the Working Student role now closes (Jan – Jun 2026), and a new M.Sc. Thesis entry opens (Jul 2026 – Present). That transition also gets used directly in the narrative as a "currently:" status line in Scene 7 — it's a genuinely good detail to lean into, not just a bookkeeping fix.
