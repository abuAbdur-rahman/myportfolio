# ProjectsSpec.md

`routes/projects.tsx` — static by default, all content sourced from `data/projects.ts`; this page renders data, it doesn't own copy.

## Purpose

The core page. A recruiter who clicks through from Home spends their ~30 seconds here deciding whether to click into a case study or bounce. Every project must justify its presence in under one sentence.

## Structure (top to bottom)

```
1. Navbar
2. Page header — "Selected Work" + one-line framing sentence
3. Featured row — Manhaj, Aqua (full-width or 2-col, screenshot included)
4. Divider
5. Card grid — Veridex, RentLedger, Sahnaf, Nomad (2-col on md+, 1-col mobile)
6. Footer
```

## Copy

| Element | Copy |
|---|---|
| Header | `Selected Work` |
| Sub-line | `Six products. Each one solves a real problem — or is honest about still being built.` |

(Sub-line count reflects 6 projects post-Aqua addition — keep this in sync if the project list changes.)

## Featured row — Manhaj + Aqua

Full treatment, in this order:

```
★ FEATURED ─────────────────────────────────────
┌──────────────────────────────────────────┐
│  [Screenshot, <img> with explicit width/height]  │
│  01 / Manhaj                              │
│  Curated offline audio library for        │
│  Nigerian scholars.                       │
│  Next.js · Supabase · Cloudflare R2 · PWA │
│  [Live]  [View Case Study →]  [Source]    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  [Screenshot or architecture diagram]     │
│  02 / Aqua                                │
│  macOS-style desktop shell over WSL,      │
│  driven by a Rust/Axum daemon.            │
│  Tauri · Rust · Axum · React · WebSocket  │
│  [In Progress]  [View Case Study →]  [Source] │
└──────────────────────────────────────────┘
```

**Aqua has no `liveUrl`** (it's a native Windows app, not something you demo via browser link) — its status badge reads `In Progress`, and instead of a `[Live]` link, show `[Source]` prominently plus a real screenshot. Never fabricate a "Live" badge for a desktop app that isn't packaged for distribution yet.

**Aqua screenshot:** real screenshots already exist at the repo root (`ui.png`, `ui-os.png`, `ui-window.png`, `ui-max.png`, `ui-dock-tight.png`, `ui-dock-wave.png`, `ui-fixed.png`) — pull one of these into `public/` rather than generating a new one. `ui-os.png` (Finder + Terminal with the Dock visible) reads well as a single representative shot for the card.

Screenshot fallback (Veridex, or any project without a screenshot yet): use a clean placeholder state (solid `--bg-surface` panel with the project name in mono, centered) rather than a stock image or a broken `<img>` — see `Agents.md` §4, never ship something that looks real but isn't.

## Card grid — Veridex, RentLedger, Sahnaf, Nomad

```
┌──────────────┐  ┌──────────────┐
│  [Screenshot] │  │  [Screenshot] │
│  03/Veridex   │  │  04/RentLedger│
│  QA tracker + │  │  Rent mgmt    │
│  MCP for AI   │  │  platform     │
│  agents       │  │               │
│  [In Progress]│  │  [Live]       │
│  [→] [<>]     │  │  [→] [<>]     │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│  05/Sahnaf    │  │  06/Nomad     │
│  Commerce +   │  │  Mobile IDE   │
│  solar        │  │               │
│  [Live]       │  │  [In Progress]│
│  [→] [<>]     │  │  [→] [<>]     │
└──────────────┘  └──────────────┘
```

Each card: number + name (mono), one-line tagline (sans), status badge (`Live` = `--accent-2` sage tint, `In Progress` = `--accent` terracotta tint — this is the one place status gets color, keep it consistent), tech tags (neutral mono pills, max 4 shown), case-study link (`→`) + source link (`<>`), both icon-only with accessible labels if space is tight on mobile.

## Status badge logic

Read `status` from `data/projects.ts` directly — don't let a card's badge drift from the underlying data:

```typescript
status === "live" → Badge: "Live" (sage tint)
status === "in-progress" → Badge: "In Progress" (terracotta tint)
```

If `liveUrl` is `null`, the card must never show a `[Live]` link regardless of the badge text — the badge communicates intent/status, the link communicates what's actually clickable. These can legitimately diverge (e.g., Aqua: badge "In Progress", no live link, but a working source link).

## Motion

Scroll-reveal per `Design.md` §6, staggered per card (~80ms offset) as each row enters viewport. Featured row animates once on entry, card grid staggers as the user scrolls to it.

## Responsive behavior

- **375px:** featured row stacks (screenshot above text), card grid becomes single column, tech tags wrap and truncate gracefully at 3 max visible + "+N" indicator if needed.
- **768px+:** card grid becomes 2 columns.
- **1024px+:** featured cards can go full-width with screenshot/text side-by-side.

## Explicitly out of scope

- No filtering/sorting UI — 6 projects doesn't need it, and it adds interaction surface for no benefit (violates `Design.md` §1.4).
- No inline case study content — cards link out only.
