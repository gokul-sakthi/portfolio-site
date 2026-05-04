import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Contact() {
  const { ref, revealed } = useReveal()
  const { contact, meta } = portfolioConfig
  if (!contact.isVisible) return null

  return (
    <section id="contact" className="px-6 py-0">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn("section-reveal", revealed && "revealed")}
        >
          {/* Strip */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 py-7 border-t border-b"
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
              <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                Open to work
              </span>
              <span className="text-sm" style={{ color: "var(--fg-subtle)" }}>
                — {contact.body.split('—')[1]?.trim() ?? "fulltime, contract, or a conversation"}
              </span>
            </div>

            {/* Centre — location */}
            <div
              className="flex items-center gap-1.5 text-sm sm:absolute sm:left-1/2 sm:-translate-x-1/2"
              style={{ color: "var(--fg-subtle)" }}
            >
              <MapPinIcon />
              {meta.location}
            </div>

            {/* Right — links */}
            <div className="flex items-center gap-4">
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
        </div>
      </div>
    </section>
  )
}
