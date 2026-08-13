# Scene Storyboard

Scroll-by-scroll choreography for every section, following the "design in milestones" approach from the reference material — Frame A / B / C keyframes per pinned block. Pixel-runway numbers below are starting points to build against, not gospel; tune by feel once the section is actually scrolling.

## Scene 0 — Hero
**Pin:** yes · **Runway:** ~2000px · **Scrub:** 1

- **Frame A (0px):** Blank `--bg` canvas. A single thin horizontal line sits center-left — the waveform baseline, flat, no amplitude.
- **Frame B (~600px):** The line gains amplitude — a waveform draws in left to right. A pre-baked SVG path is enough; this doesn't need live audio analysis.
- **Frame C (~1200px):** The waveform morphs, via GSAP MorphSVG (free as of GSAP 3.13 — see `04-technical-architecture.md`), into a spectrogram: a grid of colored cells sweeping through the full magma gradient, time on the x-axis, frequency on the y-axis.
- **Frame D (~1700–2000px):** Two or three corner-bracket detection boxes draw on top of the spectrogram (stroke-draw-in, `--detect` cyan), each followed by a label fading in — e.g. "EVENT DETECTED — 0.94". Name, tagline, and supporting line settle into place as this resolves.
- The scroll cue appears only at the very start and fades out by Frame B — it's done its job once motion begins.

## Scene 1 — Manifesto
**Pin:** yes · **Runway:** ~600px (short) · **Scrub:** 1

- The Scene 0 spectrogram shrinks and moves to a low-opacity (~15%) background texture.
- The manifesto paragraph reveals via SplitText word-stagger as the user scrolls through the runway — words light from 30% to full opacity in stagger groups, not all at once.
- A thin scan line (the recurring motif) sweeps left to right across the background spectrogram texture, its position tied directly to scroll progress — the first reuse of "this page is reading your scroll," not just decoration.

## Scene 2 — Experience Timeline
**Pin:** yes · **Runway:** ~2200px · **Scrub:** 1

- A horizontal time-axis line draws in first, left to right, styled like a DAW or spectrogram time ruler with tick marks.
- As scroll progresses, three entries slide up and snap into position along the axis, in chronological order: Research Project Student (Jun–Dec 2025) → Working Student (Jan–Jun 2026) → M.Sc. Thesis (Jul 2026–Present).
- Each entry is a corner-bracket card; the current/active one — the M.Sc. Thesis — gets a `--detect` cyan outline instead of the default `--magenta`, plus a small pulsing dot, distinguishing "ongoing" from "completed" without needing a text label to say so.
- This is the one section where sequence numbering is earned, per `03-design-system.md`'s rule against decorative numbering elsewhere. Implicit ordering via position on the axis is enough — skip redundant "01/02/03" labels on top of it.

## Scene 3 — Flagship Case Study: Sound Event Detection via Vision Models
**Pin:** yes · **Runway:** ~3000px · **Scrub:** 1 — mirrors the literal scroll pattern from the reference material, applied to this specific project

- **Frame A:** Project title plus a low-opacity, slightly scaled-down spectrogram graphic.
- **Frame B (mid-scroll):** The visual scales up and sharpens; bounding boxes draw on one at a time with labels — DESED / Amazon Basin / whale vocalization, naming the actual datasets as the "detected" labels is a nice literal touch. A narrative text panel slides in from the side, revealed via word-stagger.
- **Frame C (late):** Tech tags (YOLO, ATST, BEATs) appear as small chips along the bottom; a short callout fades in: "DCASE workshop paper in progress."
- Exit: visual settles, pin releases, normal scroll continues into the next case study.

## Scene 4 — Flagship Case Study: Foreground & Background SED
**Pin:** yes · **Runway:** ~2600px · **Scrub:** 1

- Same A/B/C shape as Scene 3, with one distinct beat: the **mAP 0.37 → 0.41** result gets an animated count-up tied directly to scroll position, not time — scrub the number itself from 0.37 to 0.41 as the user scrolls through this frame, alongside a simple before/after bar comparison. This is the single most satisfying scrollytelling beat on the page: a real result, driven by a real scroll gesture, not a canned timed counter.

## Scene 5 — Lab Notebook (the three academic projects)
**Pin:** no, deliberately lighter than Scenes 3–4 · simple scroll-triggered fade/slide per card

- Three cards — Neural Audio Codecs, Blind Source Separation, Speech Enhancement U-Net — in a grid, each entering with a short fade-up as it crosses into the viewport (`scrollTrigger: { trigger: card, start: "top 80%" }`, no pin, no scrub).
- Cards keep the corner-bracket visual language but stay quiet: no morphing visuals, no count-ups. That restraint is what keeps Scenes 3 and 4 feeling special instead of diluted.

## Scene 6 — Instrumentation (Skills)
**Pin:** yes · **Runway:** ~1200px · **Scrub:** 1

- Vertical bars rise from the baseline like a spectrum analyzer, grouped into the five clusters from `02-content-copy.md` (Programming & ML, ML & DL Models, Audio & DSP, Tools, Core Areas).
- Bars rise as the user scrolls; height itself doesn't need to encode a literal skill-level claim that isn't in the CV — keep heights uniform or near-uniform and let the labels and the rising motion do the work, rather than implying a fake proficiency meter.
- Group labels appear above each cluster in monospace as that cluster's bars finish rising.

## Scene 7 — Now + Education + Contact
**Pin:** no · simple sequential fade-ins

- The status line fades in first: `// status: thesis_mode — Fraunhofer IDMT — since Jul 2026`.
- Education and languages follow as a quiet two-column block — no animation flourish needed; this is reference information, not narrative.
- The background spectrogram texture, carried since Scene 1, fades back down to a single calm waveform line, bookending the hero's opening move.
- Contact heading, email, links, and the resume download appear last. The page ends on the waveform line at rest, with a slow, subtle opacity pulse — the signature visual, breathing.
