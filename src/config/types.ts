export interface VisibilityNode {
  isVisible: boolean
}

export interface StatItem extends VisibilityNode {
  value: string
  label: string
}

export interface SkillItem extends VisibilityNode {
  name: string
}

export interface SkillGroup extends VisibilityNode {
  id: string
  label: string
  icon: string
  skills: SkillItem[]
}

export interface BulletPoint extends VisibilityNode {
  text: string
}

export interface ExperienceItem extends VisibilityNode {
  id: string
  role: string
  company: string
  companyNote: string
  location: string
  period: string
  current: boolean
  points: BulletPoint[]
  tags: string[]
}

export interface ProjectItem extends VisibilityNode {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
  link?: string
  images?: string[]
  highlights: BulletPoint[]
  tags: string[]
}

export interface EducationItem extends VisibilityNode {
  id: string
  degree: string
  institution: string
  period: string
  gpa: string
}

export interface MetaConfig {
  name: string
  firstName: string
  lastName: string
  title: string
  location: string
  github: string
  linkedin: string
}

export interface HeroConfig extends VisibilityNode {
  availability: VisibilityNode & { text: string }
  typewriterTitles: string[]
  summaryLine: string
  tagline: string
}

export interface AboutHighlight extends VisibilityNode {
  id: string
  icon: string
  title: string
  description: string
}

export interface AboutConfig extends VisibilityNode {
  summary: string
  paragraphs: Array<VisibilityNode & { html: string }>
  highlights: AboutHighlight[]
  stats: StatItem[]
}

export interface SkillsConfig extends VisibilityNode {
  groups: SkillGroup[]
}

export interface ExperienceConfig extends VisibilityNode {
  items: ExperienceItem[]
}

export interface ProjectsConfig extends VisibilityNode {
  items: ProjectItem[]
}

export interface EducationConfig extends VisibilityNode {
  items: EducationItem[]
}

export interface ContactConfig extends VisibilityNode {
  heading: string
  body: string
}

export interface FooterConfig extends VisibilityNode {
  credit: string
}

export interface PortfolioConfig {
  meta: MetaConfig
  hero: HeroConfig
  about: AboutConfig
  skills: SkillsConfig
  experience: ExperienceConfig
  projects: ProjectsConfig
  education: EducationConfig
  contact: ContactConfig
  footer: FooterConfig
}
