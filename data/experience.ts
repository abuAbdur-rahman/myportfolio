export interface Experience {
  period: string;
  role: string;
  company: string;
  description?: string;
}

export const experience: Experience[] = [
  {
    period: "2026 – Current",
    role: "Freelancer",
    company: "Independent",
    description: "Building products for clients, and for myself.",
  },
  {
    period: "2026",
    role: "React Developer",
    company: "Manaknight",
    description: "Deep React craft, component architecture, performance optimization.",
  },
  {
    period: "2025–2026",
    role: "Full Stack Engineer",
    company: "Doorite",
    description: "Shipped production systems, owned features end-to-end.",
  },
  {
    period: "2024–2025",
    role: "Developer",
    company: "Sanfaani",
    description: "Next.js, Firebase, Drizzle — building for African startups.",
  },
  {
    period: "2021",
    role: "Started coding, self-taught",
    company: "—",
  },
];
