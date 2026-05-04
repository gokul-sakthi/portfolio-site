import type { ExperienceConfig } from "../types"

export const experience: ExperienceConfig = {
  isVisible: true,
  items: [
    {
      id: "praxio",
      isVisible: true,
      role: "Backend Developer & API Integration",
      company: "Praxio IT Consulting Pvt. Ltd.",
      companyNote: "Formerly Analog and Digital Labs",
      location: "Coimbatore, Tamil Nadu",
      period: "Jul 2023 – Jan 2026",
      current: false,
      points: [
        { isVisible: true, text: "Built backend services with Node.js, Express, Prisma, and PostgreSQL serving production workloads." },
        { isVisible: true, text: "Implemented real-time and background processing using WebSockets, WebRTC, and Bull queues." },
        { isVisible: true, text: "Integrated Razorpay and Stripe payment workflows into live systems." },
        { isVisible: true, text: "Debugged and resolved production issues spanning backend, React, and Electron desktop layers." },
        { isVisible: true, text: "Managed AWS deployments (ECS/EC2/Docker) and owned environment troubleshooting." },
        { isVisible: true, text: "Mentored junior developers and drove code quality improvements across the team." },
      ],
      tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "WebRTC", "Bull", "AWS", "Docker"],
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
        { isVisible: true, text: "Built modular APIs using Nest.js, tRPC, and Zod for type-safe client-server communication." },
        { isVisible: true, text: "Implemented gRPC pipelines for high-frame-rate RTSP camera ingestion." },
        { isVisible: true, text: "Automated offer letter and payroll document generation for bulk HR workflows." },
        { isVisible: true, text: "Integrated APIs with React/Next.js front-ends, ensuring stable auth and state flows." },
        { isVisible: true, text: "Performed manual deployments on EC2 + CloudFront and documented deployment procedures." },
      ],
      tags: ["Nest.js", "tRPC", "Zod", "gRPC", "React", "Next.js", "EC2", "CloudFront"],
    },
  ],
}
