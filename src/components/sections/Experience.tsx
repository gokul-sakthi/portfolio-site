import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

/** Renders "Keyword: rest" with the keyword bolded for quick scanning. */
function BulletText({ text }: { text: string }) {
  const idx = text.indexOf(": ")
  if (idx === -1) return <span style={{ color: "var(--fg-muted)" }}>{text}</span>
  return (
    <span>
      <span className="font-medium" style={{ color: "var(--fg)" }}>{text.slice(0, idx)}</span>
      <span style={{ color: "var(--fg-muted)" }}>{text.slice(idx)}</span>
    </span>
  )
}

export function Experience() {
  const { ref, revealed } = useReveal()
  const { experience } = portfolioConfig
  if (!experience.isVisible) return null

  const visibleItems = experience.items.filter((e) => e.isVisible)

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-10">
            <span className="section-label">03.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Experience
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          <div className="space-y-0">
            {visibleItems.map((exp, i) => {
              const visiblePoints = exp.points.filter((p) => p.isVisible)
              const isLast = i === visibleItems.length - 1
              return (
                <div
                  key={exp.id}
                  className={cn("grid sm:grid-cols-[180px_1fr] gap-x-8 gap-y-3 py-8", !isLast && "border-b")}
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Left — when & where */}
                  <div className="flex flex-col gap-1 pt-0.5">
                    <span
                      className="font-mono text-xs leading-relaxed"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span
                        className="inline-flex items-center gap-1 w-fit text-xs px-2 py-0.5 rounded-full border"
                        style={{
                          background: "rgba(34,197,94,0.08)",
                          borderColor: "rgba(34,197,94,0.3)",
                          color: "#16a34a",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Current
                      </span>
                    )}
                    <span className="text-xs mt-1" style={{ color: "var(--fg-subtle)" }}>
                      {exp.location}
                    </span>
                  </div>

                  {/* Right — role & content */}
                  <div>
                    {/* Role + company */}
                    <h3
                      className="font-display font-semibold text-lg leading-tight mb-0.5"
                      style={{ color: "var(--fg)" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-4">
                      <span className="text-sm font-medium" style={{ color: "var(--accent-text)" }}>
                        {exp.company}
                      </span>
                      {exp.companyNote && (
                        <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                          · {exp.companyNote}
                        </span>
                      )}
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 mb-4">
                      {visiblePoints.map((point, j) => (
                        <li
                          key={j}
                          className="flex gap-2.5 text-sm leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />
                          <BulletText text={point.text} />
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono border"
                          style={{
                            background: "var(--bg-surface)",
                            borderColor: "var(--border)",
                            color: "var(--fg-muted)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
