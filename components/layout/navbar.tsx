import { NavLink } from "react-router";
import { Menu, X, Home, Briefcase, User, Mail } from "lucide-react";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: Briefcase },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6">
        {/* Logo — wordmark per brand/LOGO.md: transparent, for controlled --bg-primary nav */}
        <a href="/" aria-label="Home" className="flex items-center">
          <img
            src="/logo-wordmark.svg"
            alt="abu"
            width={70}
            height={28}
            className="h-7 w-auto"
          />
        </a>

        {/* Desktop nav — active = accent underline, per Design §1.2 one accent sparingly */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 border-b-2 pb-1 text-sm transition-colors ${
                    isActive
                      ? "border-[var(--accent)] text-[var(--text-primary)]"
                      : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]"
                  }`
                }
              >
                <item.icon size={14} className="opacity-70" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — light tap, zero friction */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[var(--text-secondary)] transition-colors hover:border-[var(--border)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <m.span initial={false} animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </m.span>
        </button>
      </div>

      {/* Mobile menu — very light, zero friction: opacity + y, no spring */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-[var(--border)] bg-[var(--bg-surface)]/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
              {navItems.map((item, i) => (
                <m.li
                  key={item.to}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.04 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-accent)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] border border-transparent"
                      }`
                    }
                  >
                    <item.icon size={16} className="shrink-0 opacity-80" />
                    {item.label}
                    <span className="ml-auto text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </NavLink>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
