import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"

export function Contact() {
  const { ref, revealed } = useReveal()
  const { contact, meta } = portfolioConfig
  if (!contact.isVisible) return null

  return (
    <section id="contact" className="py-28 px-6" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="section-label">06.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              {contact.heading}
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <div
              className="relative rounded-2xl border p-10 overflow-hidden"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Accent corner glow */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                style={{ background: "var(--accent-subtle)" }}
              />

              <p
                className="leading-relaxed mb-8 text-base relative z-10"
                style={{ color: "var(--fg-muted)" }}
              >
                {contact.body}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all accent-glow"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
                >
                  <LinkedinIcon size={16} />
                  Connect on LinkedIn
                </a>
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all"
                  style={{
                    background: "transparent",
                    borderColor: "var(--border-strong)",
                    color: "var(--fg)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)"
                    e.currentTarget.style.color = "var(--accent-text)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-strong)"
                    e.currentTarget.style.color = "var(--fg)"
                  }}
                >
                  <GithubIcon size={16} />
                  View GitHub
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
