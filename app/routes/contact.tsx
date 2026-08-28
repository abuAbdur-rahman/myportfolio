"use client";

import { useState, type FormEvent } from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { Input } from "../../components/ui/input";

const directLinks = [
  {
    icon: Mail,
    label: "hello@abdulazeez.dev",
    href: "mailto:hello@abdulazeez.dev",
  },
  {
    icon: SiGithub,
    label: "github.com/abuAbdur-rahman",
    href: "https://github.com/abuAbdur-rahman",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/abdulazeez-badmus",
    href: "https://linkedin.com/in/abdulazeez-badmus",
  },
  {
    icon: SiX,
    label: "x.com/abuabdirrahman_",
    href: "https://x.com/abuabdirrahman_",
  },
  {
    icon: MapPin,
    label: "Ilorin, Nigeria",
    href: null,
  },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire up Resend via api/contact.ts
    setTimeout(() => setStatus("success"), 1000);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pt-24 pb-24 md:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 max-w-[480px] text-base text-[var(--text-secondary)]">
            Have a project in mind? Or just want to say hi.
          </p>
          <p className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Freelancer · Open to remote work
          </p>
        </motion.div>

        {/* Two-column */}
        <motion.div
          className="mt-12 grid gap-12 md:grid-cols-[1fr_1.5fr]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          {/* Left — direct links */}
          <div className="space-y-4">
            {directLinks.map((link) => (
              <div key={link.label} className="flex items-center gap-3">
                <link.icon size={16} className="shrink-0 text-[var(--text-muted)]" />
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="text-sm text-[var(--text-secondary)]">{link.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div>
            {status === "success" ? (
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center">
                <p className="text-base text-[var(--text-primary)]">
                  Thanks — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    placeholder="What's on your mind?"
                    className="flex w-full rounded-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  {status === "submitting" ? "Sending…" : "Send Message →"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-[var(--red)]">
                    Something went wrong. Try again or reach out directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
