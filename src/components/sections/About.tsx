import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

export function About() {
  const { ref, revealed } = useReveal()
  const { about } = portfolioConfig
  if (!about.isVisible) return null

  const highlights = about.highlights.filter((h) => h.isVisible)
  const stats      = about.stats.filter((s) => s.isVisible)

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          {/* Section heading */}
          <div className="flex items-center gap-3 mb-10">
            <span className="section-label">01.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              About Me
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          {/* One-liner summary */}
          <p
            className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mb-10"
            style={{ color: "var(--fg)" }}
          >
            {about.summary}
          </p>

          {/* Highlight cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {highlights.map((h) => (
              <div
                key={h.id}
                className="rounded-xl border p-5 card-lift"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="text-base w-7 h-7 flex items-center justify-center rounded-md border flex-shrink-0"
                    style={{
                      color: "var(--accent-text)",
                      background: "var(--accent-subtle)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {h.icon}
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    {h.title}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {h.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 divide-x rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-5 px-6 text-center"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="font-display font-bold text-2xl mb-0.5"
                  style={{ color: "var(--accent-text)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
