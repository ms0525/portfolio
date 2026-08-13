# Implementation Roadmap

A phased build order. Each phase has a goal and a checklist — treat the checklist as the definition of "done" before moving to the next phase. Rough pacing assumes building this part-time around the thesis; adjust freely.

## Phase 0 — Setup
**Goal:** a running project with dependencies and design tokens in place, nothing animated yet.

- [ ] `npm create vite@latest` (React template)
- [ ] Install `gsap`, `@gsap/react`, and register `ScrollTrigger` (plus `ScrollSmoother` or `lenis`, per the decision in `04-technical-architecture.md`)
- [ ] Create `src/styles/tokens.css` with every value from `03-design-system.md` as CSS custom properties
- [ ] Create `src/content/*.js` and populate from `02-content-copy.md`
- [ ] Set up font loading (Fontshare/Google Fonts links, or self-hosted) for the three type roles

## Phase 1 — Static structure
**Goal:** every section exists, fully laid out, fully responsive, zero scroll animation. This is the reference material's own advice — "build the static pin block first" — and it holds up: debugging layout and debugging ScrollTrigger timing at the same time is genuinely harder than doing them one after the other.

- [ ] All seven scenes (Hero through Contact) built as plain HTML/CSS, real content, no placeholder Lorem Ipsum
- [ ] Responsive at three breakpoints minimum: mobile (~375px), tablet (~768px), desktop (~1440px)
- [ ] Nav and footer wired up with real links (flag it clearly if the LinkedIn/GitHub placeholders aren't filled in yet)
- [ ] Resume PDF linked and downloadable

## Phase 2 — Core scroll choreography
**Goal:** the scenes from `05-scene-storyboard.md`, implemented one at a time, each verified in isolation before moving to the next.

- [ ] Scene 2 (Experience timeline) first — structurally the simplest, good for confirming the pin/scrub setup works at all
- [ ] Scene 6 (Skills/Instrumentation) — similarly contained
- [ ] Scenes 3 and 4 (the two flagship case studies) — the most timeline-heavy; build one fully before starting the second, then reuse the component
- [ ] Scene 1 (Manifesto) — SplitText word-stagger plus the scan line
- [ ] Scene 0 (Hero) — build last even though it's first on the page; it's the most complex (morph plus multi-stage reveal) and benefits from every pattern already proven out in the simpler scenes
- [ ] Scene 5 (Lab notebook) and Scene 7 (Now/Contact) — lightweight, quick to finish

## Phase 3 — Polish
**Goal:** the page feels intentional, not just functional.

- [ ] Hover/focus micro-interactions on cards, nav, links
- [ ] Easing and stagger timing tuned by feel — the numbers in `03` and `05` are starting points, not final values
- [ ] A cursor or scroll-progress indicator, only if it genuinely earns its place per `01-concept-and-narrative.md` — cut it if it doesn't extend the core motif

## Phase 4 — Accessibility & performance
**Goal:** the non-negotiables from `00-START-HERE.md` are actually true, not just stated.

- [ ] `prefers-reduced-motion` fallback verified for every pinned scene — toggle the OS setting and confirm each section reads fine, fully static
- [ ] Keyboard navigation: tab through the entire page, confirm focus is visible and logical, independent of scroll position
- [ ] Color contrast check on any `--coral`/`--amber` body-text usage specifically (flagged in `03-design-system.md`)
- [ ] Lighthouse pass — performance, accessibility, best practices — fix anything scoring under roughly 90
- [ ] Image optimization (lab-notebook thumbnails, if used) and font-loading strategy confirmed, with no layout shift on font load

## Phase 5 — Mobile QA & deploy
**Goal:** ship it.

- [ ] Test on an actual phone, not just dev-tools device emulation — scroll-jacked sections often feel different under real touch momentum
- [ ] Apply `ScrollTrigger.matchMedia()` simplifications below ~768px per the mobile note in `04-technical-architecture.md`
- [ ] OG meta tags and favicon for link previews
- [ ] Deploy to Vercel or Netlify
- [ ] Final pass: confirm the thesis title and the LinkedIn/GitHub URLs from `00-START-HERE.md` are filled in before going live
