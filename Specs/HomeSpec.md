# HomeSpec.md

`routes/home.tsx` — static by default; only the mobile menu, theme toggle, and hero status-line animation need client-side interactivity/state.

## Purpose

Answer three questions in under 10 seconds, without scrolling, on a 768px+ viewport: **who is this, what do they build, are they good?** The two featured project teasers answer the third question before the visitor has to click anything.

## Structure (top to bottom)

```
1. Navbar (shared component — see Design.md §8)
2. Hero
   a. Status line (mono, muted)
   b. H1 — name
   c. Role line
   d. One-liner tagline
   e. Primary + secondary CTA
   f. Social icon row
   g. "Currently" status line
3. Featured Work — 2 teaser cards (Manhaj, Aqua)
4. Footer (shared component)
```

## Copy (use verbatim unless the user updates `Plan.md`)

| Element | Copy |
|---|---|
| Status line | `~/portfolio · online` |
| H1 | `Abdulazeez Badmus` |
| Role line | `React Developer · Full Stack Engineer` |
| Tagline | `Building products that serve communities.` |
| Primary CTA | `View Projects →` → `/projects` |
| Secondary CTA | `Download CV ↓` → resume PDF |
| Currently line | `● Currently: React Dev @ Manaknight` |

Update the "Currently" line whenever the role changes — this is a live status indicator, not a fixed timeline entry (the timeline lives on About).

## The status line and "currently" line — implementation detail

These are the only two "dev-like" signals in the hero (see `Design.md` §7 — do not add more).

- **Status line** (`~/portfolio · online`): `JetBrains Mono`, `0.875rem`, `--text-muted`. Optional trailing blinking cursor (`_`) using CSS `steps()` animation — no JS timer, and hidden entirely under `prefers-reduced-motion: reduce`.
- **Currently line**: small accent-colored dot (`--accent`, 6px circle) + mono text, `--text-secondary`. Static, no animation. This is the single most "recruiter-scans-in-3-seconds" element on the page after the name — keep it short enough to not wrap on 375px.

## Featured Work — teaser cards

Two cards, side by side on `md+`, stacked on mobile. Pull directly from `data/projects.ts` where `featured: true` (Manhaj, Aqua) — don't hardcode copy here.

```
┌ Manhaj ──────────────────── Next.js · Supabase ─┐
│ Offline audio library for Nigerian scholars       │
└────────────────────────────────────────────────┘

┌ Aqua ──────────────────── Rust · Tauri · Axum ──┐
│ macOS-style desktop shell over WSL, Rust daemon   │
└────────────────────────────────────────────────┘
```

Each teaser: project number + name (mono label), one-line tagline (sans, `--text-secondary`), 2–3 tech tags (mono pills, `Design.md` §8), whole card is a link to `/projects/:slug`. Hover state: `--bg-card` → `--bg-card-hover`, border `--border` → `--border-accent`. No image on the teaser card — that's reserved for the full Projects page and case study.

## Motion

- Hero content: single fade/slide-up on page load (not scroll-triggered, since it's above the fold) — `opacity 0→1`, `y: 12→0`, `0.4s ease-out`, staggered ~60ms per line (status line → H1 → role → tagline → CTAs).
- Featured teaser cards: scroll-reveal per `Design.md` §6 if they sit below the fold on smaller viewports; otherwise same load-in animation as the hero.
- Respect `prefers-reduced-motion` — fall back to instant render, no stagger.

## Responsive behavior

- **375px:** hero stacks fully, CTAs go full-width stacked (not side-by-side), social icons wrap to a single row, featured teasers stack vertically below the fold — acceptable, since the 10-second test only requires name/role/tagline/status above the fold on mobile too.
- **768px+:** hero content max-width ~640px, CTAs side by side, featured teasers side by side.
- **1024px+:** hero can sit left-aligned with generous right-side whitespace, or centered — pick one and keep it consistent with the Projects page's featured-row alignment.

## Explicitly out of scope for Home

- No skills/tech grid (that's About).
- No embedded case study content — teasers link out, they don't summarize the 10-phase structure inline.
- No contact form on Home — CTA to `/contact` only if needed, but the primary CTA is Projects.
