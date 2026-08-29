import { Link } from "react-router";
import { ArrowRight, Download, Linkedin, Mail } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { m } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { Badge } from "../../components/ui/badge";
import { projects } from "../../data/projects";

const featured = projects.filter((p) => p.featured);

const socialLinks = [
  { icon: SiGithub, href: "https://github.com/abuAbdur-rahman", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/abdulazeez-badmus", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com/abuabdirrahman_", label: "X" },
  { icon: Mail, href: "mailto:abdulazeezadekiilekun@gmail.com", label: "Email" },
];

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full flex-1 overflow-hidden">
        {/* Hero */}
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-24 pb-16 md:pt-32 md:pb-28">
          <m.div
            className="max-w-[640px]"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Status line */}
            <m.p
              variants={fadeUp}
              className="mb-6 font-mono text-sm text-[var(--text-muted)]"
            >
              ~/portfolio · online
              <span className="cursor-blink" aria-hidden="true">
                _
              </span>
            </m.p>

            {/* H1 */}
            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-tight tracking-[-0.03em]"
            >
              Abdulazeez Badmus
            </m.h1>

            {/* Role */}
            <m.p
              variants={fadeUp}
              className="mt-4 text-lg text-[var(--text-secondary)]"
            >
              React Developer · Full Stack Engineer
            </m.p>

            {/* Tagline */}
            <m.p
              variants={fadeUp}
              className="mt-2 text-base text-[var(--text-muted)]"
            >
              Building products that serve communities.
            </m.p>

            {/* CTAs */}
            <m.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/cv"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-accent)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                Download CV <Download size={16} />
              </Link>
            </m.div>

            {/* Social icons */}
            <m.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </m.div>

            {/* Currently */}
            <m.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Currently: React Dev @ Manaknight
            </m.div>
          </m.div>
        </section>

        {/* Featured Work — generous editorial rhythm per Design.md §4 */}
        <section className="mx-auto w-full max-w-[1280px] px-6 pb-24 md:pb-32 pt-12 md:pt-16">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
                Featured Work
              </h2>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden />
            </div>
          </m.div>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {featured.map((project, i) => (
              <m.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: i * 0.08,
                }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block min-w-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
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
                  <div className="flex flex-wrap gap-1.5">
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
                </Link>
              </m.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
