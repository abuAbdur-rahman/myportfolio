export interface Phase {
  id: string;
  title: string;
  content: string;
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface Metric {
  value: string;
  label: string;
  verified: boolean;
}

export interface CaseStudy {
  slug: string;
  number: string;
  label: string;
  title: string;
  tagline: string;
  tech: string[];
  status: "live" | "in-progress";
  liveUrl: string | null;
  sourceUrl: string | null;
  role: string;
  timeline: string;
  heroNote?: string;
  phases: {
    overview: string;
    problem: string;
    goals: string[];
    discovery: string;
    ideation: string;
    architecture: string;
    challenges: Challenge[];
    testing: string;
    metrics: Metric[];
    retrospective: string;
  };
}

export const caseStudies: Record<string, CaseStudy> = {
  manhaj: {
    slug: "manhaj",
    number: "01",
    label: "PRODUCT ENGINEERING",
    title: "Manhaj",
    tagline: "Curated offline audio library for Nigerian scholars — reliable playback without a stable connection.",
    tech: ["Next.js", "Supabase", "Cloudflare R2", "PWA", "Supabase Auth", "RLS"],
    status: "live",
    liveUrl: "https://manhaj-sunnah.vercel.app",
    sourceUrl: "https://github.com/abuAbdur-rahman/manhaj",
    role: "Solo — product, frontend, backend, PWA",
    timeline: "2025",
    heroNote: "Full product surface: auth, RLS-scoped admin, offline PWA, Cloudflare R2 media.",
    phases: {
      overview:
        "Manhaj is a solo-built audio library for Nigerian Islamic scholars. I owned the full surface — Next.js frontend, Supabase Auth + RLS, Cloudflare R2 for audio storage, and a service worker for offline playback. Timeline was a single focused build in 2025, shipping directly to early listeners without a team handoff.",
      problem:
        "Reliable audio access for this audience was fragmented — links spread across channels, no consistent organization by scholar or series, and no offline path. On spotty connections, streaming failed mid-lesson and there was no resume. Admins needed a safe way to curate without exposing storage credentials.",
      goals: [
        "Sub-1s load on repeat visits via offline cache (service worker + Cache API, not just browser cache)",
        "500 MB upload ceiling validated client and server, with clear rejection before R2 PUT",
        "Scholar → series → track hierarchy navigable in under two taps on mobile",
        "Admin writes scoped by RLS — only explicitly allowed uids can create/update audio metadata",
      ],
      discovery:
        "I compared Firebase Storage vs R2 for per-object cost at the expected audio volume, and Supabase Storage vs R2 for range-request support. R2 won on egress cost and first-class Range support needed for offline playback. Service worker strategies were prototyped as stale-while-revalidate for app shell + cache-first for audio ranges, tested against actual 30-50 MB files on a throttled 3G profile.",
      ideation:
        "Early sketch kept audio as direct R2 public URLs. Discarded because it leaked bucket structure and made revocation hard. Moved to signed delivery via the Next.js layer with short-lived URLs, keeping the bucket private. Considered an audio-specific CDN with HLS segmentation, discarded as overbuild for the initial catalog size — single-file range requests were sufficient and kept the offline cache simple (one file per track).",
      architecture:
        "Next.js (App Router) for routing and server actions, Supabase for auth and Postgres with RLS policies scoping `audio_tracks` and `scholars` writes to an allowlist, Cloudflare R2 for the audio objects (private bucket, presigned GET), and a service worker that caches app shell + audio ranges. Playback uses HTMLAudioElement with byte-range support so seek works offline; the service worker intercepts Range requests and serves from Cache API when present, falling back to network. Upload path validates MIME + size (500 MB) before initiating a multipart PUT to R2, then writes metadata to Postgres only on success — no orphan rows.",
      challenges: [
        {
          title: "500 MB upload validation without a bad UX",
          problem: "Large audio files failed late — after a long upload — because validation only happened server-side after bytes were already transferred.",
          solution: "Added client-side preflight (File.size + MIME sniff) with an immediate rejection toast, then server-side re-validation on the API route before the R2 PUT. Both layers share the same constants so the cap can't drift. Users see a failure in <100 ms for oversized files, not after minutes.",
        },
        {
          title: "Offline playback with Range requests",
          problem: "Simply caching audio files wasn't enough — seek (Range: bytes=...) missed the cache and re-hit the network, breaking offline scrub.",
          solution: "Service worker now handles Range requests explicitly: on intercept it looks up the full file in Cache API, slices the requested byte window, and returns a 206 with correct Content-Range. Verified on Chrome and Safari with Services pane throttled to offline — scrub works without network after one full play.",
        },
        {
          title: "RLS-scoped admin without a custom auth server",
          problem: "Needed an admin who could curate scholars/tracks without giving them storage keys, and without rolling a separate permission service.",
          solution: "Supabase RLS policies: reads are public, writes require `auth.uid() IN (select uid from admin_allowlist)`. Admin UI is a single `/admin` route gated by the same check; the R2 write is server-only via an API route that checks session before signing the PUT. No keys ever reach the browser.",
        },
      ],
      testing:
        "Manual QA on a real device with Network → Offline, plus throttled Fast 3G for first-play vs cached-play timing. Caught a bug where Safari's service worker update was delayed by a keep-alive connection — fixed by calling `registration.update()` on visibility change. Also verified the admin allowlist by attempting a direct Supabase insert from a non-admin session — correctly rejected with `42501`.",
      metrics: [
        { value: "TODO", label: "monthly listeners", verified: false },
        { value: "TODO", label: "avg. cached-play TTFB", verified: false },
        { value: "Live", label: "PWA installable, offline seek verified", verified: true },
      ],
      retrospective:
        "I'd extract the R2 upload flow into a shared utility earlier — the multipart boundary handling was duplicated once between the admin PUT and a backfill script. Also, the service worker's Range handling deserved a small integration test from day one; manual offline testing was thorough but slower than a mocked Cache API test would have been.",
    },
  },
  aqua: {
    slug: "aqua",
    number: "02",
    label: "SYSTEMS ENGINEERING",
    title: "Aqua",
    tagline: "A native macOS-mannered desktop for WSL Ubuntu — Finder, Terminal, Editor, Spotlight, Spaces — driven by a Rust/Axum daemon.",
    tech: ["Tauri", "Rust", "Axum", "React", "TypeScript", "WebSocket", "WSL2", "Monaco"],
    status: "in-progress",
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/aqua",
    role: "Solo — Tauri host (Windows) + Rust/Axum daemon (WSL), shared CONTRACT.md",
    timeline: "2025 — present",
    heroNote: "Tauri host owns everything visible; Rust/Axum daemon on 127.0.0.1:61234 owns everything real. Two independently-buildable clones, one contract.",
    phases: {
      overview:
        "Aqua gives WSL Ubuntu a real, daily-driver desktop that looks and behaves like macOS — Finder, Terminal, Activity Monitor, Monaco editor, Spotlight with a global hotkey, and Spaces/Mission Control. A Tauri host on Windows owns every pixel; a Rust/Axum daemon inside WSL, bound to 127.0.0.1:61234, owns filesystem, processes, and shell. The two sides share one contract (CONTRACT.md) and are built as two independently-buildable, cloned-on-each-OS workstreams with their own AGENTS.md and PLAN.md.",
      problem:
        "WSL Ubuntu has no cohesive desktop that feels native rather than “terminal plus raw Explorer.” The default experience stitches Windows Explorer to a headless distro — no Finder-grade file operations, no Spotlight, no Spaces, no Activity Monitor, and a terminal that isn't PTY-backed. The gap wasn't tooling, it was product.",
      goals: [
        "Feel like macOS, not a skin — Finder column behavior, Terminal PTY fidelity, Spotlight global hotkey verified end-to-end from the native app",
        "One contract between host and daemon — every IPC path, event, and error shape in CONTRACT.md, enforced in both crates",
        "Two clones, no shared mount — Cargo/Vite are markedly slower over \\\\wsl.localhost\\; each side builds natively on its own OS",
        "Shippable increments behind phase gates — Backend Phase 5 (persistence) gates App Phase 8 (polish); nothing ships with a mocked IPC shape",
      ],
      discovery:
        "Evaluated WSLg + Linux desktop via RDP vs a native Windows host driving WSL. WSLg added latency on window chrome and couldn't own global hotkeys reliably. A Tauri host on Windows could spawn and health-check the WSL daemon (via wsl.exe interop), own the window frame, and expose a single WebSocket surface. For the daemon, Axum was chosen over actix-web for simpler tower middleware composition around the WebSocket upgrades (/ws/pty/:sessionId, /ws/sysmon). No electron — binary size and cold-start budget ruled it out.",
      ideation:
        "Early prototype tried a shared folder mount for IPC JSON files; discarded for race conditions and slow metadata propagation. Moved to HTTP + WebSocket as the sole IPC — request/response for filesystem ops, persistent sockets for PTY and sysmon streaming. Considered embedding a Node sidecar in WSL; discarded because the daemon needed to own PTY without a JS runtime. CONTRACT.md was introduced to lock the shape before either side could drift.",
      architecture:
        "Tauri host (Windows, TypeScript + Rust glue) renders the desktop chrome, window manager, Finder, Terminal (xterm.js ↔ PTY), Monaco editor linked to Finder/Terminal, Spotlight UI, and Spaces. It spawns the WSL daemon and polls /health. The daemon (Rust + Axum, WSL Ubuntu, 127.0.0.1:61234) exposes REST for fs ops and WebSockets for PTY sessions (/ws/pty/:sessionId) and system monitor (/ws/sysmon). The IPC contract is the source of truth — every request path, WebSocket frame, and error code is in CONTRACT.md; CI checks that both sides stay aligned. Repo is split: backend/ and app/ each have their own PLAN.md and AGENTS.md, cloned once per OS, synced via git (not a shared mount).",
      challenges: [
        {
          title: "PTY-backed Terminal over WebSocket",
          problem: "A faithful terminal needs a real PTY, not a spawned process piped to stdout — job control, resize, and signal handling break otherwise, and the PTY must survive WebSocket reconnects per session.",
          solution: "Daemon allocates a PTY per /ws/pty/:sessionId, bridges it to the socket with backpressure-aware forwarding, and propagates resize (COLUMNS/LINES) as a structured frame. The host maps xterm.js resize to the same frame. Sessions are keyed by :sessionId so a dropped socket can reattach without killing the PTY.",
        },
        {
          title: "Live Activity Monitor streaming (/ws/sysmon)",
          problem: "Polling process stats from the host would jitter and miss short-lived processes; push needed to feel live without flooding the socket.",
          solution: "Daemon samples /proc at a fixed cadence, diffs against the previous snapshot, and streams a compact delta over /ws/sysmon. Host throttles render to rAF and virtualizes the row list, so 200+ processes don't thrash layout.",
        },
        {
          title: "Spotlight global hotkey + debounced search, verified end-to-end",
          problem: "Spotlight needed a system-wide hotkey (Ctrl+Shift+Space) that works from the native Windows app, not just from WSL, and a search backend that doesn't hammer the filesystem on every keystroke.",
          solution: "Tauri registers the global hotkey at the OS level and toggles the overlay; the overlay debounces input and hits a daemon search endpoint that walks with a bounded walker and returns ranked hits. The full chord was verified end-to-end from the built Tauri binary on Windows, not just from an in-WSL test — the hotkey arrives before the overlay renders, and the first keystroke after open hits the debounced path.",
        },
        {
          title: "Spaces / Mission Control with drag-to-migrate window state",
          problem: "Window state lived only in the host; dragging a window card between Spaces needed a single source of truth so the daemon and host wouldn't desync on which Space owns a window.",
          solution: "Window → Space ownership is a host-owned state machine with an explicit migrate event. Drag cards emit a migrate payload, the host reassigns, and the window chrome re-parents without remounting the underlying WebSocket sessions (PTY/sysmon stay attached to windowId, not spaceId).",
        },
      ],
      testing:
        "Daemon side: cargo fmt, Clippy, and crate tests on every PR (protected master, required review). App side: pnpm test, pnpm build, cargo check (Tauri) on CI. Manual verification for the hotkey path (built .msi on Windows, Ctrl+Shift+Space from desktop, Spotlight appears, first query debounces). PTY sessions were tested against bash, zsh, and raw sh with resize and SIGINT propagation; sysmon was verified against htop sampling at similar cadence.",
      metrics: [
        { value: "Backend 0–4", label: "phases complete & verified", verified: true },
        { value: "App 0–7", label: "phases complete (Spotlight + Spaces)", verified: true },
        { value: "Phase 8", label: "in progress — persistence/polish, gated on Backend 5", verified: true },
      ],
      retrospective:
        "The two-repo/two-agent split with a locked CONTRACT.md added coordination overhead (two PLAN.md files to keep in sync) but prevented the classic drift where the UI mocks an IPC shape the daemon never implements. I'd add a contract-level integration test that boots the daemon and drives the Tauri host's fetch layer against it earlier — the manual health-check script caught shape mismatches, but a CI job would have caught them faster. Protected master with required review also slowed solo iteration slightly, but it kept the repo shippable while context-switching between Windows and WSL clones.",
    },
  },
  veridex: {
    slug: "veridex",
    number: "03",
    label: "AI TOOLING",
    title: "Veridex",
    tagline: "QA tracker + MCP server — so AI agents can operate the issue tracker directly.",
    tech: ["React 19", "Vite", "TanStack Router", "TanStack Query", "MCP"],
    status: "in-progress",
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/veridex",
    role: "Solo — client work, MCP surface design",
    timeline: "2025 — present",
    heroNote: "Live client work — patterns over proprietary detail. Role-based views + agent-operable tool surface.",
    phases: {
      overview:
        "Veridex moves QA and issue tracking out of spreadsheets into a tracker that both humans and AI agents can operate. React 19 + Vite frontend with TanStack Router/Query, plus an MCP server exposing the tracker as tools an agent can call directly. Current client work — shareable patterns only.",
      problem:
        "QA state lived in spreadsheets — no history, no role isolation, and invisible to the agents that were increasingly part of the workflow. Agents couldn't file, triage, or query issues without a human copy-pasting.",
      goals: ["Role-based views (human QA vs agent) from the same source of truth", "MCP tool surface that is idempotent and auditable", "Drag-and-drop state transitions without optimistic drift"],
      discovery:
        "Evaluated exposing the tracker as a REST API wrapped by the MCP server vs implementing MCP tools directly against the data layer. Direct tools won for fewer hops and clearer error shapes. For the frontend, TanStack Query was chosen over a global store for per-query caching around the MCP-backed source.",
      ideation:
        "Early sketch exposed CRUD as generic MCP tools; discarded because generic tools encouraged the agent to improvise workflows. Narrowed to task-scoped tools (file issue, triage, query by status) that enforce the intended QA flow.",
      architecture:
        "Vite + React 19 frontend (TanStack Router for route state, TanStack Query for server state) talking to the tracker store. MCP server sits alongside, exposing a curated tool set — each tool validates input against the same schema the UI uses. Role checks are enforced server-side so the UI and the agent see the same permission boundary.",
      challenges: [
        { title: "Drag-and-drop vs source of truth", problem: "Optimistic reorder could diverge from the persisted order on a failed write.", solution: "Write-through with rollback: reorder commits locally only after the mutation ack; on failure the list snaps back and surfaces the error inline." },
        { title: "MCP surface design", problem: "Too generic and the agent invents workflows; too narrow and it can't complete real tasks.", solution: "Scoped tools around QA verbs (triage, assign, query) with strict schemas and human-readable error messages that guide the next call." },
      ],
      testing: "Manual QA pass with role switching (QA vs viewer) and an agent-driven smoke run filing and querying issues via the MCP server. No synthetic user metrics yet.",
      metrics: [
        { value: "In build", label: "agent smoke run passes", verified: true },
        { value: "TODO", label: "p50 tool latency", verified: false },
      ],
      retrospective: "I'd version the MCP tool schemas from day one — a breaking param rename mid-client-work forced a coordinated update on the agent side.",
    },
  },
  rentledger: {
    slug: "rentledger",
    number: "04",
    label: "FINTECH",
    title: "RentLedger",
    tagline: "Shared rent payment tracking — one source of truth for landlords and tenants.",
    tech: ["Next.js", "Supabase Auth", "Postgres", "React Query"],
    status: "live",
    liveUrl: "https://rentledger-xi.vercel.app/",
    sourceUrl: "https://github.com/abuAbdur-rahman/rentledger",
    role: "Solo — auth, RLS, payment state",
    timeline: "2024",
    heroNote: "Role isolation, payment state machine, and rollback on failure — the trust workflow.",
    phases: {
      overview: "RentLedger gives landlords and tenants a shared payment ledger. Next.js + Supabase Auth + Postgres + React Query, with role-scoped rows and an explicit payment state machine.",
      problem: "Off-ledger rent tracking meant disputes about what was paid and when — no shared history, no role boundary, no rollback when a payment record was entered in error.",
      goals: ["Landlord ↔ tenant views are isolated by RLS — neither sees the other's private notes", "Payment states are explicit (pending → confirmed → reversed) with an audit trail", "Rollback is a real operation, not a delete that loses history"],
      discovery: "Chose Supabase Auth + Postgres RLS over a custom auth service to keep the trust boundary in the database, not the API layer. React Query over SWR for mutation-aware cache invalidation around payment writes.",
      ideation: "Considered a ledger-as-event-log vs a mutable row with status. Chose status + history table — simpler for the initial product while preserving an append-only audit trail via a history trigger.",
      architecture: "Next.js frontend, Supabase Auth (email), Postgres with RLS policies partitioning rows by landlord_id / tenant_id, React Query for fetch/mutate. Payments table has a status enum and a separate payment_history table populated by a Postgres trigger on every status change.",
      challenges: [
        { title: "Role isolation without leaking IDs", problem: "Client-side filtering would still ship the other party's rows to the browser.", solution: "All filtering in RLS — queries without the correct auth.uid() return zero rows, not filtered rows. Verified by attempting a direct select as the wrong role." },
        { title: "Payment state + rollback", problem: "Reversing a confirmed payment by deleting the row destroyed the audit trail.", solution: "Reversal is a status transition (confirmed → reversed) that appends to history; the ledger always shows the reversal as an event, not a disappearance." },
      ],
      testing: "Seeded two users (landlord, tenant) and walked the full lifecycle: create → pending → confirmed → reversed, verifying RLS at each step and that history grew monotonically.",
      metrics: [
        { value: "Live", label: "RLS & state machine verified", verified: true },
        { value: "TODO", label: "active tenancies", verified: false },
      ],
      retrospective: "I'd model due dates as a separate schedule table from day one — recurring rent was squeezed into the payment row and the logic is harder to extend.",
    },
  },
  sahnaf: {
    slug: "sahnaf",
    number: "05",
    label: "COMMERCE",
    title: "Sahnaf",
    tagline: "Commerce + solar services — one platform, plus a domain calculator and admin back office.",
    tech: ["Next.js", "Drizzle", "Neon", "NextAuth", "ImageKit"],
    status: "live",
    liveUrl: "https://sahnaf.vercel.app",
    sourceUrl: "https://github.com/abuAbdur-rahman/sahnaf",
    role: "Solo — commerce, calculator, admin CRUD",
    timeline: "2024",
    heroNote: "Calculator assumptions documented, upload auth enforced, admin is a real back office, not a JSON editor.",
    phases: {
      overview: "Sahnaf is a commerce + solar services platform. Next.js + Drizzle + Neon + NextAuth, ImageKit for media, with a domain calculator and an admin back office for catalog operations.",
      problem: "Catalog, inquiries, and solar estimates lived in disconnected places — no single admin surface and the calculator's assumptions weren't documented, so quotes drifted.",
      goals: ["Calculator with explicit, editable assumptions (panel wattage, sun hours, loss factor)", "Image uploads authenticated — no anonymous PUT", "Admin CRUD that an ops person can use without touching the database"],
      discovery: "Picked Drizzle over Prisma for lighter query control around the calculator's domain logic, and Neon for serverless Postgres that fits the Next.js edge surface. ImageKit chosen for on-the-fly transforms vs storing multiple sizes.",
      ideation: "Early calculator was a single formula string; discarded because the assumptions were opaque. Broke it into named inputs with defaults and a results breakdown so the estimate is auditable, not magic.",
      architecture: "Next.js (server + client), Drizzle ORM over Neon Postgres, NextAuth for admin sessions, ImageKit for uploads/transforms. Calculator is pure domain logic with no I/O, tested in isolation; catalog reads are cached, writes invalidate.",
      challenges: [
        { title: "Calculator assumptions", problem: "Hard-coded constants produced a single number with no way to explain the estimate.", solution: "Exposed every constant as a labeled input with a default, and rendered the breakdown (daily kWh → panels → cost) so the result is traceable." },
        { title: "Upload auth", problem: "Uploads went to a public endpoint and could be spammed.", solution: "Moved signing server-side behind NextAuth — the client gets a short-lived ImageKit auth token only after the session check." },
      ],
      testing: "Calculator unit tests around edge cases (zero sun hours, high loss factor) plus manual admin smoke (create → publish → unpublish product, verify storefront reflects it).",
      metrics: [
        { value: "Live", label: "calculator + admin verified", verified: true },
        { value: "TODO", label: "catalog size", verified: false },
      ],
      retrospective: "I'd add a small admin audit log — who changed what product field when — the back office currently shows the current state but not the edit trail.",
    },
  },
  nomad: {
    slug: "nomad",
    number: "06",
    label: "MOBILE",
    title: "Nomad",
    tagline: "A coding environment on mobile — filesystem, Git, editor.",
    tech: ["Expo", "React Native", "Monaco", "isomorphic-git", "Zustand"],
    status: "in-progress",
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/nomad",
    role: "Solo — mobile filesystem, Git, editor internals",
    timeline: "2024 — present",
    heroNote: "No bundler tricks — real filesystem + isomorphic-git + Monaco on device.",
    phases: {
      overview: "Nomad is an on-device coding environment: filesystem access, Git operations via isomorphic-git, and a Monaco-based editor, all in Expo/React Native with Zustand for local state.",
      problem: "Mobile had no credible place to open a repo, edit, commit, and push — existing options were either view-only or required a cloud VM.",
      goals: ["Open a cloned repo's working tree on device", "Stage, commit, push via isomorphic-git without shelling out", "Full-text search indexing that doesn't block typing"],
      discovery: "Chose isomorphic-git over a native Git binding to stay in JS and keep the bundle portable across Expo's managed surface. Monaco via WebView was evaluated vs a native text component — Monaco won on language features. Zustand over Redux for minimal boilerplate around file + editor state.",
      ideation: "First sketch stored files in AsyncStorage per key; discarded for IO overhead on large repos. Moved to expo-file-system with a real directory tree mirroring the Git working tree, so isomorphic-git could operate on actual paths.",
      architecture: "Expo host, React Native UI, Monaco in a WebView bridge, isomorphic-git operating on the expo-file-system working tree, Zustand stores for open files / git status / search index. File reads are streamed, not fully buffered, to keep large files responsive.",
      challenges: [
        { title: "Filesystem access", problem: "Expo's FS is sandboxed and async — naive reads blocked the UI on large files.", solution: "Chunked reads with a loading skeleton, and a file-size guard that warns before opening files above a threshold." },
        { title: "Git via isomorphic-git", problem: "Git operations are CPU-heavy in JS and blocked the main thread.", solution: "Off-main-thread via a lightweight worker bridge for commit/status, with optimistic UI for stage." },
        { title: "Search indexing", problem: "Indexing the whole working tree on open froze typing.", solution: "Incremental indexer that walks in batches between frames, debounced after file writes." },
      ],
      testing: "Cloned a mid-size repo on device, edited, staged, committed, and pushed to a test remote. Verified that the working tree and .git directory survived an app restart.",
      metrics: [
        { value: "In progress", label: "commit/push on device verified", verified: true },
        { value: "TODO", label: "p50 file open", verified: false },
      ],
      retrospective: "I'd define the Git scope tighter sooner — full rebase/merge is a separate product from commit/push, and trying to cover both diluted the first milestone.",
    },
  },
};
