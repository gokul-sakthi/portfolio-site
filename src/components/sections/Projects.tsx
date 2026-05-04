import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

export function Projects() {
  const { ref, revealed } = useReveal()
  const { projects } = portfolioConfig
  if (!projects.isVisible) return null

  const visibleProjects = projects.items.filter((p) => p.isVisible)

  return (
    <section id="projects" className="py-24 px-6" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-12">
            <span className="section-label">04.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Key Projects
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {visibleProjects.map((project) => {
              const visibleHighlights = project.highlights.filter((h) => h.isVisible)
              return (
                <div
                  key={project.id}
                  className="rounded-xl border p-6 card-lift flex flex-col"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Project header */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0">{project.icon}</span>
                    <div>
                      <h3
                        className="font-display text-xl leading-tight"
                        style={{ color: "var(--fg)" }}
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--fg-subtle)" }}>
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {visibleHighlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-xs leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        <span
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "var(--accent-text)" }}
                        >
                          ▸
                        </span>
                        {h.text}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div
                    className="flex flex-wrap gap-1.5 pt-4 border-t mt-auto"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border transition-colors"
                        style={{
                          background: "var(--bg-subtle)",
                          borderColor: "var(--border)",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
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
