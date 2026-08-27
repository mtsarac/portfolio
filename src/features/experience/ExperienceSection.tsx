import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'
import AnimatedContent from '../../components/AnimatedContent'
import { ExperienceCard } from './ExperienceCard'
import { experiences } from './experienceData'

export function ExperienceSection() {
  const { t } = useI18n()

  return (
    <Section id="experience" title={t('experience.title')}>
      <div className="space-y-6">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
          {t('experience.intro')}
        </p>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <AnimatedContent
              key={exp.id}
              distance={30}
              duration={0.6}
              threshold={0.12}
              delay={idx * 0.08}
            >
              <ExperienceCard experience={exp} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </Section>
  )
}
