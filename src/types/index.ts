export type Language = 'tr' | 'en'

export interface Translations {
  nav: {
    about: string
    projects: string
    skills: string
    experience: string
    contact: string
  }
  experience: {
    title: string
    intro: string
    documents: string
    certificate: string
    referenceLetter: string
    view: string
    download: string
    viewDownload: string
    adm: {
      company: string
      department: string
      period: string
      location: string
      description: string
      highlights: {
        inventory: { title: string; desc: string }
        crm: { title: string; desc: string }
        enterprise: { title: string; desc: string }
        massguard: { title: string; desc: string }
      }
    }
    tnc: {
      company: string
      program: string
      period: string
      description: string
      highlights: {
        python: { title: string; desc: string }
        excel: { title: string; desc: string }
        autocad: { title: string; desc: string }
        blender: { title: string; desc: string }
      }
    }
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
    coursework: string
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
      destination: string
    }
    hobby: {
      label: string
      name: string
      desc: string
      destination: string
    }
  }
  contact: {
    title: string
    email: string
    phone: string
    instagram: string
    location: string
    openToWork: string
    intro: string
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

