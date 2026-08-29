# brand/LOGO.md

> Reference for any agent placing the logo in code. Read this before importing a file from `brand/` — the four variants are not interchangeable, and picking the wrong one is an easy mistake to make silently (it'll render, just wrong).

## The four files

| File | Contains | Background | Use when |
|---|---|---|---|
| `logo-mark.svg` | Icon only — "A" monogram, terracotta crossbar | Transparent | Placed on a surface you already control the color of (e.g. inside a `--bg-primary` nav, inside a card) |
| `logo-mark-tile.svg` | Icon + rounded surface tile (`--bg-surface` fill, `--border` stroke) | Opaque, baked in | Favicon, browser tab icon, OS app icon, anywhere the file will sit on an *unknown* background (a bookmarks bar, a taskbar, a social-share preview) |
| `logo-wordmark.svg` | `abu` text + accent dot | Transparent | Nav bar, footer, anywhere text-only branding fits and the mark would be redundant |
| `logo-lockup.svg` | Mark + wordmark, horizontal | Transparent | Larger header contexts, README badges, anywhere both the icon and the name should appear together |

## Decision rule (for an agent choosing without being told which one)

```
Is this going in a context where you don't control the background color?
 └─ Yes → logo-mark-tile.svg (it carries its own background)
 └─ No, background is already --bg-primary or --bg-surface →
     Is there room for text, and is this a first-impression / header context?
      └─ Yes → logo-lockup.svg
      └─ No, icon-only slot (small nav corner, avatar) → logo-mark.svg
      └─ No, text-only slot (footer copyright line, plain nav) → logo-wordmark.svg
```

**Never** use `logo-mark.svg` (transparent) where the background isn't guaranteed dark — the glyph is `#e8e4df` (near-white), it disappears on light surfaces. If a light-mode context is possible, that's a signal this decision needs a human, not a default pick — flag it rather than guessing a recolor.

## What differentiates them technically

- **Color source:** all four pull directly from `Design.md` §2 tokens — `#e8e4df` (`--text-primary`), `#c2785c` (`--accent`), `#1a1918`/`#2a2928` (`--bg-surface`/`--border`, tile only). Don't hand-edit these hex values in place; if the token changes in `Design.md`, regenerate the SVGs from the token, don't patch four files independently.
- **The recurring signature element:** every variant carries exactly one terracotta accent — the mark's crossbar, or the wordmark's dot. This is intentional (see `Design.md` §1.2, "one accent, used sparingly") — don't add a second accent-colored element to any variant, and don't recolor the accent per-context (no blue variant for a "professional" context, no sage variant for a "success" context — the accent is brand-fixed).
- **Geometry, not font glyphs:** `logo-mark.svg`'s "A" is hand-drawn paths (two strokes + a crossbar), not an outlined font character — it will render identically anywhere SVG renders, no font dependency.
- **Font dependency (wordmark and lockup only):** `logo-wordmark.svg` and `logo-lockup.svg` use live `<text>` set in Inter. Inside the site this is fine (Inter is already loaded per `Design.md` §3). Outside the site — a raw file preview, an OS that doesn't have Inter — it falls back to a system sans-serif and the accent dot's x-position (hand-tuned against real Inter metrics) may sit slightly off. If a variant needs to be portable outside a context with Inter loaded (e.g. embedded in a PDF, a GitHub README where font-loading isn't guaranteed), outline the text to paths first — don't ship the live-text version into a context you don't control the fonts of.
- **Not resizable non-uniformly.** All four have a fixed `viewBox` aspect ratio — scale width and height together. Stretching to fit a container breaks the crossbar/dot geometry, which was hand-placed at specific coordinates, not proportionally derived.

## What NOT to do with any variant

- Don't recolor the accent (crossbar or dot) to anything other than `#c2785c`.
- Don't add a drop shadow, glow, or gradient — flat fills only, per `Design.md`'s neo-minimalism direction.
- Don't crop or reposition the tile's rounded-rect radius independently of the icon inside it — they were sized together (`rx="14"` matches the icon's proportions at that specific tile size).
- Don't use `logo-mark-tile.svg` inside a card or section that's already `--bg-surface` — the tile becomes a barely-visible box-on-box; use `logo-mark.svg` (transparent) there instead.

## If a fifth context comes up that none of these four fit

Don't generate a new variant by improvising (e.g., a monochrome/single-color version for print, a horizontally-compressed version for a tight header slot). Flag it back to the user — logo geometry changes are a design decision, not an engineering one, and belong in `Design.md` before a fifth file gets added here.
