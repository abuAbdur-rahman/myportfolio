# AboutSpec.md

`routes/about.tsx` — static by default.

## Purpose

The 10-second layer for "is this a real person with a real trajectory" — short bio, a real timeline, an honest tech list. Not a life story.

## Structure

```
1. Navbar
2. Header — "About"
3. Bio block — photo + 2–3 sentence bio, side by side on md+
4. Experience timeline
5. "What I Work With" — tech list
6. "Currently Learning" — tech list (small, honest)
7. Download CV button
8. Footer
```

## Copy

**Bio (2–3 sentences max):**
> Self-taught since 2021. Shipped production systems end-to-end at Doorite, then stepped back to go deep on React craft at Manaknight. Now freelancing — building products for clients, and for myself.

Adjust tense/wording as roles change, but keep the "stepped back to specialize" framing from `Plan.md` — it reframes the Doorite → Manaknight move as intentional depth, not a step down.

**Experience timeline** (source: `data/experience.ts`, chronological, most recent first or first-to-current — pick one and match the visual order to the Home hero's "Currently" line):

| Period | Role | Company |
|---|---|---|
| 2026 – Current | Freelancer | Independent |
| 2026 | React Developer | Manaknight |
| 2025–2026 | Full Stack Engineer | Doorite |
| 2024–2025 | Developer | Sanfaani |
| 2021 | Started coding, self-taught | — |

Each entry: `Calendar` icon (lucide) + period, `Building2` icon + company, role as the visual emphasis (H3 weight), one optional line of what was owned there (e.g., Doorite → "Shipped production systems, owned features end-to-end").

**What I Work With** (plain text list, not tag pills, not a grid with icons — per `Design.md` §12 "Tech Stack Display," simple text list wins for this context):
> React · Next.js · TypeScript · Tailwind · Supabase · Firebase · Drizzle ORM · Rust · Axum · Tauri · Node.js · PostgreSQL · Git · Vercel · PWA

(Rust/Axum/Tauri added to reflect the Aqua project — don't list a stack item here that isn't actually demonstrated in a linked project.)

**Currently Learning:**
> Rust internals (smart pointers, async) · System design

## Layout notes

- Photo: real photo, square or portrait crop, `<img>` with explicit `width`/`height`. If no photo is ready, omit the slot entirely rather than using a placeholder avatar — an empty state reads better than a generic silhouette icon here.
- Timeline: vertical list on mobile, can use a left-rule/connector line on desktop if it doesn't add complexity — a plain stacked list is acceptable and matches the "no over-engineering" principle.
- Tech list: wraps naturally, separated by `·` (middle dot), sans font — this is prose, not a badge grid.

## Motion

Scroll-reveal on section entry, same as other pages. No stagger needed on the tech list (it's one text block, not discrete cards).

## Responsive behavior

- **375px:** bio stacks (photo above text if present), timeline single column, tech list wraps normally.
- **768px+:** bio side-by-side, timeline can gain a connector line.

## Explicitly out of scope

- No skill percentage bars, no proficiency ratings — banned per `Plan.md` and `Design.md` across the entire site, About included.
- No "hobbies" or personal-life section beyond what's already in the bio — keep this page tight.
