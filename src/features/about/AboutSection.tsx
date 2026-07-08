import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'

export function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" title={t('about.title')}>
      <div className="space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed dark:text-neutral-300">
            {t('about.description')}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 dark:text-neutral-100">
            {t('about.education')}
          </h3>
          <div className="space-y-6">
            <div className="border-l-2 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold dark:text-neutral-100">
                {t('about.university')}
              </h4>
              <p className="text-sm dark:text-neutral-400">
                {t('about.department')} - {t('about.gpa')}
              </p>
              <p className="text-sm dark:text-neutral-500 mt-1">2022 – 2026</p>
              <p className="text-xs dark:text-neutral-500 mt-3 leading-relaxed max-w-prose">
                {t('about.coursework')}
              </p>
            </div>
            <div className="border-l-2 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold dark:text-neutral-100">
                {t('about.erasmus')}
              </h4>
              <p className="text-sm dark:text-neutral-400">
                {t('about.erasmusDesc')}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 dark:text-neutral-100">
            {t('about.interests')}
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 dark:border-sky-400/50 pl-4">
              <p className="text-sm dark:text-neutral-400 leading-relaxed">
                {t('about.fullstack')}
              </p>
            </div>
            <div className="border-l-2 dark:border-emerald-400/50 pl-4">
              <p className="text-sm dark:text-neutral-400 leading-relaxed">
                {t('about.devops')}
              </p>
            </div>
            <div className="border-l-2 dark:border-amber-400/50 pl-4">
              <p className="text-sm dark:text-neutral-400 leading-relaxed">
                {t('about.linux')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
