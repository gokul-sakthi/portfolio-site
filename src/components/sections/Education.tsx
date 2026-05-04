import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

function GraduationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
}

export function Education() {
  const { ref, revealed } = useReveal()
  const { education } = portfolioConfig
  if (!education.isVisible) return null

  const visibleItems = education.items.filter((e) => e.isVisible)

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-12">
            <span className="section-label">05.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Education
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          <div className="max-w-2xl space-y-4">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border p-6 card-lift flex items-start gap-4"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{
                    background: "var(--accent-subtle)",
                    borderColor: "var(--border)",
                    color: "var(--accent-text)",
                  }}
                >
                  <GraduationIcon />
                </div>
                <div>
                  <h3
                    className="font-display text-lg mb-1"
                    style={{ color: "var(--fg)" }}
                  >
                    {item.degree}
                  </h3>
                  <div
                    className="text-sm font-medium mb-3"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {item.institution}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="font-mono text-xs px-3 py-1.5 rounded-md border"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {item.period}
                    </span>
                    <span
                      className="font-mono text-xs px-3 py-1.5 rounded-md border"
                      style={{
                        background: "var(--accent-subtle)",
                        borderColor: "var(--border)",
                        color: "var(--accent-text)",
                      }}
                    >
                      GPA: {item.gpa}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
