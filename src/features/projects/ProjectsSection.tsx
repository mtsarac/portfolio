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
  { name: 'Vaultwarden', color: '#4F46E5' },
  { name: 'SearXNG', color: '#0D9488' },
  { name: 'Cloudflared', color: '#F38020' },
]

function ProjectCard({
  label,
  title,
  desc,
  stack,
  destination,
}: {
  label: string
  title: string
  desc: string
  stack: { name: string; color: string }[]
  destination: string
}) {
  return (
    <SpotlightCard className="rounded-lg border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 border border-neutral-300 rounded mb-4 dark:border-neutral-600">
        {label}
      </span>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 border border-neutral-200 rounded-md dark:text-neutral-300 dark:bg-neutral-700 dark:border-neutral-600"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        {destination}
      </p>
    </SpotlightCard>
  )
}

export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <Section id="projects" title={t('projects.title')} align="left" width="wide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProjectCard
          label={t('projects.thesis.label')}
          title={t('projects.thesis.name')}
          desc={t('projects.thesis.desc')}
          stack={thesisStack}
          destination={t('projects.thesis.destination')}
        />
        <ProjectCard
          label={t('projects.hobby.label')}
          title={t('projects.hobby.name')}
          desc={t('projects.hobby.desc')}
          stack={homelabStack}
          destination={t('projects.hobby.destination')}
        />
      </div>
    </Section>
  )
}
