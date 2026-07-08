import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'

export function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" title={t('about.title')}>
      <div className="space-y-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-neutral-300">
            {t('about.description')}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-neutral-100">
            {t('about.education')}
          </h3>
          <div className="space-y-6">
            <div className="border-l-2 border-slate-200 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold text-slate-900 dark:text-neutral-100">
                {t('about.university')}
              </h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                {t('about.department')} - {t('about.gpa')}
              </p>
              <p className="text-sm text-slate-400 dark:text-neutral-500 mt-1">2022 – 2026</p>
            </div>
            <div className="border-l-2 border-slate-200 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold text-slate-900 dark:text-neutral-100">
                {t('about.erasmus')}
              </h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                {t('about.erasmusDesc')}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-neutral-100">
            {t('about.interests')}
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-sky-500/30 dark:border-sky-400/50 pl-4">
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t('about.fullstack')}
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 dark:border-emerald-400/50 pl-4">
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t('about.devops')}
              </p>
            </div>
            <div className="border-l-2 border-amber-500/30 dark:border-amber-400/50 pl-4">
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t('about.linux')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
