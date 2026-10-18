export interface ProjectStackItem {
  name: string
  color: string
}

export type ProjectId = 'thesis' | 'homelab' | 'wanetra' | 'backup' | 'kaydetmail'

export interface ProjectEntry {
  projectId: ProjectId
  /** Translation namespace under `projects.` */
  i18nKey: string
  stack: ProjectStackItem[]
  href?: string
  external?: boolean
}

export const projects: ProjectEntry[] = [
  {
    projectId: 'thesis',
    i18nKey: 'thesis',
    stack: [
      { name: 'NestJS', color: '#E0234E' },
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'React Native', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Expo', color: '#000020' },
      { name: 'TypeORM', color: '#E05C2E' },
    ],
  },
  {
    projectId: 'backup',
    i18nKey: 'backup',
    stack: [
      { name: 'ASP.NET Core', color: '#512BD4' },
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'Quartz.NET', color: '#512BD4' },
      { name: 'SignalR', color: '#512BD4' },
      { name: 'MSSQL', color: '#CC2927' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Docker', color: '#2496ED' },
    ],
    href: 'https://github.com/mtsarac/backup-platform',
    external: true,
  },
  {
    projectId: 'kaydetmail',
    i18nKey: 'kaydetmail',
    stack: [
      { name: '.NET 10', color: '#512BD4' },
      { name: 'Flutter', color: '#02569B' },
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'SQLite', color: '#003B57' },
      { name: 'Docker', color: '#2496ED' },
    ],
    href: 'https://github.com/mtsarac/mail-client',
    external: true,
  },
  {
    projectId: 'homelab',
    i18nKey: 'hobby',
    stack: [
      { name: 'Docker', color: '#2496ED' },
      { name: 'Traefik', color: '#EE5023' },
      { name: 'DietPi', color: '#27AE60' },
      { name: 'Raspberry Pi', color: '#A22846' },
      { name: 'Jellyfin', color: '#00A4DC' },
      { name: 'Gitea', color: '#5E2C9B' },
      { name: 'Vaultwarden', color: '#4F46E5' },
      { name: 'SearXNG', color: '#0D9488' },
      { name: 'Cloudflared', color: '#F38020' },
    ],
  },
  {
    projectId: 'wanetra',
    i18nKey: 'wanetra',
    stack: [
      { name: '.NET', color: '#512BD4' },
      { name: 'ASP.NET Core', color: '#512BD4' },
      { name: 'React', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'SQLite', color: '#003B57' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Prometheus', color: '#E6522C' },
    ],
    href: 'https://github.com/mtsarac/Wanetra',
    external: true,
  },
]
