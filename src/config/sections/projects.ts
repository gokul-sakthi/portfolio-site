import type { ProjectsConfig } from "../types"

export const projects: ProjectsConfig = {
  isVisible: true,
  items: [
    {
      id: "prisonbridge",
      isVisible: true,
      name: "Prisonbridge",
      subtitle: "Audio/Video Call System",
      icon: "📡",
      description:
        "A secure real-time communication platform enabling audio and video calls for correctional facilities. Full-stack ownership from backend signaling to React UI and Electron desktop client.",
      highlights: [
        { isVisible: true, text: "Architected backend signaling services for WebRTC video calling and SIP-based audio communication." },
        { isVisible: true, text: "Built dynamic React UI: participant state displays, role-based controls, and reconnect logic." },
        { isVisible: true, text: "Integrated React Query for caching, pagination, and error fallback with background refetch strategies." },
        { isVisible: true, text: "Maintained and patched Electron desktop client builds (Windows), including auto-update flows." },
        { isVisible: true, text: "Optimized PostgreSQL queries to improve response times during peak conversation events." },
        { isVisible: true, text: "Coordinated integration testing with QA and field teams to verify real-world reliability." },
      ],
      tags: ["WebRTC", "SIP", "React", "PostgreSQL", "Electron", "Node.js", "React Query"],
    },
    {
      id: "bcuze",
      isVisible: true,
      name: "Bcuze",
      subtitle: "Microservice Field Service Management Platform",
      icon: "⚙️",
      description:
        "A distributed field service management platform built on an event-driven microservice architecture with comprehensive observability tooling.",
      highlights: [
        { isVisible: true, text: "Implemented event-driven microservice communication with NATS.io for async inter-service messaging." },
        { isVisible: true, text: "Integrated distributed tracing using Jaeger and performance monitoring via Prometheus and Grafana." },
        { isVisible: true, text: "Navigated the complexity of over-distributed service boundaries — debugging overhead, DevOps cost, and failure surfaces." },
        { isVisible: true, text: "Post-deployment architectural shift: adopted modular monolith patterns over unnecessary service splits." },
      ],
      tags: ["NATS.io", "Jaeger", "Prometheus", "Grafana", "Microservices", "Node.js", "Docker"],
    },
  ],
}
