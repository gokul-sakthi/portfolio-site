import { useEffect, useState } from "react"
import { portfolioConfig } from "@/config/portfolio.config"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"

function ArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

const QUICK_SKILLS = ["Node.js", "PostgreSQL", "React", "Docker", "AWS"]

export function Hero() {
  const { meta, hero } = portfolioConfig
  if (!hero.isVisible) return null

  const titles = hero.typewriterTitles
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = titles[titleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 58)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
        return () => clearTimeout(t)
      } else {
        setTitleIdx((idx) => (idx + 1) % titles.length)
        setTyping(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, typing, titleIdx])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden pt-16">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Accent gradient — anchored top-left so it lights up the left column */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-subtle)", opacity: 0.55 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* ── Left: Identity ───────────────────────────────────── */}
          <div>
            {/* Availability badge */}
            {hero.availability.isVisible && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6 border w-fit"
                style={{
                  background: "var(--accent-subtle)",
                  borderColor: "var(--accent)",
                  color: "var(--accent-text)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
                {hero.availability.text}
              </div>
            )}

            {/* Name */}
            <h1
              className="font-display font-bold leading-[1.06] tracking-tight mb-4"
              style={{ color: "var(--fg)", fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
            >
              {meta.firstName} &nbsp;
              <span style={{ color: "var(--accent-text)" }}>{meta.lastName}</span>
            </h1>

            {/* Title */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="text-base md:text-lg font-semibold"
                style={{ color: "var(--fg-muted)" }}
              >
                {meta.title}
              </span>
            </div>

            {/* Summary */}
            <p
              className="text-sm md:text-base leading-relaxed max-w-lg mb-3"
              style={{ color: "var(--fg-muted)" }}
            >
              Fullstack Engineer with <strong style={{ color: "var(--fg)", fontWeight: 600 }}>3+ years</strong> building
              backend systems, real-time features, and internal tools. Comfortable from API
              design to cloud deployment.
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 mb-8 text-sm" style={{ color: "var(--fg-subtle)" }}>
              <MapPinIcon />
              {meta.location}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "var(--accent)", color: "#fff", boxShadow: "var(--shadow-accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                <GithubIcon size={15} />
                GitHub
              </a>
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all"
                style={{ borderColor: "var(--border-strong)", color: "var(--fg)", background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)"
                  e.currentTarget.style.color = "var(--accent-text)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)"
                  e.currentTarget.style.color = "var(--fg)"
                }}
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── Right: Terminal card ──────────────────────────────── */}
          <div
            className="rounded-2xl border overflow-hidden hidden lg:block"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {/* Terminal chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span
                className="ml-auto font-mono text-xs"
                style={{ color: "var(--fg-subtle)" }}
              >
                gokul@portfolio ~ %
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 space-y-4 font-mono text-sm">

              {/* whoami */}
              <div>
                <div style={{ color: "var(--accent-text)" }}>$ whoami</div>
                <div className="mt-1 pl-2" style={{ color: "var(--fg)" }}>
                  {meta.name}
                </div>
              </div>

              {/* role */}
              <div>
                <div style={{ color: "var(--accent-text)" }}>$ cat role.txt</div>
                <div className="mt-1 pl-2 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  Fullstack Developer<br />
                  <span style={{ color: "var(--fg-subtle)" }}>(Backend Focused)</span>
                </div>
              </div>

              {/* building — typewriter */}
              <div>
                <div style={{ color: "var(--accent-text)" }}>$ building --now</div>
                <div className="mt-1 pl-2 flex items-center gap-0.5" style={{ color: "var(--fg)" }}>
                  <span>{displayed}</span>
                  <span
                    className="inline-block w-0.5 h-4 animate-[blink_1s_step-end_infinite]"
                    style={{ background: "var(--accent)" }}
                  />
                </div>
              </div>

              {/* skills */}
              <div>
                <div style={{ color: "var(--accent-text)" }}>$ skills --top</div>
                <div className="mt-2 pl-2 flex flex-wrap gap-1.5">
                  {QUICK_SKILLS.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-xs border"
                      style={{
                        background: "var(--accent-subtle)",
                        borderColor: "var(--border)",
                        color: "var(--accent-text)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* status */}
              <div>
                <div style={{ color: "var(--accent-text)" }}>$ status</div>
                <div className="mt-1 pl-2 flex items-center gap-2" style={{ color: "var(--fg-muted)" }}>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Open to new opportunities
                </div>
              </div>

            </div>

            {/* XP strip at bottom */}
            <div
              className="grid grid-cols-3 border-t divide-x text-center"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { value: "3+", label: "Years" },
                { value: "2", label: "Products" },
                { value: "AWS", label: "Cloud" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="py-3 px-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--fg-subtle)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-colors group"
        style={{ color: "var(--fg-subtle)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <span className="group-hover:translate-y-1 transition-transform"><ArrowDown /></span>
      </a>
    </section>
  )
}
