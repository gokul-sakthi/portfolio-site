import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"
import { portfolioConfig } from "@/config/portfolio.config"

const NAV_LINKS = [
  { href: "#about",      label: "About" },
  { href: "#skills",     label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#education",  label: "Education" },
  { href: "#contact",    label: "Contact" },
]

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )
}

export function Nav() {
  const [active, setActive]   = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { firstName, lastName } = portfolioConfig.meta

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      for (const link of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(link.href.slice(1))
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(link.href.slice(1))
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
      style={{ boxShadow: scrolled ? "var(--shadow-sm)" : "none" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-[62px] flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display text-xl text-[var(--fg)] hover:text-[var(--accent-text)] transition-colors"
        >
          {firstName}{" "}
          <span style={{ color: "var(--accent-text)" }}>{lastName}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  active === l.href.slice(1)
                    ? "text-[var(--accent-text)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                )}
              >
                {active === l.href.slice(1) && (
                  <span className="absolute inset-0 rounded-md bg-[var(--accent-subtle)]" />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-4 h-0.5 bg-current transition-all", menuOpen && "rotate-45 translate-y-2")} />
            <span className={cn("block w-4 h-0.5 bg-current transition-all", menuOpen && "opacity-0")} />
            <span className={cn("block w-4 h-0.5 bg-current transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors",
                    active === l.href.slice(1)
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
