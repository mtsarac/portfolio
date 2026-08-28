export type ExperienceDocumentType = 'certificate' | 'reference' | 'other'

export interface ExperienceDocument {
  type: ExperienceDocumentType
  labelKey: string
  href: string
}

export interface ExperienceHighlight {
  titleKey: string
  descKey: string
  skills: string[]
}

export interface InternshipExperience {
  id: string
  companyKey: string
  departmentKey?: string
  programKey?: string
  periodKey: string
  locationKey?: string
  descriptionKey: string
  highlights: ExperienceHighlight[]
  documents: ExperienceDocument[]
}

export const experiences: InternshipExperience[] = [
  {
    id: 'adm',
    companyKey: 'experience.adm.company',
    departmentKey: 'experience.adm.department',
    periodKey: 'experience.adm.period',
    locationKey: 'experience.adm.location',
    descriptionKey: 'experience.adm.description',
    highlights: [
      {
        titleKey: 'experience.adm.highlights.inventory.title',
        descKey: 'experience.adm.highlights.inventory.desc',
        skills: ['PostgreSQL', 'SQL', 'Database Design', 'ER Modeling'],
      },
      {
        titleKey: 'experience.adm.highlights.crm.title',
        descKey: 'experience.adm.highlights.crm.desc',
        skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Business Analysis'],
      },
      {
        titleKey: 'experience.adm.highlights.enterprise.title',
        descKey: 'experience.adm.highlights.enterprise.desc',
        skills: ['SAP ERP', 'Jira', 'Qlik', 'Enterprise IT'],
      },
      {
        titleKey: 'experience.adm.highlights.massguard.title',
        descKey: 'experience.adm.highlights.massguard.desc',
        skills: ['Machine Learning', 'Time Series', 'Anomaly Detection', 'React'],
      },
    ],
    documents: [
      {
        type: 'certificate',
        labelKey: 'experience.certificate',
        href: '/documents/internships/adm/internship-certificate.pdf',
      },
    ],
  },
  {
    id: 'tnc',
    companyKey: 'experience.tnc.company',
    programKey: 'experience.tnc.program',
    periodKey: 'experience.tnc.period',
    descriptionKey: 'experience.tnc.description',
    highlights: [
      {
        titleKey: 'experience.tnc.highlights.python.title',
        descKey: 'experience.tnc.highlights.python.desc',
        skills: ['Python', 'JSON'],
      },
      {
        titleKey: 'experience.tnc.highlights.excel.title',
        descKey: 'experience.tnc.highlights.excel.desc',
        skills: ['Excel', 'PivotTable', 'Dashboard', 'Data Analysis'],
      },
      {
        titleKey: 'experience.tnc.highlights.autocad.title',
        descKey: 'experience.tnc.highlights.autocad.desc',
        skills: ['AutoCAD'],
      },
      {
        titleKey: 'experience.tnc.highlights.blender.title',
        descKey: 'experience.tnc.highlights.blender.desc',
        skills: ['Blender', '3D Modeling'],
      },
    ],
    documents: [
      {
        type: 'certificate',
        labelKey: 'experience.certificate',
        href: '/documents/internships/tnc/certificate.pdf',
      },
      {
        type: 'reference',
        labelKey: 'experience.referenceLetter',
        href: '/documents/internships/tnc/reference-letter.pdf',
      },
    ],
  },
]
