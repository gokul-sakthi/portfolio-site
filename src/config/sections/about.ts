import type { AboutConfig } from "../types"

export const about: AboutConfig = {
  isVisible: true,

  summary:
    "Backend engineer with 3+ years shipping production systems — modular monolith APIs, real-time communication layers, payment integrations, and Electron desktop apps deployed in the field.",

  highlights: [
    {
      id: "backend",
      isVisible: true,
      icon: "⬡",
      title: "Backend & API Design",
      description: "Node.js, NestJS, Express with Prisma ORM and PostgreSQL. Designed maintainable schemas, efficient query patterns, and modular service structures for production workloads.",
    },
    {
      id: "database",
      isVisible: true,
      icon: "◉",
      title: "Database Engineering",
      description: "PostgreSQL as primary data store across every product — schema design, Prisma migrations, index strategy, and query optimisation under concurrent production traffic.",
    },
    {
      id: "realtime",
      isVisible: true,
      icon: "⚡",
      title: "Real-time & Queues",
      description: "WebRTC signaling with STUN/TURN coordination, WebSockets for live state sync, and BullJS job queues for background processing and async workflows.",
    },
    {
      id: "desktop",
      isVisible: true,
      icon: "◈",
      title: "Desktop & Kiosk Apps",
      description: "Electron apps for Windows — kiosk state machine UX, auto-update flows, OS keychain credential storage, and OpenAPI-driven backend integration.",
    },
    {
      id: "integrations",
      isVisible: true,
      icon: "⇄",
      title: "Payments & Integrations",
      description: "Razorpay and Stripe payment workflows end-to-end, including webhook verification and failure recovery. Third-party API integration in live production systems.",
    },
    {
      id: "ownership",
      isVisible: true,
      icon: "◎",
      title: "Ownership & Delivery",
      description: "Owned production incidents end-to-end across backend, React, and Electron layers. Mentored junior developers and drove code quality improvements across the team.",
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
    { isVisible: true, value: "3+",  label: "Years in Production" },
    { isVisible: true, value: "3",   label: "Shipped Products" },
    { isVisible: true, value: "BE+", label: "Backend Focus" },
    { isVisible: true, value: "AWS", label: "Cloud Deployed" },
  ],
}
