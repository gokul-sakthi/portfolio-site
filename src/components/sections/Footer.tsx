import { portfolioConfig } from "@/config/portfolio.config"

export function Footer() {
  const { footer, meta } = portfolioConfig
  if (!footer.isVisible) return null

  return (
    <footer
      className="py-8 px-6 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-display text-sm" style={{ color: "var(--fg-subtle)" }}>
          {meta.name}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
          {footer.credit}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
