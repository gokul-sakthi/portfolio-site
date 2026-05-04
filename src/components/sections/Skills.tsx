import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

const FEATURED = ["Node.js", "PostgreSQL", "Prisma ORM", "BullJS", "React", "Electron"]

export function Skills() {
  const { ref, revealed } = useReveal()
  const { skills } = portfolioConfig
  if (!skills.isVisible) return null

  const visibleGroups = skills.groups.filter((g) => g.isVisible)

  return (
    <section id="skills" className="py-24 px-6" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-10">
            <span className="section-label">02.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Technical Skills
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          {/* Featured strip */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--fg-subtle)" }}>
              Core
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURED.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border"
                  style={{
                    background: "var(--accent-subtle)",
                    borderColor: "var(--accent)",
                    color: "var(--accent-text)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-8" style={{ background: "var(--border)" }} />

          {/* Category rows */}
          <div className="space-y-0">
            {visibleGroups.map((group, i) => {
              const visibleSkills = group.skills.filter((s) => s.isVisible)
              const isLast = i === visibleGroups.length - 1
              return (
                <div
                  key={group.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-start gap-3 py-4",
                    !isLast && "border-b"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Category label */}
                  <div className="sm:w-44 flex-shrink-0 flex items-center gap-2 pt-0.5">
                    <span style={{ color: "var(--fg-subtle)", fontSize: "0.8rem" }}>{group.icon}</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {group.label}
                    </span>
                  </div>

                  {/* Pills — free flowing */}
                  <div className="flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill) => {
                      const isFeatured = FEATURED.includes(skill.name)
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono border transition-colors"
                          style={
                            isFeatured
                              ? {
                                  background: "var(--accent-subtle)",
                                  borderColor: "var(--accent)",
                                  color: "var(--accent-text)",
                                  fontWeight: 500,
                                }
                              : {
                                  background: "var(--bg-surface)",
                                  borderColor: "var(--border)",
                                  color: "var(--fg-muted)",
                                }
                          }
                        >
                          {skill.name}
                        </span>
                      )
                    })}
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
