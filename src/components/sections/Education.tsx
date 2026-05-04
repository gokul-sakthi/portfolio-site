import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

export function Education() {
  const { ref, revealed } = useReveal()
  const { education } = portfolioConfig
  if (!education.isVisible) return null

  const visibleItems = education.items.filter((e) => e.isVisible)

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-10">
            <span className="section-label">05.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Education
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          <div className="space-y-0">
            {visibleItems.map((item, i) => {
              const isLast = i === visibleItems.length - 1
              return (
                <div
                  key={item.id}
                  className={cn(
                    "grid sm:grid-cols-[180px_1fr] gap-x-8 gap-y-2 py-7",
                    !isLast && "border-b"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Left — period + GPA */}
                  <div className="flex flex-col gap-2 pt-0.5">
                    <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
                      {item.period}
                    </span>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-md border w-fit"
                      style={{
                        background: "var(--accent-subtle)",
                        borderColor: "var(--border)",
                        color: "var(--accent-text)",
                      }}
                    >
                      GPA {item.gpa}
                    </span>
                  </div>

                  {/* Right — degree + institution */}
                  <div>
                    <h3
                      className="font-display font-semibold text-lg leading-snug mb-1"
                      style={{ color: "var(--fg)" }}
                    >
                      {item.degree}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: "var(--accent-text)" }}>
                      {item.institution}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
