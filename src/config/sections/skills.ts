import type { SkillsConfig } from "../types"

export const skills: SkillsConfig = {
  isVisible: true,
  groups: [
    {
      id: "backend",
      isVisible: true,
      label: "Backend",
      icon: "⬡",
      skills: [
        { isVisible: true, name: "Node.js" },
        { isVisible: true, name: "NestJS" },
        { isVisible: true, name: "Express" },
        { isVisible: true, name: "PostgreSQL" },
        { isVisible: true, name: "Prisma ORM" },
        { isVisible: true, name: "BullJS" },
        { isVisible: true, name: "Redis" },
      ],
    },
    {
      id: "frontend",
      isVisible: true,
      label: "Frontend",
      icon: "◈",
      skills: [
        { isVisible: true, name: "React" },
        { isVisible: true, name: "TypeScript" },
        { isVisible: true, name: "React Query" },
        { isVisible: true, name: "Zustand" },
        { isVisible: true, name: "ShadCN UI" },
        { isVisible: true, name: "Next.js" },
      ],
    },
    {
      id: "architecture",
      isVisible: true,
      label: "Architecture",
      icon: "◉",
      skills: [
        { isVisible: true, name: "Modular Monolith" },
        { isVisible: true, name: "OpenAPI / Contract-first" },
        { isVisible: true, name: "REST APIs" },
        { isVisible: true, name: "WebRTC (STUN/TURN)" },
        { isVisible: true, name: "WebSockets" },
        { isVisible: true, name: "tRPC" },
      ],
    },
    {
      id: "devops",
      isVisible: true,
      label: "Tools & Desktop",
      icon: "⬗",
      skills: [
        { isVisible: true, name: "Electron" },
        { isVisible: true, name: "Docker" },
        { isVisible: true, name: "Git" },
        { isVisible: true, name: "PM2" },
        { isVisible: true, name: "Postman" },
        { isVisible: true, name: "Zod" },
      ],
    },
    {
      id: "cloud",
      isVisible: true,
      label: "Cloud (AWS)",
      icon: "☁",
      skills: [
        { isVisible: true, name: "EC2" },
        { isVisible: true, name: "ECS" },
        { isVisible: true, name: "RDS" },
        { isVisible: true, name: "S3" },
        { isVisible: true, name: "CloudFront" },
        { isVisible: true, name: "CloudWatch" },
      ],
    },
    {
      id: "observability",
      isVisible: true,
      label: "Observability",
      icon: "◎",
      skills: [
        { isVisible: true, name: "Jaeger" },
        { isVisible: true, name: "Prometheus" },
        { isVisible: true, name: "Grafana" },
      ],
    },
  ],
}
