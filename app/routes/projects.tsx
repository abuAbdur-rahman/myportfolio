import { Link } from "react-router";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { m } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { Badge } from "../../components/ui/badge";
import { projects } from "../../data/projects";

const featured = projects.filter((p) => p.featured);
const grid = projects.filter((p) => !p.featured);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full flex-1 overflow-hidden">
        {/* Header */}
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-24 pb-12 md:pt-32">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">
              Selected Work
            </h1>
            <p className="mt-3 max-w-[560px] text-base text-[var(--text-secondary)]">
              Six products. Each one solves a real problem — or is honest about
              still being built.
            </p>
          </m.div>
        </section>

        {/* Featured Row */}
        <section className="mx-auto w-full max-w-[1280px] px-6 pb-16">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-4 flex items-center gap-4 font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]"
          >
            Featured
            <span className="h-px flex-1 bg-[var(--border)]" aria-hidden />
          </m.div>

          <m.div
            className="grid min-w-0 gap-6 md:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featured.map((project) => (
              <m.div key={project.slug} variants={fadeUp}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-colors hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  {/* Screenshot placeholder — subtle warm gradient per Design.md §1: typography is hero, no stock image */}
                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[var(--bg-surface)]">
                    <div className="absolute inset-0 opacity-[0.06]" style={{background: `radial-gradient(600px 300px at 50% 0%, var(--accent) 0%, transparent 60%)`}} />
                    <span className="relative font-mono text-sm tracking-widest text-[var(--text-muted)]">
                      {project.title} — {project.label.toLowerCase()}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {project.number} / {project.title}
                      </span>
                      <Badge
                        variant={
                          project.status === "live" ? "success" : "warning"
                        }
                      >
                        {project.status === "live" ? "Live" : "In Progress"}
                      </Badge>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.tagline}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-0.5 font-mono text-xs text-[var(--tag-text)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)]">
                          <ExternalLink size={12} /> Live
                        </span>
                      )}
                      {project.sourceUrl && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <Code2 size={12} /> Source
                        </span>
                      )}
                      <span className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                        Case Study <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </m.div>
        </section>

        {/* Divider */}
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="h-px bg-[var(--border)]" />
        </div>

        {/* Card Grid */}
        <section className="mx-auto w-full max-w-[1280px] px-6 py-16">
          <m.div
            className="grid min-w-0 gap-4 sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {grid.map((project) => (
              <m.div key={project.slug} variants={fadeUp}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {project.number} / {project.title}
                    </span>
                    <Badge
                      variant={
                        project.status === "live" ? "success" : "warning"
                      }
                    >
                      {project.status === "live" ? "Live" : "In Progress"}
                    </Badge>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.tagline}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-0.5 font-mono text-xs text-[var(--tag-text)]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-1 py-0.5 font-mono text-xs text-[var(--text-muted)]">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)]">
                        <ExternalLink size={12} /> Live
                      </span>
                    )}
                    {project.sourceUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <Code2 size={12} /> Source
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                      Case Study <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </m.div>
            ))}
          </m.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
