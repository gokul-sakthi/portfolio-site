import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio.config"

// ─── Icons ───────────────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Renders "Keyword — rest" with the keyword bolded for quick scanning. */
function BulletText({ text }: { text: string }) {
  const idx = text.indexOf(" — ")
  if (idx === -1) return <span style={{ color: "var(--fg-muted)" }}>{text}</span>
  return (
    <span>
      <span className="font-medium" style={{ color: "var(--fg)" }}>{text.slice(0, idx)}</span>
      <span style={{ color: "var(--fg-muted)" }}>{text.slice(idx)}</span>
    </span>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[]
  startIndex: number
  projectName: string
  onClose: () => void
}

function Lightbox({ images, startIndex, projectName, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const thumbsRef = useRef<HTMLDivElement>(null)
  const lastTap = useRef(0)

  // All gesture tracking in a ref — no re-renders mid-touch
  const g = useRef({
    type: "none" as "none" | "swipe" | "pan" | "pinch",
    startX: 0, startY: 0,
    startPanX: 0, startPanY: 0,
    startDist: 0, startZoom: 1,
  })

  const prev = useCallback(() => {
    setIdx(i => (i - 1 + images.length) % images.length)
    setZoom(1); setPan({ x: 0, y: 0 })
  }, [images.length])

  const next = useCallback(() => {
    setIdx(i => (i + 1) % images.length)
    setZoom(1); setPan({ x: 0, y: 0 })
  }, [images.length])

  // Scroll active thumbnail into view when idx changes
  useEffect(() => {
    const el = thumbsRef.current?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [idx])

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next])

  function getTouchDist(t: React.TouchList) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      g.current = {
        type: "pinch",
        startX: 0, startY: 0,
        startPanX: pan.x, startPanY: pan.y,
        startDist: getTouchDist(e.touches),
        startZoom: zoom,
      }
    } else {
      g.current = {
        type: zoom > 1 ? "pan" : "swipe",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPanX: pan.x, startPanY: pan.y,
        startDist: 0, startZoom: zoom,
      }
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (g.current.type === "pinch" && e.touches.length === 2) {
      const newZoom = Math.min(4, Math.max(1, g.current.startZoom * (getTouchDist(e.touches) / g.current.startDist)))
      setZoom(newZoom)
      if (newZoom <= 1) setPan({ x: 0, y: 0 })
    } else if (g.current.type === "pan") {
      setPan({
        x: g.current.startPanX + (e.touches[0].clientX - g.current.startX) / zoom,
        y: g.current.startPanY + (e.touches[0].clientY - g.current.startY) / zoom,
      })
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    const type = g.current.type
    g.current.type = "none"

    if (type === "pinch") {
      if (zoom < 1.05) { setZoom(1); setPan({ x: 0, y: 0 }) }
      return
    }

    if (type === "swipe") {
      const dx = (e.changedTouches[0]?.clientX ?? 0) - g.current.startX
      const dy = (e.changedTouches[0]?.clientY ?? 0) - g.current.startY
      const absDx = Math.abs(dx), absDy = Math.abs(dy)

      // Double-tap → toggle zoom
      if (absDx < 12 && absDy < 12) {
        const now = Date.now()
        if (now - lastTap.current < 280) {
          zoom > 1 ? (setZoom(1), setPan({ x: 0, y: 0 })) : setZoom(2.5)
        }
        lastTap.current = now
        return
      }

      // Horizontal swipe → navigate
      if (absDx > 48 && absDx > absDy) {
        dx < 0 ? next() : prev()
      }
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
    >
      {/* ── Image area — fills everything above the thumbnail strip ── */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onClose}
      >
        {/* Absolute fill so max-width/max-height on img resolve correctly */}
        <div
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-10"
          onClick={e => e.stopPropagation()}
        >
          <img
            key={idx}
            src={images[idx]}
            alt={`${projectName} screenshot ${idx + 1}`}
            draggable={false}
            className="rounded-xl shadow-2xl"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "center center",
              transition: g.current.type !== "none" ? "none" : "transform 0.15s ease",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: zoom > 1 ? "grab" : "default",
              userSelect: "none",
            }}
          />
        </div>

        {/* Floating top-bar: label + counter + close — overlaid, never pushes image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span
            className="pointer-events-auto text-xs px-2.5 py-1 rounded-full"
            style={{
              color: "rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {projectName} · {idx + 1}/{images.length}
          </span>
          <button
            onClick={onClose}
            className="pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Prev / Next — desktop only; mobile uses swipe */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Mobile swipe / double-tap hint */}
        {images.length > 1 && zoom === 1 && (
          <p
            className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:hidden text-xs px-3 py-1 rounded-full pointer-events-none"
            style={{ color: "rgba(255,255,255,0.45)", background: "rgba(0,0,0,0.4)" }}
          >
            swipe · pinch to zoom · double-tap
          </p>
        )}
      </div>

      {/* ── Thumbnail strip — scrollable, works for any number of images ── */}
      {images.length > 1 && (
        <div
          className="flex-shrink-0 flex items-center gap-2 px-4 py-3 overflow-x-auto"
          style={{
            background: "rgba(0,0,0,0.7)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            scrollbarWidth: "none",
          }}
          ref={thumbsRef}
          onClick={e => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setZoom(1); setPan({ x: 0, y: 0 }) }}
              className="flex-shrink-0 rounded-md overflow-hidden transition-all"
              style={{
                width: 80, height: 50,
                outline: i === idx ? "2px solid var(--accent)" : "2px solid rgba(255,255,255,0.15)",
                outlineOffset: 2,
                opacity: i === idx ? 1 : 0.45,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover object-left-top" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}

// ─── Image strip ─────────────────────────────────────────────────────────────

interface ImageStripProps {
  images: string[]
  projectName: string
}

function ImageStrip({ images, projectName }: ImageStripProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  return (
    <>
      <div className="flex gap-2 mb-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="group relative flex-shrink-0 overflow-hidden rounded-lg transition-all"
            style={{
              width: "calc(33.33% - 6px)",
              aspectRatio: "16/10",
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)"
            }}
          >
            <img
              src={src}
              alt={`${projectName} screenshot ${i + 1}`}
              className="w-full h-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay with expand hint */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/>
                <polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          projectName={projectName}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function Projects() {
  const { ref, revealed } = useReveal()
  const { projects } = portfolioConfig
  if (!projects.isVisible) return null

  const visibleProjects = projects.items.filter((p) => p.isVisible)

  return (
    <section id="projects" className="py-24 px-6" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={cn("section-reveal", revealed && "revealed")}>

          <div className="flex items-center gap-3 mb-10">
            <span className="section-label">04.</span>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
              Key Projects
            </h2>
            <div className="flex-1 h-px hidden md:block" style={{ background: "var(--border)" }} />
          </div>

          <div className="space-y-0">
            {visibleProjects.map((project, i) => {
              const visibleHighlights = project.highlights.filter((h) => h.isVisible)
              const isLast = i === visibleProjects.length - 1
              return (
                <div
                  key={project.id}
                  className={cn(
                    "grid sm:grid-cols-[200px_1fr] gap-x-8 gap-y-4 py-8",
                    !isLast && "border-b"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* ── Left: identity ──────────────────── */}
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{project.icon}</span>
                      <h3
                        className="font-display font-semibold text-base leading-snug"
                        style={{ color: "var(--fg)" }}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--fg-subtle)" }}>
                      {project.subtitle}
                    </p>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border transition-all"
                        style={{
                          color: "var(--accent-text)",
                          borderColor: "var(--accent)",
                          background: "var(--accent-subtle)",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "var(--accent)"
                          e.currentTarget.style.color = "var(--bg)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "var(--accent-subtle)"
                          e.currentTarget.style.color = "var(--accent-text)"
                        }}
                      >
                        <ExternalLinkIcon />
                        Live site
                      </a>
                    )}
                  </div>

                  {/* ── Right: screenshots + content ────── */}
                  <div>
                    {/* Screenshot strip — visual anchor, first thing the eye hits */}
                    {project.images && project.images.length > 0 && (
                      <ImageStrip images={project.images} projectName={project.name} />
                    )}

                    {/* Tag keywords — scannable before reading prose */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border"
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

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {project.description}
                    </p>

                    {/* Highlights — keyword bolded before em-dash */}
                    <ul className="space-y-2">
                      {visibleHighlights.map((h, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-relaxed">
                          <span
                            className="flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                            style={{ background: "var(--accent)" }}
                          />
                          <BulletText text={h.text} />
                        </li>
                      ))}
                    </ul>
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
