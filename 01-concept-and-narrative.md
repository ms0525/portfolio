# Concept & Narrative

## The big idea

**Working title: "Seeing Sound."**
**Tagline: "I teach machines to see what we hear."**

Most ML portfolios converge on the same shape: a hero headline, a grid of project cards, a skills cloud. This one is built around a single, true, ownable fact about how Maaz actually works — his core technique is treating audio as an image: converting sound into spectrograms and running vision models (YOLO-based object detection) on them to find and localize events. That's not a metaphor invented for the site. It's the literal job description: *"Reformulated sound event detection as an object-detection problem using YOLO-based models for precise time-frequency localisation on spectrograms."*

So the site does the same thing the model does, in front of the visitor: a sound becomes a picture, and the picture gets detected. That's the hero. Everything else extends the same visual language instead of each section inventing its own trick.

## Why this, specifically, and not a generic "dark techy" theme

It would be easy to default to a near-black background with one neon accent — competent, but generic, and indistinguishable from a thousand other dev portfolios. The difference here is that every visual choice is sourced from real working materials, not decoration layered on top:

- The color palette *is* a real spectrogram colormap (magma — the one Librosa/matplotlib actually render spectrograms in), not an arbitrary gradient picked for mood.
- The "boxes" used as a UI motif throughout (cards, tags, the active nav item) are drawn like detection bounding boxes — corner brackets, not rounded cards — because that's the literal shape his models output.
- The experience timeline looks like a DAW or spectrogram time axis, because that's the tool he stares at all day.
- Monospace type shows up exactly where a lab notebook or terminal would use it: data, tags, timestamps, the status line. Nowhere else.

If any section stops reading as "this came from his actual work" and starts reading as generic dark-mode-tech-portfolio decoration, cut it.

## Tone of voice

Precise over hyped. The work is genuinely interesting on its own; it doesn't need marketing adjectives stacked on top. Write the way Maaz would explain a project to another engineer at a conference poster session — plain, specific, a little dry, confident without performing confidence. Avoid words like "passionate," "leverage," "cutting-edge," "revolutionize," "seamlessly." Prefer concrete numbers, named datasets, named architectures, named trade-offs.

First person throughout — "I reframed…", not "Maaz reframed…" and not "We…".

## Page flow

The page is one continuous scroll with seven movements. Each is documented scene-by-scene in `05-scene-storyboard.md`; this is the high-level shape.

1. **Hero** — the signature moment: waveform → spectrogram → detected event, live on scroll. Name, role, and tagline settle once the visual resolves.
2. **Manifesto** — two or three sentences on the "sound as something you can see" framing, the spectrogram fading down to a quiet background texture behind the text.
3. **Experience** — a timeline (Research Project Student → Working Student → M.Sc. Thesis), styled like a time axis with event markers, because it genuinely is chronological — the one place sequence is earned rather than decorative.
4. **Flagship work** — two deep, scroll-driven case studies (Sound Event Detection via Vision Models; Foreground/Background SED and its 0.37 → 0.41 mAP result), each pinned with its own scroll-scrubbed timeline, in the spirit of the GSAP pattern in the reference material.
5. **Lab notebook** — the three academic projects (Neural Audio Codecs, Blind Source Separation, Speech Enhancement U-Net) as a lighter, denser grid: real depth, but without a full pinned sequence each, to keep the page from sprawling.
6. **Instrumentation** — skills, visualized as a spectrum analyzer rather than a tag cloud, because that's a more honest representation of "breadth across a stack" than a flat list pretending to rank anything.
7. **Now + Contact** — a one-line "currently:" status (the thesis, started today), education, languages, and a calm close. The spectrogram resolves back down to a single waveform line, mirroring the hero's opening move.

## Recurring visual motifs — reuse these, don't invent new ones per section

- **The waveform line.** Opens the hero, closes the contact section. A signature, not a section divider.
- **The magma gradient.** The only color system on the page. No section gets its own arbitrary accent color.
- **Corner-bracket boxes** (sharp corners, not rounded cards). Used for anything that's "detecting" or highlighting content: project cards, tag chips, the active nav item.
- **The scan line.** A thin moving indicator tied to scroll position, used sparingly (manifesto background, timeline) to reinforce that this page is reading the visitor's scroll, not just sitting there as a static brochure.
- **Monospace data labels.** Dates, metrics, tech tags, the status line. Never body copy.

## What to deliberately avoid

A warm cream-and-serif editorial look, a broadsheet/newspaper hairline-rule layout, and a single-neon-accent dark theme with no other distinguishing choice are all well-worn AI-portfolio defaults, and none of them are grounded in what this person actually does. Also avoid a generic 3D particle hero scene unless it's explicitly built as an actual spectrogram-driven particle field (see `04` for that as an optional stretch goal, not a v1 requirement); a literal headshot-in-a-circle as the hero's focal point, since the signature animation should hold that role instead; and decorative numbered markers (01 / 02 / 03) on anything that isn't genuinely sequential — projects and skills aren't ranked, so the design shouldn't imply they are.
