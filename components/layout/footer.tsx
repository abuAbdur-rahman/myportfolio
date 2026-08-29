import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: SiGithub,
    href: "https://github.com/abuAbdur-rahman",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/abdulazeez-badmus",
    label: "LinkedIn",
  },
  {
    icon: SiX,
    href: "https://x.com/abuabdirrahman_",
    label: "X",
  },
  {
    icon: Mail,
    href: "mailto:hello@abdulazeez.dev",
    label: "Email",
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-3">
          <img src="/logo-wordmark.svg" alt="abu" width={48} height={19} className="h-5 w-auto opacity-80" />
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Abdulazeez Badmus
          </p>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </footer>
  );
}
