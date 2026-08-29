import { Link, useParams, isRouteErrorResponse } from "react-router";
import { ArrowLeft, ExternalLink, Github, BookOpen, Calendar, Building2, AlertTriangle, CheckCircle2, TrendingUp, Code2 } from "lucide-react";
import { m } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { Badge } from "../../components/ui/badge";
import { caseStudies } from "../../data/caseStudies";
import { projects } from "../../data/projects";

const phaseNav = [
  { id: "overview", label: "1. Overview", icon: BookOpen },
  { id: "problem", label: "2. Problem" },
  { id: "goals", label: "3. Goals" },
  { id: "discovery", label: "4. Discovery" },
  { id: "ideation", label: "5. Ideation" },
  { id: "architecture", label: "6. Architecture", icon: Code2 },
  { id: "challenges", label: "7. Challenges", icon: AlertTriangle },
  { id: "testing", label: "8. Testing", icon: CheckCircle2 },
  { id: "results", label: "9. Results", icon: TrendingUp },
  { id: "retrospective", label: "10. Retrospective" },
];

export function loader() {
  return null;
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = slug ? caseStudies[slug] : undefined;
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;

  if (!study) {
    throw new Response("Not found", { status: 404, statusText: `No case study for /projects/${slug}` });
  }

  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-8">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={12} /> Back to Projects
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto w-full max-w-[1100px] px-6 pt-8 pb-10">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
            <span>{study.number} / {study.label}</span>
            <Badge variant={study.status === "live" ? "success" : "warning"}>{study.status === "live" ? "Live" : "In Progress"}</Badge>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">
            {study.title}
          </h1>
          <p className="mt-3 max-w-[680px] text-lg leading-relaxed text-[var(--text-secondary)]">{study.tagline}</p>
          {study.heroNote && <p className="mt-2 max-w-[680px] font-mono text-xs leading-relaxed text-[var(--text-muted)]">{study.heroNote}</p>}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.tech.map((t) => (
              <span key={t} className="rounded border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-0.5 font-mono text-xs text-[var(--tag-text)]">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {study.sourceUrl && (
              <a
                href={study.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                <Github size={14} /> Source
              </a>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={12} /> {study.role}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} /> {study.timeline}
            </span>
          </div>

          {/* Hero placeholder — warm gradient per Design §1, no fake screenshot */}
          <div className="relative mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="absolute inset-0 opacity-[0.07]" style={{ background: `radial-gradient(800px 400px at 50% 0%, var(--accent) 0%, transparent 60%)` }} />
            <div className="relative flex aspect-[16/9] items-center justify-center p-6">
              <span className="max-w-[560px] text-center font-mono text-sm leading-relaxed text-[var(--text-muted)]">
                {project?.tagline ?? study.tagline} — case study hero ({study.title} screenshot or diagram lives here; fallback is this editorial placeholder, not a stock image).
              </span>
            </div>
          </div>
        </section>

        {/* Layout: sticky nav + prose */}
        <div className="mx-auto flex w-full max-w-[1100px] gap-8 px-6 pb-24">
          {/* Sticky phase nav — desktop */}
          <nav className="hidden w-[180px] shrink-0 md:block">
            <div className="sticky top-20 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4">
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">On this page</p>
              <ul className="space-y-2">
                {phaseNav.map((p) => (
                  <li key={p.id}>
                    <a href={`#${p.id}`} className="block font-mono text-xs leading-relaxed text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Prose */}
          <article className="min-w-0 flex-1">
            {/* Mobile disclosure — simple anchor list */}
            <details className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 md:hidden">
              <summary className="cursor-pointer font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">On this page</summary>
              <ul className="mt-3 space-y-2">
                {phaseNav.map((p) => (
                  <li key={p.id}>
                    <a href={`#${p.id}`} className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <section id="overview" className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">1. Project Overview</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.overview}</p>
            </section>

            <section id="problem" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">2. Problem Statement</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.problem}</p>
            </section>

            <section id="goals" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">3. Goals & Success Metrics</h2>
              <ul className="mt-3 max-w-[680px] list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--text-secondary)]">
                {study.phases.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </section>

            <section id="discovery" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">4. Research & Discovery</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.discovery}</p>
            </section>

            <section id="ideation" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">5. Ideation & Concept Development</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.ideation}</p>
            </section>

            <section id="architecture" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">6. Design & Architecture</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.architecture}</p>
            </section>

            <section id="challenges" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">7. Challenges</h2>
              <div className="mt-4 space-y-6">
                {study.phases.challenges.map((c) => (
                  <div key={c.title} className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-5">
                    <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Problem:</span> {c.problem}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Solution:</span> {c.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="testing" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">8. Testing & Iteration</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.testing}</p>
            </section>

            <section id="results" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">9. Results & Impact</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {study.phases.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-lg border p-4 text-center ${m.verified ? "border-[var(--border)] bg-[var(--bg-card)]" : "border-dashed border-[var(--border-accent)] bg-[var(--bg-surface)]"}`}
                  >
                    <div className={`font-mono text-lg font-bold ${m.verified ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>{m.value}</div>
                    <div className="mt-1 font-mono text-xs text-[var(--text-muted)]">{m.label}</div>
                    {!m.verified && <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">unverified</div>}
                  </div>
                ))}
              </div>
            </section>

            <section id="retrospective" className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">10. Retrospective</h2>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">{study.phases.retrospective}</p>
            </section>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--border)] pt-8">
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {study.sourceUrl && (
                <a href={study.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-card)]">
                  <Github size={14} /> Source
                </a>
              )}
              <Link to="/projects" className="ml-auto inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <ArrowLeft size={14} /> Back to Projects
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[50vh] w-full max-w-[1100px] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{is404 ? "Case study not found" : "Something went wrong"}</h1>
        <p className="mt-2 max-w-[480px] text-sm text-[var(--text-secondary)]">
          {is404 ? "That slug doesn’t exist. Check the projects list for a valid case study." : "An unexpected error occurred."}
        </p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]">
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </main>
      <Footer />
    </>
  );
}
