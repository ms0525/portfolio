# Technical Architecture

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Vite + React** | This is one continuous scroll experience, not a multi-route app. Vite's simplicity and fast dev server beat Next.js's SSR complexity here — SSR actively complicates GSAP/ScrollTrigger setup, since both are DOM-dependent and need careful effect-gating. Switch to Next.js later only if per-project SEO pages or a blog get added. |
| Animation engine | **GSAP** (core) | The performant, battle-tested choice — confirmed in the reference material and unchanged. |
| Scroll-linked animation | **GSAP ScrollTrigger** | Pin, scrub, and trigger logic for every section in `05-scene-storyboard.md`. |
| Smooth scroll | **GSAP ScrollSmoother** *or* **Lenis** | As of GSAP 3.13 (mid-2025), Webflow — which acquired GreenSock in late 2024 — made the entire former "Club GreenSock" plugin set free for everyone, commercial use included. That includes ScrollSmoother, which makes it the lower-friction default now: it's built natively for ScrollTrigger and needs no manual scroller-proxy wiring. Lenis remains a strong, well-established alternative if a lighter, framework-agnostic feel is preferred — it's the one named in the pasted reference material and still widely used on award-winning sites. Pick one; don't run both. |
| Text splitting | **GSAP SplitText** | Also free as of the same update, and rewritten with better accessibility (screen-reader-safe output) and a smaller bundle than the old paid version. Prefer this over third-party alternatives like SplitType now that it's free and natively integrated with ScrollTrigger. |
| React integration | **`@gsap/react`'s `useGSAP()` hook** | The current officially-recommended pattern for using GSAP inside React — a drop-in replacement for `useEffect`/`useLayoutEffect` that handles GSAP context cleanup automatically. Use this instead of raw `useEffect` plus manual `.revert()` calls. |
| 3D *(optional, stretch)* | **React Three Fiber** | Only worth adding if there's real appetite for a true 3D particle spectrogram in the hero. Treat as a v2 enhancement, not a v1 requirement — it's meaningful added scope and performance risk for a page that already has a strong signature moment without it. |
| Hosting | **Vercel** or **Netlify** | Either works fine for a static Vite build; pick whichever has the simpler existing account. |

## Project structure

```
src/
  components/
    Hero/
      Hero.jsx
      useHeroMorph.js        # the waveform → spectrogram → detection ScrollTrigger timeline
    Manifesto/
    Experience/
      Timeline.jsx
      TimelineEntry.jsx
    Projects/
      FlagshipCase.jsx       # reusable pinned case-study component (Scenes 3 & 4)
      LabNotebookGrid.jsx
      ProjectCard.jsx
    Skills/
      SpectrumAnalyzer.jsx
    Now/
    Contact/
    common/
      Nav.jsx
      Footer.jsx
      SectionWrapper.jsx     # shared pin/scrub boilerplate
      DetectionBox.jsx       # the reusable corner-bracket UI motif
  content/
    experience.js            # structured data pulled from 02-content-copy.md
    projects.js
    skills.js
  hooks/
    useLenis.js               # only if Lenis is chosen over ScrollSmoother
  styles/
    tokens.css                # design tokens from 03-design-system.md, as CSS custom properties
    global.css
  App.jsx
  main.jsx
public/
  resume.pdf
  favicon.svg
```

Keep content in `src/content/*.js` as plain data, not hardcoded inside JSX. `02-content-copy.md` should map almost line-for-line into these files — that way a future copy edit is a data change, not a component rewrite.

## Example: hero ScrollTrigger pattern

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".waveform-path", { morphSVG: ".spectrogram-path" }, 0)
        .to(".detection-box", { opacity: 1, scale: 1, stagger: 0.1 }, ">-0.3")
        .to(".detection-label", { opacity: 1, y: 0, stagger: 0.08 }, "<0.1");
    });
  }, { scope: container });

  return <section ref={container} className="hero">{/* ... */}</section>;
}
```

This is illustrative, not final — `05-scene-storyboard.md` has the full per-section timeline spec to translate into code like this. Note the `gsap.matchMedia()` wrapper: it's how the reduced-motion fallback gets implemented in practice, not just declared as a rule.

## Performance & accessibility rules

Respect `prefers-reduced-motion` for real: wrap every pin/scrub setup in a `gsap.matchMedia()` block keyed to `(prefers-reduced-motion: no-preference)`, and render a genuinely different, fully static layout in the alternate branch — not a degraded version of the same animation. Keep the JS bundle lean: GSAP core + ScrollTrigger + ScrollSmoother (or Lenis) + SplitText is already a reasonable payload, so don't add Three.js unless the optional 3D hero is actually being built. Call `ScrollTrigger.refresh()` after web fonts finish loading (`document.fonts.ready`) and on resize, since pinned-section heights shift when type reflows. Lazy-load below-the-fold images — the lab-notebook project thumbnails — with native `loading="lazy"`. Test keyboard navigation and focus visibility independently of the scroll animation; a sighted keyboard user tabbing through links shouldn't be fighting a pinned section to get there.

## Mobile note

Heavy pin-and-scrub sections that feel cinematic on a trackpad often feel broken on a phone — touch momentum scrolling fights the scrub, and a pinned section eats a disproportionate share of a small viewport. Use `ScrollTrigger.matchMedia()` to simplify or disable pinning below roughly 768px and replace it with lighter scroll-triggered fades or slides using the same content. Decide this per section while building `05-scene-storyboard.md`, not as an afterthought once the desktop version is "done."
