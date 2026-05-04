import type { ExperienceConfig } from "../types"

export const experience: ExperienceConfig = {
  isVisible: true,
  items: [
    {
      id: "praxio",
      isVisible: true,
      role: "Software Developer",
      company: "Praxio IT Consulting Pvt. Ltd.",
      companyNote: "Sibling company of Analog and Digital Labs",
      location: "Coimbatore, Tamil Nadu",
      period: "Jul 2023 – Jan 2026",
      current: false,
      points: [
        { isVisible: true, text: "Node.js & Prisma APIs: PostgreSQL schema design, migrations, and query optimisation for concurrent production traffic." },
        { isVisible: true, text: "WebRTC signaling: STUN/TURN coordination, ICE negotiation, and stable peer connections under unreliable network conditions." },
        { isVisible: true, text: "BullJS job queues: payment webhook handling, scheduled state transitions, and async notifications across production workflows." },
        { isVisible: true, text: "Payment integrations: Razorpay and Stripe end-to-end with webhook verification, idempotency handling, and retry logic." },
        { isVisible: true, text: "Electron desktop apps: Windows kiosk terminals with state machine UX, auto-update pipelines, and OS keychain credential storage." },
        { isVisible: true, text: "AWS ownership: ECS/EC2/RDS/Docker deployments, environment configs, and production incident resolution across backend, React, and Electron." },
        { isVisible: true, text: "Team & process: mentored junior devs through code reviews, and introduced OpenAPI contract-first design to eliminate client-server drift." },
      ],
      tags: ["Node.js", "PostgreSQL", "Prisma", "BullJS", "WebRTC", "Electron", "AWS", "OpenAPI"],
    },
    {
      id: "adl",
      isVisible: true,
      role: "Junior Backend Developer",
      company: "Analog & Digital Labs India Pvt. Ltd.",
      companyNote: "",
      location: "Coimbatore, Tamil Nadu",
      period: "Jun 2022 – Jun 2023",
      current: false,
      points: [
        { isVisible: true, text: "NestJS APIs: Zod schema validation, enforced request contracts, and reduced runtime errors from malformed payloads." },
        { isVisible: true, text: "gRPC pipelines: high-frame-rate RTSP camera stream ingestion with connection lifecycle and backpressure handling." },
        { isVisible: true, text: "HR doc automation: bulk offer letters and payroll summaries, eliminating hours of manual work per cycle." },
        { isVisible: true, text: "Frontend integration: React and Next.js wiring for auth flows, paginated data tables, and error boundary states." },
        { isVisible: true, text: "EC2 & CloudFront: service deployment, maintenance, and runbook documentation for deployments and rollbacks." },
      ],
      tags: ["NestJS", "Zod", "gRPC", "React", "Next.js", "EC2", "CloudFront"],
    },
  ],
}
