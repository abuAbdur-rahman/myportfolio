# CaseStudySpec.md

`routes/projects.$slug.tsx` — static by default, prerendered per slug via `prerender()` in `react-router.config.ts` (returns the list of slugs from `data/projects.ts`). Invalid slugs handled by the route's `ErrorBoundary` export (replaces a separate `not-found.tsx`).

## Purpose

The 20-minute-read layer for anyone who clicks through — engineers checking code quality/decisions, hiring managers verifying claims. Built for **dual-layer scannability**: someone skimming for 90 seconds should get the shape of the project from headers and callouts alone; someone reading fully gets the reasoning.

## The 10-Phase Structure (every case study, no skipping)

```markdown
# [Number] / [Project Title]
[One-line tagline — the outcome, not the feature list]

[Full-width screenshot, GIF, or architecture diagram]
[Live Demo →]  [Source Code →]   ← omit "Live Demo" if liveUrl is null

## 1. Project Overview
Context: your role, timeline, what kind of project this is (solo/client/team) — 2–3 sentences.

## 2. Problem Statement
The real friction point or gap this solves. 2–3 sentences, no invented statistics.

## 3. Goals & Success Metrics
What "done" or "working" looked like when you started — explicit, not vague ("it should feel fast" → "sub-1s offline load on repeat visits").

## 4. Research & Discovery
Why you chose this approach over alternatives you considered. Skip if there genuinely wasn't a discovery phase — say so honestly rather than inventing one.

## 5. Ideation & Concept Development
What you sketched/explored/discarded before landing on the current shape. For a solo technical project this can be short — architecture options considered, not user personas.

## 6. Design & Architecture
The real technical decisions: stack choices, data model, how components/services talk to each other. This is the section engineers read closely — include a diagram if one exists.

## 7. Challenges
### [Challenge 1]
What went wrong → how you solved it.
### [Challenge 2]
### [Challenge 3]

## 8. Testing & Iteration
How you validated it worked — manual QA pass, a specific bug you hunted down, a design that changed after you used it yourself. Honest > exhaustive.

## 9. Results & Impact
Real metrics only. If unverified, render as a visible placeholder state, not a plausible-looking number — see below.

## 10. Retrospective
What you'd do differently. This is the section that signals growth mindset — don't skip it or make it perfunctory.

[Live Demo →]  [Source Code →]
```

## The "Results" metric block — implementation

```tsx
<MetricRow>
  <Metric value={verified ? "240+" : "TODO"} label="users" verified={verified} />
  ...
</MetricRow>
```

When `verified` is false, render the metric card with a distinct visual treatment (dashed border, `--text-muted`, small "unverified" caption) — it must be visually obvious in both dev and prod that this number hasn't been confirmed. Never let an unverified placeholder render identically to a real stat; that's the exact failure mode `Plan.md` and `Agents.md` both call out.

## Per-project notes

**Manhaj** — write first. Full 10 phases apply cleanly; this is a complete product with real users to reference.

**Aqua** — write second. Verified against the real repo (`github.com/abuAbdur-rahman/aqua`) — use these facts, don't re-derive from memory:
- §1 (Overview): solo project, two-repo/two-agent workflow (Windows app + WSL daemon, cloned once per OS, synced via git — not a shared mount, since Cargo/Vite tooling is markedly slower over `\\wsl.localhost\`).
- §3 (Goals) and §6 (Architecture): fully written now. Architecture is locked and documented — Tauri host owns everything visible, Rust/Axum daemon (`127.0.0.1:61234`) owns everything real, one shared `CONTRACT.md`. Screenshots already exist in the repo root (`ui.png`, `ui-os.png`, `ui-window.png`, `ui-max.png`, `ui-dock-tight.png`, `ui-dock-wave.png`, `ui-fixed.png`) — pull one of these for the case study hero image rather than waiting on a new one.
- §7 (Challenges): use real ones from the repo, not invented — PTY-backed terminal sessions over `/ws/pty/:sessionId`, live `/ws/sysmon` streaming for Activity Monitor, Spotlight's debounced search + system-wide global hotkey (verified end-to-end from the native Windows app, not just in WSL), Spaces/Mission Control drag-to-migrate window state.
- §9 (Results): report actual phase completion, not end-user metrics — Backend Phases 0–4 complete and verified (foundation, Finder, Terminal, Activity Monitor, Spotlight backend); App Phases 0–7 complete (scaffold, chrome, window manager, Finder, Terminal, Activity Monitor, Editor, Spotlight, Spaces). Currently on App Phase 8 (persistence/polish), gated on Backend Phase 5. This is a stronger signal than a vague "in progress" — it shows exactly how much is real.
- §10 (Retrospective): the two-repo/two-agent split with a locked `CONTRACT.md` is itself worth reflecting on — what coordination overhead it added vs. what it prevented.
- Live Demo link is omitted (`liveUrl: null` — native Windows app, not a browser demo). Source Code link: `https://github.com/abuAbdur-rahman/aqua` — confirmed public and live as of this doc's last repo pull.
- **Design note:** Aqua ships its own dark-mode-only design system in its `DESIGN.md` (cyan accent `#22D3EE`, cool-blue-tinted neutral surface ramp) — that's Aqua's product UI, distinct from this portfolio's terracotta/warm-dark system in `Design.md`. Don't blend them; when showing Aqua screenshots in the case study, they'll correctly look like a different, cooler palette than the portfolio chrome around them, and that contrast is fine — it's a screenshot of a different product.

**Veridex** — in-progress client work; be mindful of what's shareable (MCP server design and role-based views are fine; avoid anything that reads as proprietary client detail — see NDA governance principle from the source research: obscure client identity, describe patterns not proprietary specifics).

**RentLedger, Sahnaf, Nomad** — full 10 phases, using the source material in `Plan.md` → "Case study source material" as the starting point for each phase, expanded with real detail once written.

## Layout notes

- Sticky in-page nav (phase jump links) on desktop for the surface-layer skim; collapses to a simple "on this page" disclosure on mobile.
- `← Back to Projects` link, top of page, always visible.
- Code snippets (if included in §6) use the mono font token, syntax-highlighted, never a screenshot of code.
- Architecture diagrams: simple, labeled boxes/arrows — no elaborate illustration. If none exists yet, omit rather than fake one.

## Motion

Scroll-reveal per section, same pattern as Projects page. No motion on the metric numbers themselves (no counting-up animation — it's a gimmick that adds nothing and risks CLS).

## Responsive behavior

- **375px:** single column throughout, metric cards stack vertically, sticky phase nav collapses.
- **768px+:** metric cards go 3-across, prose max-width ~680px for readability even on wide screens.

## `ErrorBoundary` (replaces `not-found.tsx`)

Simple, on-brand 404 for an invalid slug — not a generic framework default. Same nav/footer shell, short message, CTA back to `/projects`. (In React Router v8 this is the route's `ErrorBoundary` export, not a separate file.)
