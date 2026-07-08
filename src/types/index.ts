export type Language = 'tr' | 'en'

export interface Translations {
  nav: {
    about: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    cv: string
    description: string
  }
  about: {
    title: string
    education: string
    university: string
    department: string
    gpa: string
    erasmus: string
    erasmusDesc: string
    description: string
    interests: string
    fullstack: string
    devops: string
    linux: string
  }
  skills: {
    title: string
    languages: string
    frameworks: string
    tools: string
  }
  projects: {
    title: string
    thesis: {
      label: string
      name: string
      desc: string
    }
    hobby: {
      label: string
      name: string
      desc: string
    }
  }
  contact: {
    title: string
    email: string
    phone: string
    instagram: string
  }
  footer: {
    builtWith: string
  }

}

export interface LogEvent {
  type: 'pageview' | 'event'
  name: string
  data?: Record<string, unknown>
  timestamp: string
}

export interface SkillCategory {
  title: string
  items: string[]
}

