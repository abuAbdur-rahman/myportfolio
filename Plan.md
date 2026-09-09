# Portfolio — Plan

> Distilled from the full research doc. This is what to build, not why. See `Design.md` for visual system, `Phases.md` for build order, `Agents.md` for engineering rules, `Specs/*Spec.md` for per-page detail.

## Identity

**Abdulazeez Badmus (Abu Abdirrahman)** — React Developer & Full Stack Engineer. Product builder, not AI-wrapper builder.

**Hero line:** "Building products that serve communities."

**Positioning:** Self-taught (2021) → Sanfaani (Next.js/Firebase/Drizzle, African startups) → Doorite (Full Stack Engineer, shipped production systems end-to-end) → Manaknight (React Developer, deep React craft) → Freelancer (current, open to remote work).

## What this site must do in 10 seconds

1. Say who you are and what you build.
2. Show your two strongest projects with outcome-framed titles, not feature lists.
3. Signal that you ship — live links, real status, no placeholders pretending to be metrics.
4. Get out of the way. No loading spinner, no particle field, no scroll-jacking.

## Non-negotiables

- 5 pages max: Home, Projects, Case Study (dynamic), About, Contact.
- No AI-wrapper aesthetic — no terminal-as-hero, no RAG diagrams, no chat-bubble mockups.
- No skill progress bars, no emoji, no particle backgrounds, no "passionate developer" copy.
- Every metric in a case study is either real or a `[TODO — verify before send]` — never a fabricated number.
- Every "Live" badge points to something that actually loads.
- Custom domain before this ships anywhere (no `*.vercel.app` in the final URL you hand out).

## Projects (6, ordered by narrative weight)

| # | Project | Role in portfolio | Why it's here |
|---|---------|--------------------|----------------|
| 01 | **Manhaj** | Featured | Clearest end-user problem, full product surface (auth, RLS, offline PWA, admin) |
| 02 | **Aqua** | Featured | Systems-level range signal — Rust/Axum daemon + Tauri desktop shell over WSL, not another CRUD app |
| 03 | **Veridex** | In-progress showcase | AI-agent-operable tooling (MCP server), current client work, shows what you're building *now* |
| 04 | **RentLedger** | Case study | Full trust workflow: auth, RLS, payment state, rollback |
| 05 | **Sahnaf** | Case study | Commerce + domain calculator, admin back office |
| 06 | **Nomad** | Case study | Native/mobile engineering — filesystem, Git, editor internals |

**Featured slots (2 max on Home + Projects):** Manhaj and Aqua. Manhaj because it's the most complete end-to-end product with a real user. Aqua because it's the strongest engineering-range signal — it proves you can own a daemon, an IPC contract, and a desktop shell, not just another Next.js CRUD app. Veridex stays visible as "in-progress" directly under the featured row since it's live client work, but doesn't take a featured slot until it has a demo.

### Aqua — project entry

Verified directly against `github.com/abuAbdur-rahman/aqua` (README, DESIGN.md, AGENTS.md, and a real in-app screenshot) — this is not placeholder copy.

```typescript
{
  slug: "aqua",
  number: "02",
  label: "SYSTEMS ENGINEERING",
  title: "Aqua",
  tagline: "A native macOS-mannered desktop for WSL Ubuntu — Finder, Terminal, Editor, Spotlight, Spaces — driven by a Rust/Axum daemon.",
  tech: ["Tauri", "Rust", "Axum", "React", "TypeScript", "WebSocket", "WSL2", "Monaco"],
  status: "in-progress",
  featured: true,
  liveUrl: null, // native Windows app, not a browser demo — see Specs/ProjectsSpec.md
  sourceUrl: "https://github.com/abuAbdur-rahman/aqua",
}
```

**One-paragraph pitch (for card + first fold of case study):**
Aqua gives WSL Ubuntu a real, daily-driver desktop that looks and behaves like macOS — Finder, Terminal, Activity Monitor, a Monaco-based editor, Spotlight with a global hotkey, and full Spaces/Mission Control — shipped as a native Windows app. A Tauri host on Windows owns everything visible; a Rust/Axum daemon running inside WSL, bound to `127.0.0.1:61234`, owns everything real — filesystem, processes, shell. The two sides share one contract (`CONTRACT.md`) and are built as two independently-buildable, cloned-on-each-OS workstreams with their own `AGENTS.md` and `PLAN.md`.

**Actual status (as of this repo pull):**
- Backend: Phases 0–4 complete and verified — foundation, Finder, Terminal, Activity Monitor, Spotlight search backend.
- App: Phases 0–7 complete — Tauri scaffold + daemon spawn/health-check, window manager with OS chrome, Finder, Terminal PTY sessions (`/ws/pty/:sessionId`), Activity Monitor streaming (`/ws/sysmon`), Monaco editor linked to Finder/Terminal, Spotlight (debounced search, global `Ctrl+Shift+Space` hotkey, verified end-to-end), and Spaces with drag-to-migrate window cards.
- Active work: **App Phase 8 — Persistence and Desktop Polish**, gated on **Backend Phase 5 — Persistence**. Backend Phase 6 (hardening audit) is future work.
- This is a real, buildable, CI-gated repo — protected `master` branch, required PR review, `cargo fmt`/Clippy/tests on the daemon side, `pnpm test`/`build`/`cargo check` on the app side.

**For the case study, use this status honestly** — "in progress" here means "8 of roughly 10 phases shipped and verified," not "early concept." That distinction is worth making explicit; it's a stronger signal than either overstating completeness or underselling real, working software.

## Pages

1. **Home** — name, role, one-liner, status, 2 featured project teasers, socials. See `Specs/HomeSpec.md`.
2. **Projects** — featured (Manhaj, Aqua) + card grid (Veridex, RentLedger, Sahnaf, Nomad). See `Specs/ProjectsSpec.md`.
3. **Case Study** `[slug]` — 10-phase template, dual-layer (skim + deep read). See `Specs/CaseStudySpec.md`.
4. **About** — 2–3 sentence bio, experience timeline, tech list, CV download. See `Specs/AboutSpec.md`.
5. **Contact** — form + socials + location/availability. See `Specs/ContactSpec.md`.

## Case study source material (fill in, don't invent)

**Manhaj** — Problem: Nigerian scholars lack organized, reliable-offline Islamic audio. Approach: Next.js + Supabase + Cloudflare R2, service worker for offline playback, scoped admin. Challenges: 500MB upload validation, offline playback via range requests, role-based admin access.

**Aqua** — Problem: no real, daily-driver desktop for WSL Ubuntu that feels native rather than "terminal + raw Explorer." Approach: Tauri host on Windows (owns everything visible) + Rust/Axum daemon inside WSL bound to `127.0.0.1:61234` (owns everything real — fs/process/shell), one shared contract in `CONTRACT.md`, built as two independently-buildable clones with their own scoped `AGENTS.md`. Challenges (real, from the repo): PTY-backed terminal sessions over WebSocket (`/ws/pty/:sessionId`), live system-monitor streaming (`/ws/sysmon`), a debounced Spotlight search wired to a system-wide global hotkey and verified end-to-end from the native app, and Spaces/Mission Control with drag-to-migrate window state. Current gate: App Phase 8 (persistence/polish) waiting on Backend Phase 5 (persistence).

**Veridex** — Problem: QA and issue tracking living in spreadsheets, invisible to AI agents. Approach: React 19 + Vite + TanStack Router/Query + MCP server so agents can operate the tracker directly. Challenges: role-based views, drag-and-drop state consistency, MCP tool surface design.

**RentLedger** — Problem: landlords and tenants have no shared source of truth for payments. Approach: Next.js 16 + Supabase Auth + Postgres + React Query. Challenges: role isolation, payment state transitions, rollback.

**Sahnaf** — Problem: commerce + solar services need one platform. Approach: Next.js + Drizzle + Neon + NextAuth + ImageKit. Challenges: calculator assumptions, upload auth, admin CRUD.

**Nomad** — Problem: no real coding environment on mobile. Approach: Expo + React Native + Monaco + isomorphic-git + Zustand. Challenges: filesystem access, Git operations, search indexing.

## Definition of done

- [ ] Every project card links to a real live URL or a real repo — nothing points to `#`.
- [ ] Manhaj and Aqua case studies are written before the site is sent to anyone.
- [ ] Lighthouse 90+ across the board, LCP < 1.0s, CLS < 0.05 (see `Design.md` → Performance).
- [ ] Mobile pass on 375px width minimum, no horizontal scroll, no clipped text.
- [ ] Dark mode is default; light mode toggle works if built.
- [ ] Zero emoji, zero skill bars, zero particle backgrounds, zero fake metrics.
