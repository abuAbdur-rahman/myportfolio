# Phases.md

> Build order for agents. Each phase has a scope, a "don't start the next phase until" gate, and acceptance criteria. Work sequentially — don't jump to case studies before the design tokens exist.

## Phase 0 — Content Lock (before any code)

**Scope:** confirm the facts before building around them.

- [ ] Confirm Aqua's `sourceUrl` (real GitHub URL) and whether it's public yet.
- [ ] Confirm/replace all `liveUrl` values in `Plan.md` project table — Manhaj, RentLedger, Sahnaf links especially, since they may have drifted since the plan was written.
- [ ] Decide real vs. placeholder for every metric referenced in `Plan.md` case study source material. Anything unverified gets flagged `[TODO — verify before send]`, not a guessed number.
- [ ] Confirm the CV/resume file exists and is current — About + Home both link to it.

**Gate:** don't start Phase 1 with fake links or fake numbers already baked into `data/projects.ts` — fix the data model once, correctly.

---

## Phase 1 — Foundation

**Scope:** scaffold, tokens, fonts, layout shell.

1. Scaffold Vite + React 19 + React Router v8 in Framework Mode (TypeScript strict).
2. Install: `react-router`, `@react-router/dev`, `tailwindcss`, shadcn/ui (`Button`, `Card`, `Badge`, `Input`), `lucide-react`, `@icons-pack/react-simple-icons`, `framer-motion`, `@fontsource/inter`, `@fontsource/jetbrains-mono`. (Resend integration lives in `api/contact.ts`, a standalone Vercel Function — not a frontend dependency.)
3. Wire design tokens from `Design.md` §2 into `app.css` / Tailwind config.
4. Configure Inter + JetBrains Mono via `@fontsource/inter` and `@fontsource/jetbrains-mono` (self-hosted, `font-display: swap`).
5. Build `app/root.tsx` (layout shell) with theme provider (dark default).
6. Build `Navbar` (4 items + mobile menu) and `Footer` (social icons) per `Design.md` §5, §8.

**Acceptance criteria:**
- [ ] Blank page renders with correct background, text, and font tokens — no default Tailwind/shadcn colors visible anywhere.
- [ ] Nav and footer render correctly at 375px and 1280px.
- [ ] `pnpm build` succeeds clean.

---

## Phase 2 — Core Pages

**Scope:** Home, Projects, About, Contact — structure and copy, not yet case studies.

1. Build Home per `Specs/HomeSpec.md` — hero, status line, 2 featured teasers (Manhaj, Aqua).
2. Build Projects per `Specs/ProjectsSpec.md` — featured row (Manhaj, Aqua) + 4-card grid (Veridex, RentLedger, Sahnaf, Nomad).
3. Build About per `Specs/AboutSpec.md` — bio, timeline, tech list, CV download.
4. Build Contact per `Specs/ContactSpec.md` — form (Resend) + socials + location/availability.
5. Populate `data/projects.ts` and `data/experience.ts` from `Plan.md`.

**Acceptance criteria:**
- [ ] All 4 pages navigable, no broken internal links.
- [ ] Every project card's `liveUrl`/`sourceUrl` resolves to a real page (or is honestly `null` with an "in progress" state — never a dead link).
- [ ] Mobile pass: no horizontal scroll, no clipped text at 375px on any of the 4 pages.
- [ ] Contact form submits successfully in a dev/test send.

---

## Phase 3 — Case Studies

**Scope:** dynamic `[slug]` route, 10-phase template, real content for at least Manhaj and Aqua before anything else.

1. Build the case-study route (`routes/projects.$slug.tsx`) with an `ErrorBoundary` export for invalid slugs (replaces a separate `not-found.tsx`).
2. Build the shared case-study layout component per `Specs/CaseStudySpec.md`.
3. Write **Manhaj** case study first — most complete product, most important first impression.
4. Write **Aqua** case study second — Rust/Axum daemon architecture, Tauri shell, IPC contract, what's shipped vs. what's still in progress. Be explicit about "in progress" status; don't overstate completeness.
5. Write Veridex, RentLedger, Sahnaf, Nomad as time allows — but the site should not ship with fewer than Manhaj + Aqua complete.

**Acceptance criteria:**
- [ ] Every published case study follows all 10 phases from `Specs/CaseStudySpec.md` — no silently-skipped sections.
- [ ] Every metric is real or explicitly flagged as unverified — see `Agents.md` §4.
- [ ] Case study pages pass the same mobile/performance gates as core pages.

---

## Phase 4 — Polish & Motion

**Scope:** the details that separate "functional" from "impressive without being flashy."

1. Dark/light mode toggle (if built) — verify accent color and contrast in both modes.
2. Scroll-reveal motion per `Design.md` §6 — apply consistently, not ad hoc per page.
3. Full mobile responsiveness audit across all breakpoints in `Design.md` §4.
4. `prefers-reduced-motion` verified with the OS setting on, not just read in code.
5. SEO: meta tags, OG image, `sitemap.ts`, `robots.ts`.

**Acceptance criteria:**
- [ ] Every animated element degrades cleanly with reduced motion on.
- [ ] OG image renders correctly when the URL is pasted into Slack/Twitter/iMessage preview.
- [ ] Full keyboard-only pass across all 5 pages — see `Agents.md` §5.

---

## Phase 5 — Performance & Accessibility Audit

**Scope:** the gate before this goes live.

1. Lighthouse (mobile, throttled) on all 5 pages — Performance 90+, LCP < 1.0s, CLS < 0.05.
2. WCAG 2.1 AA pass — contrast, semantic HTML, alt text, form labels.
3. Zero broken links — automated check across all internal + external links (live demos, source repos, socials).
4. Verify no emoji, no skill bars, no particle effects slipped in anywhere during Phases 2–4.

**Acceptance criteria:**
- [ ] `Design.md` §9 performance budget met on every page, not just Home.
- [ ] Every checkbox in `Plan.md` → "Definition of done" is checked.

---

## Phase 6 — Deploy

**Scope:** ship it.

1. Deploy to Vercel.
2. Configure custom domain (no `*.vercel.app` in the final handed-out URL).
3. Wire analytics (Plausible or Vercel Analytics — privacy-friendly, no cookie banner needed).
4. Final end-to-end pass: open the site cold on mobile data, time it, click every link.

**Acceptance criteria:**
- [ ] Live on custom domain.
- [ ] Every link clicked once, live, after deploy — not just in local dev.
- [ ] Portfolio URL is ready to go on the resume.
