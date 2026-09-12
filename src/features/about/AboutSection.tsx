import { FaGraduationCap, FaGlobe, FaCode, FaServer, FaTerminal } from 'react-icons/fa6'
import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'

export function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" title={t('about.title')}>
      <div className="space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t('about.description')}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {t('about.education')}
          </h3>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <div className="pb-6">
              <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-neutral-100 text-neutral-600 mb-3 dark:bg-neutral-800 dark:text-neutral-400">
                2022 – 2026
              </span>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FaGraduationCap className="text-brand dark:text-brand-light shrink-0" size={20} />
                {t('about.university')}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                {t('about.department')} · {t('about.gpa')}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-3 leading-relaxed">
                {t('about.coursework')}
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-neutral-100 text-neutral-600 mb-3 dark:bg-neutral-800 dark:text-neutral-400">
                Feb – Jul 2025
              </span>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FaGlobe className="text-brand dark:text-brand-light shrink-0" size={20} />
                {t('about.erasmus')}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                {t('about.erasmusDesc')}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {t('about.interests')}
          </h3>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <div className="flex items-start gap-4 py-4 first:pt-0">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                <FaCode className="text-brand dark:text-brand-light" size={18} />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.fullstack')}
              </p>
            </div>
            <div className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center shrink-0">
                <FaServer className="text-emerald-600 dark:text-emerald-400" size={18} />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.devops')}
              </p>
            </div>
            <div className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center shrink-0">
                <FaTerminal className="text-amber-600 dark:text-amber-400" size={18} />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.linux')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
