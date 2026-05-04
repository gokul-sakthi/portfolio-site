import { portfolioConfig } from "@/config/portfolio.config"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"

const NAV_LINKS = [
  { href: "#about",      label: "About" },
  { href: "#skills",     label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#education",  label: "Education" },
]

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Footer() {
  const { footer, contact, meta } = portfolioConfig
  if (!footer.isVisible) return null

  const contactSubtext = contact.body.split("—")[1]?.trim()
    ?? "fulltime, contract, or a conversation"

  return (
    <footer
      id="contact"
      className="px-6 pt-12 pb-10"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto space-y-0">

        {/* ── Status strip ─────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Left — availability */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#22c55e" }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "#22c55e" }}
              />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
              <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                Open to work
              </span>
              <span className="text-xs sm:text-sm" style={{ color: "var(--fg-subtle)" }}>
                <span className="hidden sm:inline">— </span>{contactSubtext}
              </span>
            </div>
          </div>

          {/* Centre — location */}
          <div
            className="hidden sm:flex items-center justify-center gap-1.5 text-sm"
            style={{ color: "var(--fg-subtle)" }}
          >
            <MapPinIcon />
            {meta.location}
          </div>

          {/* Right — links */}
          <div className="flex items-center gap-4 sm:justify-end">
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <GithubIcon size={15} />
              GitHub
            </a>
          </div>
        </div>

        {/* ── Nav echo ─────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center gap-x-1 gap-y-2 py-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center">
              <a
                href={link.href}
                className="text-sm transition-colors"
                style={{ color: "var(--fg-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-subtle)")}
              >
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="mx-2.5 text-xs select-none" style={{ color: "var(--border-strong)" }}>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* ── Credit ───────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="font-display text-sm font-semibold" style={{ color: "var(--fg-muted)" }}>
            {meta.name}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
            {footer.credit} · {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </footer>
  )
}
