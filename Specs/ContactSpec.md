# ContactSpec.md

`routes/contact.tsx` — static shell; form itself is a client component for controlled inputs + submit state.

## Purpose

Give a recruiter or client two paths to reach out — form or direct socials — with zero friction. This page converts intent into an actual message; it should not introduce any doubt about whether the form works.

## Structure

Two-column on `md+`, stacked on mobile:

```
┌──────────────────┬──────────────────────┐
│  Left: context +  │  Right: form          │
│  direct links      │                       │
│                    │  [Name]               │
│  "Have a project   │  [Email]              │
│  in mind? Or just  │  [Message]            │
│  want to say hi?"  │  [Send Message →]     │
│                    │                       │
│  Mail   email      │                       │
│  GitHub github      │                       │
│  LinkedIn in        │                       │
│  X       twitter    │                       │
│  MapPin  location    │                       │
└──────────────────┴──────────────────────┘
```

## Copy

| Element | Copy |
|---|---|
| Header | `Get in Touch` |
| Framing line | `Have a project in mind? Or just want to say hi.` |
| Availability line | `Freelancer · Open to remote work` (pull from the same status source as Home's "Currently" line — don't let these drift out of sync) |

## Form fields

- `Name` — text, required.
- `Email` — email, required, validated client-side (format) and server-side.
- `Message` — textarea, required, min length ~10 chars to avoid empty submissions.
- Submit button: `Send Message →`, disabled state while submitting, success/error state shown inline (not a redirect to a separate "thank you" page — keep the loop tight).

## Submission handling

- Backend: Resend, via `api/contact.ts` (standalone Vercel Function). The client-side form `fetch()`es this endpoint.
- On success: inline confirmation message replacing the form (or above it) — e.g., "Thanks — I'll get back to you soon." No page navigation.
- On error: inline error message, form state preserved (don't clear the user's typed message on failure).
- Basic spam mitigation: honeypot field (invisible to real users) is sufficient — no need for a CAPTCHA widget, which would add a dependency and hurt performance for marginal benefit at this traffic scale.

## Direct links (left column)

Icons per `Design.md` §5:

| Item | Icon | Notes |
|---|---|---|
| Email | `Mail` (lucide) | `mailto:` link, also copy-to-clipboard on click if easy to add |
| GitHub | `SiGithub` (simple-icons) | opens profile in new tab |
| LinkedIn | `SiLinkedin` | opens profile in new tab |
| X | `SiX` | opens profile in new tab |
| Location | `MapPin` (lucide) | text only, no map embed — "Ilorin, Nigeria" or current city, not a Google Maps iframe (unnecessary weight) |

## Layout notes

- Form and context column are visually balanced — neither should feel like an afterthought.
- Labels are real `<label>` elements associated with inputs (see `Agents.md` §5 accessibility gate), not placeholder-only fields.
- Focus states on all inputs use `--accent` per `Design.md` §10.

## Motion

Minimal — this page benefits from feeling stable and trustworthy, not lively. Scroll-reveal on initial load only if the page requires scrolling on the target viewport; on most desktop sizes this page fits in one viewport and doesn't need scroll-triggered animation at all.

## Responsive behavior

- **375px:** single column, context block above form, availability line wraps cleanly.
- **768px+:** two-column layout as shown above.

## Explicitly out of scope

- No live chat widget, no calendar-booking embed unless explicitly requested later — keep this page dependency-free and fast.
