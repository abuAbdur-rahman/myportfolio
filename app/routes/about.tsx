import { Link } from "react-router";
import { Download, Calendar, Building2 } from "lucide-react";
import { m } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { experience } from "../../data/experience";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const techList =
  "React · Next.js · TypeScript · Tailwind · Supabase · Firebase · Drizzle ORM · Rust · Axum · Tauri · Node.js · PostgreSQL · Git · Vercel · PWA";

const currentlyLearning = "Rust internals (smart pointers, async) · System design";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1100px] min-w-0 px-6 pt-24 pb-24 md:pt-32 overflow-hidden">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">
            About
          </h1>
        </m.div>

        {/* Bio */}
        <m.section
          className="mt-12"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <m.p
            variants={fadeUp}
            className="max-w-[680px] text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            Self-taught since 2021. Shipped production systems end-to-end at
            Doorite, then stepped back to go deep on React craft at Manaknight.
            Now freelancing — building products for clients, and for myself.
          </m.p>
        </m.section>

        {/* Experience Timeline */}
        <m.section
          className="mt-16"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <m.h2
            variants={fadeUp}
            className="mb-8 text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]"
          >
            Experience
          </m.h2>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <m.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-2 border-l-2 border-[var(--border-accent)] pl-6"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 size={12} />
                    {exp.company}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {exp.role}
                </h3>
                {exp.description && (
                  <p className="text-sm text-[var(--text-secondary)]">
                    {exp.description}
                  </p>
                )}
              </m.div>
            ))}
          </div>
        </m.section>

        {/* Tech List */}
        <m.section
          className="mt-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
            What I Work With
          </h2>
          <p className="max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">
            {techList}
          </p>
        </m.section>

        {/* Currently Learning */}
        <m.section
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
            Currently Learning
          </h2>
          <p className="max-w-[680px] text-base leading-relaxed text-[var(--text-secondary)]">
            {currentlyLearning}
          </p>
        </m.section>

        {/* Download CV */}
        <m.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          >
            Download CV <Download size={16} />
          </Link>
        </m.div>
      </main>
      <Footer />
    </>
  );
}
