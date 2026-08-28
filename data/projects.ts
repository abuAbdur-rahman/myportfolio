export interface Project {
  slug: string;
  number: string;
  label: string;
  title: string;
  tagline: string;
  tech: string[];
  status: "live" | "in-progress";
  featured: boolean;
  liveUrl: string | null;
  sourceUrl: string | null;
}

export const projects: Project[] = [
  {
    slug: "manhaj",
    number: "01",
    label: "PRODUCT ENGINEERING",
    title: "Manhaj",
    tagline: "Curated offline audio library for Nigerian scholars.",
    tech: ["Next.js", "Supabase", "Cloudflare R2", "PWA"],
    status: "live",
    featured: true,
    liveUrl: "https://manhaj-sunnah.vercel.app",
    sourceUrl: "https://github.com/abuAbdur-rahman/manhaj",
  },
  {
    slug: "aqua",
    number: "02",
    label: "SYSTEMS ENGINEERING",
    title: "Aqua",
    tagline:
      "A native macOS-mannered desktop for WSL Ubuntu — Finder, Terminal, Editor, Spotlight, Spaces — driven by a Rust/Axum daemon.",
    tech: ["Tauri", "Rust", "Axum", "React", "TypeScript", "WebSocket", "WSL2", "Monaco"],
    status: "in-progress",
    featured: true,
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/aqua",
  },
  {
    slug: "veridex",
    number: "03",
    label: "AI TOOLING",
    title: "Veridex",
    tagline: "QA tracker + MCP server for AI agents.",
    tech: ["React 19", "Vite", "TanStack Router", "TanStack Query", "MCP"],
    status: "in-progress",
    featured: false,
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/veridex",
  },
  {
    slug: "rentledger",
    number: "04",
    label: "FINTECH",
    title: "RentLedger",
    tagline: "Shared rent payment tracking for landlords and tenants.",
    tech: ["Next.js", "Supabase Auth", "Postgres", "React Query"],
    status: "live",
    featured: false,
    liveUrl: "https://rentledger-xi.vercel.app/",
    sourceUrl: "https://github.com/abuAbdur-rahman/rentledger",
  },
  {
    slug: "sahnaf",
    number: "05",
    label: "COMMERCE",
    title: "Sahnaf",
    tagline: "Commerce + solar services platform with domain calculator.",
    tech: ["Next.js", "Drizzle", "Neon", "NextAuth", "ImageKit"],
    status: "live",
    featured: false,
    liveUrl: "https://sahnaf.vercel.app",
    sourceUrl: "https://github.com/abuAbdur-rahman/sahnaf",
  },
  {
    slug: "nomad",
    number: "06",
    label: "MOBILE",
    title: "Nomad",
    tagline: "Full coding environment on mobile — filesystem, Git, editor.",
    tech: ["Expo", "React Native", "Monaco", "isomorphic-git", "Zustand"],
    status: "in-progress",
    featured: false,
    liveUrl: null,
    sourceUrl: "https://github.com/abuAbdur-rahman/nomad",
  },
];
