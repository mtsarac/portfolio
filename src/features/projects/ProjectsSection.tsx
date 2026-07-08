import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'
import SpotlightCard from '../../components/SpotlightCard'

const thesisStack = [
  { name: 'NestJS', color: '#E0234E' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Expo', color: '#000020' },
  { name: 'TypeORM', color: '#E05C2E' },
]

const homelabStack = [
  { name: 'Docker', color: '#2496ED' },
  { name: 'Traefik', color: '#EE5023' },
  { name: 'DietPi', color: '#27AE60' },
  { name: 'Raspberry Pi', color: '#A22846' },
  { name: 'Jellyfin', color: '#00A4DC' },
  { name: 'Gitea', color: '#5E2C9B' },
  { name: 'Paperless', color: '#175DDC' },
  { name: 'Cloudflared', color: '#F38020' },
]

function ProjectCard({
  label,
  title,
  desc,
  stack,
}: {
  label: string
  title: string
  desc: string
  stack: { name: string; color: string }[]
}) {
  return (
    <SpotlightCard className="rounded-lg border-neutral-700 bg-neutral-800 p-6 shadow-sm">
      <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 border border-slate-200 dark:border-neutral-600 rounded mb-4">
        {label}
      </span>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed mb-5">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-700 border border-slate-200 dark:border-neutral-600 rounded-md"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </span>
        ))}
      </div>
    </SpotlightCard>
  )
}

export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <Section id="projects" title={t('projects.title')}>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProjectCard
          label={t('projects.thesis.label')}
          title={t('projects.thesis.name')}
          desc={t('projects.thesis.desc')}
          stack={thesisStack}
        />
        <ProjectCard
          label={t('projects.hobby.label')}
          title={t('projects.hobby.name')}
          desc={t('projects.hobby.desc')}
          stack={homelabStack}
        />
      </div>
    </Section>
  )
}
