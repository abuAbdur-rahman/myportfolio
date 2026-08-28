# Design System

> Direction: **Neo-Minimalism, warm dark.** Clean layout, bold type, one purposeful accent color. This document is the single source of truth for tokens, type, spacing, motion, and the "dev-like but not gimmicky" hero treatment. If a component isn't described here, don't improvise a new pattern — extend the closest existing one and update this doc.

## 1. Principles

1. **Typography is the hero.** No illustration, no 3D render, no particle field carries the first fold — the name and role do.
2. **One accent, used sparingly.** Terracotta shows up on links, focus states, and one signature element per section. It is never a background fill for large areas.
3. **Motion enhances, never announces itself.** If a user notices the animation before the content, it's too much.
4. **Every screen must justify its weight.** No dependency, no font, no animation library earns a place unless it's used on more than one page.
5. **Fast is a design decision, not an afterthought.** Budget below is enforced at build time, not checked at the end.

## 2. Color Tokens

```css
:root {
  /* Backgrounds — warm charcoal, not navy */
  --bg-primary: #111110;
  --bg-surface: #1a1918;
  --bg-card: #1f1e1d;
  --bg-card-hover: #262524;

  /* Borders */
  --border: #2a2928;
  --border-accent: #3d3b38;

  /* Text — warm whites/grays, never pure #fff/#000 */
  --text-primary: #e8e4df;
  --text-secondary: #9a9590;
  --text-muted: #6b6660;

  /* Accent — terracotta, the signature color */
  --accent: #c2785c;
  --accent-dim: rgba(194, 120, 92, 0.12);
  --accent-hover: #d4896a;

  /* Secondary — sage, success states only */
  --accent-2: #7c9a6b;

  /* Error — warm red, form validation only */
  --red: #c75c5c;
  --red-dim: rgba(199, 92, 92, 0.12);

  /* Tags / pills */
  --tag-bg: #1f1e1d;
  --tag-border: #2a2928;
  --tag-text: #9a9590;
}
```

**Light mode** (if built): invert lightness, keep the same warm hue family — off-white background (`#f7f5f2`), charcoal text, same terracotta accent. Never swap terracotta for blue in light mode; the accent is the brand, not the theme.

**Rule:** electric blue (`#3b82f6` and neighbors) is banned. It's the most overused portfolio accent and reads as "followed a template."

## 3. Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| H1 (hero name) | Inter | `clamp(2.5rem, 5vw, 3.5rem)` | 800 | letter-spacing -0.03em |
| H2 (section) | Inter | `clamp(1.75rem, 3vw, 2.25rem)` | 700 | letter-spacing -0.02em |
| H3 (card title) | Inter | 1.25rem | 600 | |
| Body | Inter | 1rem | 400 | line-height 1.7 |
| Small/caption | Inter | 0.875rem | 400 | |
| Code/accent (tags, meta labels, the hero status line) | JetBrains Mono | 0.875rem | 500 | |

```
font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
font-mono: "JetBrains Mono", "Fira Code", monospace;
```

Body copy is always sans. Mono is reserved for: tech tags, project numbers (`01 /`), the hero status line, code snippets in case studies. Using mono for body text is the "terminal cosplay" trap — don't.

## 4. Spacing & Layout

- Base unit: 4px. Use the standard Tailwind scale (4/8/12/16/24/32/48/64/96).
- Max content width: `1100px` for text-heavy pages (About, Case Study prose), `1280px` for the Projects grid.
- Section vertical rhythm: `96px`–`128px` between major sections on desktop, `64px` on mobile.
- Generous whitespace over dense packing — this is editorial, not a dashboard.

### Breakpoints

| Name | Width | Notes |
|---|---|---|
| `sm` | 375px | Minimum supported — no horizontal scroll, no clipped text |
| `md` | 768px | Tablet — 2-column project grid begins |
| `lg` | 1024px | Desktop — full nav, featured project full-width |
| `xl` | 1280px | Max content width reached |

## 5. Icon System

**Rule: zero emoji, anywhere, ever.**

- UI icons: `lucide-react`, 16–20px, `stroke-width: 1.75`, `color: currentColor`.
- Brand/social icons: `@icons-pack/react-simple-icons` (Lucide deliberately excludes brand marks). Same 18px, `currentColor`.

| Category | Icon | Source |
|---|---|---|
| Home / Projects / About / Contact (nav) | `Home` / `Briefcase` / `User` / `Mail` | lucide |
| Theme toggle | `Sun` / `Moon` | lucide |
| Mobile menu | `Menu` / `X` | lucide |
| Live demo | `ExternalLink` | lucide |
| Source code | `Github` (generic mark) or `SiGithub` (brand mark) | lucide / simple-icons |
| Case study | `BookOpen` | lucide |
| CTA / back | `ArrowRight` / `ArrowLeft` | lucide |
| Experience / company / location | `Calendar` / `Building2` / `MapPin` | lucide |
| Download | `Download` | lucide |
| Challenge / solution / metric / tech | `AlertTriangle` / `CheckCircle2` / `TrendingUp` / `Code2` | lucide |
| GitHub / LinkedIn / X / YouTube (footer, contact) | `SiGithub` / `SiLinkedin` / `SiX` / `SiYoutube` | simple-icons |

## 6. Motion

- Library: Framer Motion, used for exactly two things — scroll-triggered fade/slide-up on section entry (`opacity 0→1`, `y: 16→0`, `duration: 0.4s`, `ease: easeOut`), and page-transition fade (`0.2s`).
- No parallax, no scroll-jacking, no auto-playing carousels, no hover-triggered 3D tilt.
- Respect `prefers-reduced-motion` — disable all transform-based motion, keep opacity fades only.
- Every animated element must have a non-animated fallback that renders correctly with JS disabled (progressive enhancement, not a requirement to load).

## 7. The Hero Section — "Dev-like, not gimmicky"

This is the part that's easy to overdo. The goal is a hero that signals *engineer* through small, restrained details — not a fake terminal window, not a typewriter effect on the whole headline, not a matrix-rain background.

**What "dev-like" means here:** one small monospace status line, treated like a git status or a build badge — quiet, secondary, and true. Everything else is typography.

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   [mono, --text-muted]  ~/portfolio · online       │
│                                                    │
│   Abdulazeez Badmus                    ← H1, sans │
│                                                    │
│   React Developer · Full Stack Engineer            │
│                                                    │
│   Building products that serve communities.        │
│                                                    │
│   [ View Projects → ]   [ Download CV ↓ ]          │
│                                                    │
│   [GitHub] [LinkedIn] [X] [Mail]                    │
│                                                    │
│   [mono, small, accent dot] ● Currently: React Dev  │
│                              @ Manaknight            │
│                                                    │
│   ── Featured Work ──────────────────────────────  │
│   [Manhaj teaser card]   [Aqua teaser card]         │
└──────────────────────────────────────────────────┘
```

**Allowed dev-signals (pick 1–2, not all):**
- A single-line monospace "path" or "status" string above the name (`~/portfolio · online`), static or with a slow blinking cursor character (`_`) — CSS `steps()` animation, no JS, opacity-only if reduced-motion.
- A small accent-colored dot + mono text for current role status (`● Currently: React Dev @ Manaknight`) — same pattern GitHub/status pages use, instantly readable, zero gimmick.
- Tech tags rendered as mono pills on project teaser cards.

**Explicitly banned in the hero:**
- Interactive terminal window with fake commands to type/click through.
- Code-editor mockup as a background layer.
- Matrix/particle/binary-rain animated backgrounds.
- Typewriter-animating the H1 or tagline on every visit — it's charming once, annoying on repeat views, and it's a CLS/LCP risk.

**Layout:** name and role are always visible without scrolling on a 768px+ viewport. On mobile, the two featured-project teasers may sit just below the fold — that's fine, the 10-second test only requires name/role/one-liner/status above the fold, not the teasers.

## 8. Components (minimal shadcn/ui set)

Only these primitives — resist pulling in more of shadcn than you use:

- `Button` — 2 variants: solid accent (primary CTA), ghost/outline (secondary CTA). No more than one solid-accent button visible at a time per section.
- `Card` — used for project cards and case study callout boxes.
- `Badge` — status pills (`Live`, `In Progress`) and tech tags. Tech tags are neutral (`--tag-bg`/`--tag-border`/`--tag-text`), never color-coded per language — color-coded tech pills read as a template default.
- `Input` / `Textarea` — contact form only.

## 9. Performance Budget

| Metric | Target |
|---|---|
| Largest Contentful Paint | < 1.0s |
| Cumulative Layout Shift | < 0.05 |
| First Input Delay | < 50ms |
| Lighthouse Performance | 90+ |
| Total JS shipped to Home | keep it lean — audit before adding any new dependency |

**Enforced by:**
- Every image ships pre-optimized WebP/AVIF at the exact display dimensions — since every image on this site is author-controlled (no user uploads), there's no need for a runtime optimization pipeline. Explicit `width`/`height` (or `aspect-ratio` CSS) on every `<img>` to prevent CLS.
- WebP/AVIF only, lazy-loaded below the fold.
- Fonts self-hosted via `@fontsource/inter` and `@fontsource/jetbrains-mono` (or manually subset `.woff2` files in `public/fonts/`), loaded with `font-display: swap`.
- Keep components presentational and stateless where possible; route-level loaders own data, not component-level `useEffect`.
- Framer Motion imported per-component, not globally.

## 10. Accessibility (WCAG 2.1 AA — non-negotiable)

- Full keyboard navigation, visible focus rings using `--accent` at 2px offset.
- Color contrast: body text on `--bg-primary` must hit 4.5:1 minimum — verify `--text-secondary` against both dark and light backgrounds.
- Every image has real `alt` text (project screenshots describe what's shown, not "screenshot").
- Semantic HTML: `<nav>`, `<main>`, `<article>` for case studies, one `<h1>` per page.
- Motion respects `prefers-reduced-motion` (see §6).
- Contact form has associated `<label>` elements, not placeholder-only inputs.
