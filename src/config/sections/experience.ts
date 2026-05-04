import type { ExperienceConfig } from "../types"

export const experience: ExperienceConfig = {
  isVisible: true,
  items: [
    {
      id: "praxio",
      isVisible: true,
      role: "Software Developer",
      company: "Praxio IT Consulting Pvt. Ltd.",
      companyNote: "Formerly Analog and Digital Labs",
      location: "Coimbatore, Tamil Nadu",
      period: "Jul 2023 – Jan 2026",
      current: false,
      points: [
        { isVisible: true, text: "Engineered production-grade backend services with Node.js, Express, and Prisma ORM — designed PostgreSQL schemas, managed migrations, and optimised queries for concurrent production traffic." },
        { isVisible: true, text: "Built WebRTC signaling infrastructure for real-time audio/video calling — coordinated STUN/TURN servers, handled ICE negotiation, and maintained stable peer connections under unreliable network conditions." },
        { isVisible: true, text: "Architected BullJS job queues for background processing — payment webhook handling, scheduled state transitions, and async notifications across multiple production workflows." },
        { isVisible: true, text: "Integrated Razorpay and Stripe payment flows end-to-end, including webhook signature verification, idempotency handling, and retry logic for failed transactions." },
        { isVisible: true, text: "Built and shipped Electron desktop apps for Windows — kiosk terminals with multi-step state machine UX, auto-update pipelines, and OS keychain credential storage via Keytar." },
        { isVisible: true, text: "Owned AWS environments (ECS/EC2/RDS/Docker) — deployed services, managed environment configs, and resolved production incidents spanning backend, React, and Electron layers." },
        { isVisible: true, text: "Mentored junior developers through code reviews and pair debugging; introduced OpenAPI contract-first design that eliminated client-server drift." },
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
        { isVisible: true, text: "Built modular NestJS APIs with Zod schema validation — enforced request contracts and reduced runtime errors from malformed payloads in internal tools." },
        { isVisible: true, text: "Implemented gRPC pipelines for high-frame-rate RTSP camera stream ingestion, handling connection lifecycle and backpressure from multi-source video feeds." },
        { isVisible: true, text: "Automated bulk HR document generation (offer letters, payroll summaries) — eliminated a recurring manual process that previously required hours of staff time per cycle." },
        { isVisible: true, text: "Integrated backend APIs with React and Next.js front-ends — wired up auth flows, paginated data tables, and error boundary states for consistent UX." },
        { isVisible: true, text: "Deployed and maintained services on EC2 with CloudFront distribution; documented runbooks for deployments and rollback procedures." },
      ],
      tags: ["NestJS", "Zod", "gRPC", "React", "Next.js", "EC2", "CloudFront"],
    },
  ],
}
