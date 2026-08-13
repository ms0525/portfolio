# Design System

Read `01-concept-and-narrative.md` first — every choice below is justified by "the site visually does what the spectrogram-detection work does," not picked for mood alone.

## Self-critique, up front

The obvious failure mode for "ML engineer dark portfolio" is landing on a generic near-black-plus-one-neon-accent look — competent, forgettable, indistinguishable from a thousand other dev sites. Two things keep this build out of that bucket: the palette is sourced from a real spectrogram colormap rather than an arbitrary accent color, and the structural motifs (bounding-box corners, scan lines, time-axis layouts) are literal shapes pulled from Maaz's own model outputs, not decoration borrowed from a generic "data viz" mood board. If a component stops being traceable to one of those two sources, it doesn't belong.

## Color

Sourced directly from **magma** — the perceptually-uniform colormap Librosa and matplotlib actually render spectrograms in by default. These are real, computed colormap stops, not eyeballed, so the gradient holds together correctly out of the box.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#000004` | Page background — the colormap's own zero point, near-black |
| `--surface` | `#0d0612` | Slightly lifted surface: nav bar, cards |
| `--violet` | `#331067` | Deep accent — dividers, low-emphasis fills |
| `--magenta` | `#842681` | Mid accent — gradient midpoint, secondary highlights |
| `--coral` | `#d6456c` | High-energy accent — active states, the "hot" end of a detected event |
| `--amber` | `#fc8c63` | Warm highlight — hover states, metric callouts |
| `--cream` | `#fcfdbf` | Near-white — primary headline color, max-energy gradient stop |
| `--text` | `#ECEAF5` | Body copy (not pure white — easier to read at length on `--bg`) |
| `--detect` | `#5CF4D6` | The one cool color in the system. Bright cyan, reserved for "detection" UI only: bounding-box outlines, the active nav indicator, focus rings. This earns its place as the single contrasting note because real CV detection overlays are almost always rendered in a bright cyan or green against whatever the source image looks like — it's not a second arbitrary accent, it's the same convention his own model outputs use. |

Gradients always move through the full magma sequence in order (`--bg → --violet → --magenta → --coral → --amber → --cream`), never just two stops — the in-between steps are what make it read as a colormap instead of a generic two-color gradient.

**Accessibility check:** `--text` on `--bg` clears WCAG AA comfortably for body copy. `--coral` and `--amber` are for large text, icons, and UI accents only — verify contrast before using either at body size directly on `--bg`.

## Typography

Three roles, each doing exactly one job:

- **Display** (hero name/tagline, section headings) — a high-contrast grotesk with some personality: *Cabinet Grotesk*, *General Sans*, or *Neue Montreal* all fit and are free via Fontshare. Set tight (-1 to -2% tracking), large, used with restraint — this is the one place the type itself is allowed to be a little loud.
- **Body** (manifesto, project narrative, case-study prose) — a clean, highly legible humanist sans at comfortable reading size: *Inter* or *Switzer*. Quiet on purpose; it should disappear and let the writing carry itself.
- **Data/utility** (dates, tech tags, metrics, the status line, nav labels) — a monospace: *JetBrains Mono* or *IBM Plex Mono*. This is what makes the "lab notebook" feeling work — every number and tag reads like it came off an instrument, not off a marketing template.

Type scale (rem, 16px base):

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Hero name | 5–7rem, clamp to viewport | 600 | -2% |
| Hero tagline | 1.5–1.75rem | 400 | 0 |
| Section heading | 2.5–3rem | 600 | -1% |
| Body | 1.125rem | 400 | 0 |
| Data/tag | 0.8125rem | 500 | +2%, uppercase where used as a label |

## Layout & spacing

8px base unit. Vertical rhythm: 6–8 spacing units between blocks within a section, 12–16 between sections. Content max-width 720px for body/manifesto text (reading comfort); full-bleed for the visual/animation layers.

**Hero — layout sketch:**
```
┌──────────────────────────────────────────┐
│                                            │
│   [eyebrow: role label, monospace]        │
│                                            │
│   M A A Z   S A E E D          ░▓▓░       │
│                                 ░▓░░▒      │ ← waveform/spectrogram
│   I teach machines to see      ▒░▓▓░      │   visual occupies the
│   what we hear.                ░░▒▓░      │   right/lower portion —
│                                            │   not centered under a
│   [scroll cue ↓]                          │   centered headline
└──────────────────────────────────────────┘
```
Deliberately asymmetric, not centered — a centered hero with a centered animation beneath it is the default everyone reaches for. Text stays left-anchored; the visual gets the rest of the frame.

**Flagship case-study — layout sketch:**
```
┌──────────────────────────────────────────┐
│  ⌐ SOUND EVENT DETECTION                ⌐ │ ← bounding-box-style
│                                            │   corner brackets,
│   [spectrogram visual, boxes drawing on]  │   not a rounded card
│                                            │
│   Narrative text panel slides in here →   │
│   [mAP 0.37 → 0.41, animated on scroll]   │
└──────────────────────────────────────────┘
```

## Motion

One signature moment — the hero morph; everything else stays quiet and consistent:

- **Easing:** `power2.out` for entrances, `power1.inOut` for scroll-scrubbed motion. This tracks scroll velocity more naturally than a bouncy ease — the page should feel precise, not playful.
- **Scrub feel:** `scrub: 1` (roughly one second of catch-up) on pinned sections — smooth without feeling laggy.
- **Stagger:** text reveals stagger by ~0.03–0.05s per word/character — fast enough to read as alive, slow enough not to feel like a loading spinner.
- **Reduced motion:** every scroll-pinned sequence needs a static equivalent — the final-state layout shown directly, no animation, when `prefers-reduced-motion: reduce` is set. This is a launch blocker, not optional polish (see `06-implementation-roadmap.md`).

## The signature element

The hero's waveform → spectrogram → detection-box morph is the one place this design spends its boldness. It should be the only moment on the page someone would screenshot and send to a friend. Everything documented above exists to support it quietly — the corner-bracket motif, the magma gradient, and the cyan detection color all originate in that one moment and repeat throughout the page, rather than each section inventing its own trick.
