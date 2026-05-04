import type { AboutConfig } from "../types"

export const about: AboutConfig = {
  isVisible: true,

  summary:
    "Backend-focused engineer who builds things that run in production — real-time systems, payment flows, cloud infrastructure, and the tooling teams rely on daily.",

  highlights: [
    {
      id: "backend",
      isVisible: true,
      icon: "⬡",
      title: "Backend & APIs",
      description: "Node.js, NestJS, Express, Prisma, PostgreSQL, Redis — from modular REST APIs to type-safe tRPC services.",
    },
    {
      id: "realtime",
      isVisible: true,
      icon: "⚡",
      title: "Real-time Systems",
      description: "WebSockets, WebRTC signaling, SIP audio, Bull queues — built and maintained live communication platforms.",
    },
    {
      id: "cloud",
      isVisible: true,
      icon: "☁",
      title: "Cloud & DevOps",
      description: "AWS deployments (ECS/EC2/RDS), Docker, CloudFront, CloudWatch — owned environments end-to-end.",
    },
    {
      id: "integrations",
      isVisible: true,
      icon: "⇄",
      title: "Payments & Integrations",
      description: "Razorpay and Stripe workflows, gRPC pipelines, third-party API integration in production systems.",
    },
    {
      id: "observability",
      isVisible: true,
      icon: "◎",
      title: "Observability",
      description: "Jaeger distributed tracing, Prometheus metrics, Grafana dashboards — diagnosed latency across microservices.",
    },
    {
      id: "ownership",
      isVisible: true,
      icon: "◈",
      title: "Ownership & Mentorship",
      description: "Handled production incidents across backend, React, and Electron layers. Mentored junior developers.",
    },
  ],

  // Kept for potential use elsewhere; not shown in the redesigned section
  paragraphs: [
    {
      isVisible: false,
      html: `I'm a <strong>Fullstack Developer with a backend focus</strong>, specializing in building production-grade systems that handle real-world complexity — from real-time audio/video pipelines to payment integrations and cloud deployments.`,
    },
    {
      isVisible: false,
      html: `I've worked extensively with <code>Node.js</code>, <code>PostgreSQL</code>, <code>Docker</code>, and <code>AWS</code>. I've navigated the full complexity of microservices and come out with a strong preference for <strong>simpler, maintainable architectures</strong> informed by real production learnings.`,
    },
    {
      isVisible: false,
      html: `Beyond code, I've mentored junior developers, coordinated with QA teams, and owned production incidents end-to-end.`,
    },
  ],

  stats: [
    { isVisible: true, value: "3+",   label: "Years Experience" },
    { isVisible: true, value: "2",    label: "Production Products" },
    { isVisible: true, value: "Full", label: "Stack Coverage" },
    { isVisible: true, value: "AWS",  label: "Cloud Deployed" },
  ],
}
