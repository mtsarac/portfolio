import { FaGithub } from 'react-icons/fa6'
import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'
import { Section } from '../../components/Section'
import SpotlightCard from '../../components/SpotlightCard'
import { projects, type ProjectId, type ProjectStackItem } from './projectsData'

function ProjectCard({
  projectId,
  label,
  title,
  desc,
  stack,
  destination,
  cta,
  href = '#contact',
  external = false,
}: {
  projectId: ProjectId
  label: string
  title: string
  desc: string
  stack: ProjectStackItem[]
  destination: string
  cta: string
  href?: string
  external?: boolean
}) {
  const { lang } = useI18n()
  const { logger } = useLogger()

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
      <ul role="list" className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech.name}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 border border-neutral-200 rounded-md dark:text-neutral-300 dark:bg-neutral-700 dark:border-neutral-600"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: tech.color }}
              aria-hidden="true"
            />
            {tech.name}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-neutral-500">
        {destination}
      </p>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={() =>
          logger.logEvent('project_interest', {
            project: projectId,
            target: external ? 'github' : 'contact',
            lang,
          })
        }
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline dark:text-brand-light"
      >
        {external && <FaGithub size={14} />}
        {cta} {"->"}
      </a>
    </SpotlightCard>
  )
}

export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <Section id="projects" title={t('projects.title')} align="left" width="wide">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(({ projectId, i18nKey, stack, href, external }) => (
          <ProjectCard
            key={projectId}
            projectId={projectId}
            label={t(`projects.${i18nKey}.label`)}
            title={t(`projects.${i18nKey}.name`)}
            desc={t(`projects.${i18nKey}.desc`)}
            stack={stack}
            destination={t(`projects.${i18nKey}.destination`)}
            cta={t(`projects.${i18nKey}.cta`)}
            href={href}
            external={external}
          />
        ))}
      </div>
    </Section>
  )
}
