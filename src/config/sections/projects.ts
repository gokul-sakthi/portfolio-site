import type { ProjectsConfig } from "../types"

export const projects: ProjectsConfig = {
  isVisible: true,
  items: [
    {
      id: "relay",
      isVisible: true,
      name: "Relay",
      subtitle: "Kiosk Terminal Management Platform",
      icon: "◈",
      link: "https://relay-server-humming-orchard-5194.fly.dev",
      images: [
        "/images/projects/relay-01.webp",
        "/images/projects/relay-02.webp",
        "/images/projects/relay-03.webp",
        "/images/projects/relay-04.webp",
        "/images/projects/relay-05.webp",
        "/images/projects/relay-06.webp",
        "/images/projects/relay-07.webp",
        "/images/projects/relay-08.webp",
        "/images/projects/relay-09.webp",
        "/images/projects/relay-10.webp",
      ],
      description:
        "Multi-component system connecting physical kiosk terminals to a centralised admin backend, with secure device registration, member wallets, RBAC, and real-time status tracking.",
      highlights: [
        { isVisible: true, text: "Contract-first API: OpenAPI 3.0 spec drives Go server codegen (oapi-codegen) and typed React Query hooks (orval), keeping both sides in sync automatically." },
        { isVisible: true, text: "ECDSA P-256 device auth: private keys stored in OS keychain via Keytar, generated with Web Crypto API, and never transmitted over the wire." },
        { isVisible: true, text: "Electron state machine: multi-step kiosk flow covering registration, credential submission, admin approval polling, and rejection recovery." },
        { isVisible: true, text: "React admin panel: paginated device/member tables, wallet top-up flows, RBAC permission tokens, and approve/reject review workflow." },
        { isVisible: true, text: "Self-healing field logic: heartbeat polling, stale device detection, and structured 409 conflict handling for duplicate terminal registrations." },
      ],
      tags: ["Go", "OpenAPI", "Electron", "React", "TypeScript", "React Query", "Keytar", "RBAC"],
    },
    {
      id: "prisonbridge",
      isVisible: true,
      name: "Prisonbridge",
      subtitle: "Supervised Audio/Video Communication Platform",
      icon: "📡",
      link: "https://prisonbridge.com",
      images: [
        "/images/projects/prisonbridge-01.webp",
      ],
      description:
        "Real-time communication system for correctional facilities: supervised audio and video calls between inmates and approved contacts. Owned the full stack from WebRTC signaling to the Electron desktop client.",
      highlights: [
        { isVisible: true, text: "WebRTC signaling: STUN/TURN coordination, ICE negotiation, and reconnection logic for unstable network conditions." },
        { isVisible: true, text: "PostgreSQL optimisation: Prisma query tuning and index strategy to reduce latency during peak concurrent session load." },
        { isVisible: true, text: "Electron desktop client: Windows packaging, auto-update flow, IPC between renderer and main, and backend API auth integration." },
        { isVisible: true, text: "React UI: role-based call controls, participant state displays, and graceful fallback states for connection failures." },
        { isVisible: true, text: "React Query integration: server state caching, paginated session history, background refetch, and error recovery patterns." },
      ],
      tags: ["WebRTC", "STUN/TURN", "Node.js", "PostgreSQL", "Prisma", "Electron", "React", "React Query"],
    },
    {
      id: "bcuze",
      isVisible: true,
      name: "Bcuze",
      subtitle: "Field Service Management Platform",
      icon: "⚙️",
      link: "https://bcuze.com",
      images: [
        "/images/projects/bcuze-01.webp",
        "/images/projects/bcuze-02.webp",
        "/images/projects/bcuze-03.webp",
        "/images/projects/bcuze-04.webp",
      ],
      description:
        "Field service management platform and the project that shaped a strong preference for modular monolith design. Built to explore distributed architectures at scale, learned firsthand where they add overhead without payoff.",
      highlights: [
        { isVisible: true, text: "Observability stack: Jaeger distributed tracing, Prometheus metrics, and Grafana dashboards to surface latency bottlenecks across services." },
        { isVisible: true, text: "Architecture trade-offs: diagnosed real-world costs of over-distribution: debugging complexity, cascading failures, and DevOps overhead on a small team." },
        { isVisible: true, text: "Modular monolith shift: applied learnings to subsequent projects (Relay, Prisonbridge), retaining domain boundaries without the distributed systems tax." },
      ],
      tags: ["Node.js", "Docker", "Jaeger", "Prometheus", "Grafana", "PostgreSQL"],
    },
  ],
}
