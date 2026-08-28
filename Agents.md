# Agents.md

> Instructions for any AI agent (OpenCode, Claude Code, or otherwise) working in this repo. Read this before touching code. `Design.md` is the visual contract, `Plan.md` is the content contract, `Phases.md` is the build order, `Specs/*Spec.md` are per-page specs. This file is the engineering contract — how to work, not what to build.

## 0. Before you write a line

1. Read `Plan.md`, `Design.md`, and the relevant `Specs/*Spec.md` for the page you're touching.
2. If a spec is ambiguous, don't guess a new pattern — check `Design.md` §8 (Components) for the closest existing primitive and extend it.
3. Never invent a 6th page, a new color, or a new font. If something feels missing, flag it instead of improvising.

## 1. Stack (locked — don't substitute)

- React 19, React Router v8 (Framework Mode), TypeScript strict mode, Vite.
- Tailwind CSS v4.
- Framer Motion — scroll-reveal and page transitions only (see `Design.md` §6).
- shadcn/ui — `Button`, `Card`, `Badge`, `Input`/`Textarea` only. Do not `npx shadcn add` anything beyond this list without updating `Design.md` §8 first.
- `lucide-react` for UI icons, `@icons-pack/react-simple-icons` for brand icons. Never `react-icons`, never a raw emoji, never an inline SVG copy-pasted from elsewhere when a Lucide/Simple Icons equivalent exists.
- Resend for the contact form (via standalone Vercel serverless function `api/contact.ts` — not a framework-tied API route).
- Deployed on Vercel as a static build; final domain is custom, not `*.vercel.app`.

**Do not install:** particle/confetti libraries, chart libraries (no charts on this site), carousel libraries, any UI kit beyond the pruned shadcn set. If a task seems to need one of these, it's a sign the spec is being over-built — re-read `Design.md` §1.

## 2. File structure (don't reorganize without updating this doc)

```
portfolio/
├── app/
│   ├── root.tsx                 # layout shell, replaces app/layout.tsx
│   ├── routes.ts                # route config (or use flat-file routes/ convention)
│   ├── routes/
│   │   ├── home.tsx
│   │   ├── projects.tsx
│   │   ├── projects.$slug.tsx
│   │   ├── about.tsx
│   │   └── contact.tsx
│   └── app.css                  # design tokens live here, replaces globals.css
├── react-router.config.ts       # prerender: true + explicit slug list, replaces next.config
├── components/                  # unchanged
│   ├── layout/{navbar,footer}.tsx
│   ├── projects/{project-card,featured-project,case-study}.tsx
│   ├── ui/{button,card,badge,input}.tsx
│   └── theme-provider.tsx
├── data/                        # unchanged
│   ├── projects.ts
│   └── experience.ts
├── lib/utils.ts                 # unchanged
├── api/
│   └── contact.ts               # Vercel Function, replaces app/api/contact/route.ts
├── public/{favicon.svg,og-image.png,fonts/}
├── Specs/                     # page specs, source of truth for copy + layout
└── {Agents,Design,Plan,Phases}.md
```

## 3. Coding conventions

- **Components are plain React by default.** Reach for a loader (`clientLoader`/`loader`) to fetch data at route level rather than `useEffect` + local state, per React Router's data APIs. Keep components presentational and stateless where possible; route-level loaders own data, not component-level `useEffect`.
- **Data lives in `data/`, not inline in components.** `projects.ts` is the single source of truth for project metadata — components read from it, never hardcode a project's tagline or tech list inline.
- **One component, one responsibility.** A `ProjectCard` renders a card; it does not also fetch data, format dates, and manage global state.
- **No magic values.** Colors, spacing, and font sizes come from the tokens in `Design.md` §2–§4, wired through Tailwind config or CSS variables — never a one-off hex code in a component.
- **Comments are minimal.** Explain *why*, not *what* — the code should read clearly enough that a `// increments counter` comment is never needed. This matches the author's existing preference for concise, low-noise code.
- **TypeScript strict.** No `any` without a comment justifying it. Project data, case study content, and form payloads are all typed.

## 3.5 Source of truth for project facts

Project facts (status, stack, feature list, screenshots) are sourced from each project's own repo — pulled directly via GitHub, not reconstructed from memory. `Plan.md`'s Aqua entry was verified this way against `github.com/abuAbdur-rahman/aqua` (README, DESIGN.md, AGENTS.md, and real screenshots). Real screenshots from that pull are staged in `reference-assets/aqua/` — copy them into `public/` rather than regenerating. If a project's repo has moved on since this doc was written, re-pull before writing its case study — don't trust a stale summary over the live repo.

## 4. Content rules (applies to every page)

- **Never fabricate a metric.** If a number isn't verified, it's `[TODO — verify before send]` in the source file and rendered as a visibly-placeholder state in dev, never shipped to production looking like a real stat. See `Plan.md` → Non-negotiables.
- **Never ship a dead link.** Before marking a project `"live"` or `featured: true`, confirm the `liveUrl` and `sourceUrl` both resolve. A project without a working link ships with `liveUrl: null` and an honest "in progress" badge instead — see `Specs/ProjectsSpec.md`.
- **Zero emoji, zero skill bars, zero fake "80% React" progress meters** — anywhere in the codebase, including commit messages and code comments in case study MDX.
- **Case studies follow the 10-phase structure** in `Specs/CaseStudySpec.md`. Don't skip phases; if a phase genuinely doesn't apply (e.g., no formal "Testing & Iteration" phase happened), say that honestly rather than omitting the section.

## 5. Performance & accessibility gates

Every PR/change that touches a page must pass, before it's considered done:

- [ ] `pnpm build` (Vite) succeeds with no warnings — every `<img>` has explicit `width`/`height` (or `aspect-ratio` CSS) to prevent CLS, images are pre-optimized WebP/AVIF, and fonts are self-hosted with `font-display: swap`.
- [ ] Lighthouse (mobile, throttled) — Performance 90+, Accessibility 100 where feasible, no CLS from late-loading fonts/images.
- [ ] Keyboard-only pass: tab through the page, confirm every interactive element is reachable and has a visible focus state.
- [ ] `prefers-reduced-motion` respected — verify with the OS setting toggled, not just by reading the CSS.
- [ ] No new dependency added without checking `Design.md` §9 (Performance Budget) — if it adds meaningful bundle weight, justify it or find a lighter alternative.

## 6. Git / workflow conventions

- Commit messages: imperative mood, scoped (`feat(home): add hero status line`, `fix(contact): correct form validation copy`). No `wip`, no `asdf`, no unexplained one-word commits — this repo is one of the pinned repos and its commit history is part of the pitch (see `Plan.md` / `Design.md` context: engineering hiring managers read commit history as a signal).
- One logical change per commit. Don't bundle a copy fix with a dependency bump.
- Before a phase in `Phases.md` is marked complete, its acceptance criteria must all be checked — don't mark a phase done because time ran out.

## 7. When something in a spec conflicts with this file

`Design.md` and `Specs/*Spec.md` win on visual/content decisions. This file wins on engineering process (structure, conventions, gates). If a spec asks for something that breaks a locked stack choice or a performance gate (e.g., "add a particle background to the hero"), flag the conflict back to the user rather than silently complying — that request almost certainly contradicts `Plan.md`'s non-negotiables and should be confirmed, not assumed.
