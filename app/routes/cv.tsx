import { Link } from "react-router";
import { ArrowLeft, Download, Mail, MapPin, Github } from "lucide-react";
import { m } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { experience } from "../../data/experience";
import { projects } from "../../data/projects";
import { downloadCV } from "../../lib/generateCV";

const techList =
  "React · Next.js · TypeScript · Tailwind · Supabase · Firebase · Drizzle ORM · Rust · Axum · Tauri · Node.js · PostgreSQL · Git · Vercel · PWA";

export default function CVPage() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full flex-1 overflow-hidden">
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={12} /> Back to Home
          </Link>
        </div>

        <section className="mx-auto w-full max-w-[1100px] px-6 pt-8 pb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">Curriculum Vitae</h1>
              <p className="mt-2 max-w-[560px] text-sm text-[var(--text-secondary)]">
                Download as PDF — generated in the browser with <span className="font-mono text-xs text-[var(--text-muted)]">jspdf</span> (no server, no static file). Preview below is the same content the PDF renders.
              </p>
            </div>
            <button
              onClick={downloadCV}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              <Download size={16} /> Download PDF
            </button>
          </div>
        </section>

        {/* Paper preview — light paper per Design light-mode tokens, distinct from warm-dark shell */}
        <section className="mx-auto w-full max-w-[800px] px-6 pb-16">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border border-[#e8e4df]/20 bg-[#f7f5f2] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] md:p-10"
          >
            {/* Header */}
            <div className="border-b border-[#e8e4df]/30 pb-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[#1a1918]">Abdulazeez Badmus</h2>
              <p className="mt-1 text-sm text-[#6b6660]">React Developer · Full Stack Engineer · Abu Abdirrahman</p>
              <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[#9a9590]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c2785c]" /> Building products that serve communities. · Currently: React Dev @ Manaknight
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[#6b6660]">
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={12} /> abdulazeezadekiilekun@gmail.com
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Github size={12} /> github.com/abuAbdur-rahman
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} /> Ilorin, Nigeria
                </span>
              </div>
            </div>

            {/* Experience */}
            <div className="mt-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#c2785c]">Experience</h3>
              <div className="mt-1 h-px w-20 bg-[#c2785c] opacity-60" />
              <div className="mt-4 space-y-5">
                {experience.map((exp) => (
                  <div key={exp.role + exp.company} className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-[#1a1918]">
                        {exp.role} — {exp.company}
                      </span>
                      <span className="font-mono text-xs text-[#9a9590]">{exp.period}</span>
                    </div>
                    {exp.description && <p className="pl-2 text-sm leading-relaxed text-[#6b6660]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Work */}
            <div className="mt-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#c2785c]">Selected Work</h3>
              <div className="mt-1 h-px w-20 bg-[#c2785c] opacity-60" />
              <div className="mt-4 space-y-4">
                {projects.slice(0, 6).map((p) => (
                  <div key={p.slug} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-[#1a1918]">
                        {p.number} / {p.title} — {p.label.toLowerCase()}
                      </span>
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${p.status === "live" ? "text-[#7c9a6b]" : "text-[#c2785c]"}`}>
                        {p.status === "live" ? "Live" : "In Progress"}
                      </span>
                    </div>
                    <p className="pl-2 text-sm leading-relaxed text-[#6b6660]">{p.tagline}</p>
                    <p className="pl-2 font-mono text-xs text-[#9a9590]">{p.tech.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div className="mt-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#c2785c]">Stack</h3>
              <div className="mt-1 h-px w-20 bg-[#c2785c] opacity-60" />
              <p className="mt-3 text-sm leading-relaxed text-[#6b6660]">{techList}</p>
              <p className="mt-2 font-mono text-xs text-[#9a9590]">Currently learning: Rust internals (smart pointers, async) · System design</p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#e8e4df]/30 pt-4 font-mono text-xs text-[#9a9590]">
              <span>abdulazeez.dev · abu ·</span>
              <span>Page 1</span>
            </div>
          </m.div>

          <p className="mt-4 text-center font-mono text-xs text-[var(--text-muted)]">
            This preview is rendered with Tailwind; the PDF is drawn with <span className="text-[var(--text-secondary)]">jspdf</span> using the same tokens — off-white <code>#f7f5f2</code>, charcoal, terracotta accent. No static PDF — generates in-browser on click.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
