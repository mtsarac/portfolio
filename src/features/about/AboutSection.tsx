import { FaGraduationCap, FaGlobe, FaCode, FaServer, FaTerminal } from 'react-icons/fa6'
import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'
import SpotlightCard from '../../components/SpotlightCard'

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
            <SpotlightCard className="rounded-lg border-neutral-800 bg-neutral-900/50 p-5">
              <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-neutral-800 text-neutral-400 mb-3">
                2022 – 2026
              </span>
              <h4 className="text-lg font-semibold dark:text-neutral-100 flex items-center gap-2">
                <FaGraduationCap className="text-sky-400 shrink-0" size={20} />
                {t('about.university')}
              </h4>
              <p className="text-sm dark:text-neutral-400 mt-0.5">
                {t('about.department')} · {t('about.gpa')}
              </p>
              <p className="text-xs dark:text-neutral-500 mt-3 leading-relaxed">
                {t('about.coursework')}
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-lg border-neutral-800 bg-neutral-900/50 p-5">
              <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-neutral-800 text-neutral-400 mb-3">
                Feb – Jul 2025
              </span>
              <h4 className="text-lg font-semibold dark:text-neutral-100 flex items-center gap-2">
                <FaGlobe className="text-emerald-400 shrink-0" size={20} />
                {t('about.erasmus')}
              </h4>
              <p className="text-sm dark:text-neutral-400 mt-0.5 leading-relaxed">
                {t('about.erasmusDesc')}
              </p>
            </SpotlightCard>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 dark:text-neutral-100">
            {t('about.interests')}
          </h3>
          <div className="divide-y divide-neutral-800">
            <div className="flex items-start gap-4 py-4 first:pt-0">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center shrink-0">
                <FaCode className="text-sky-400" size={18} />
              </div>
              <p className="text-sm dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.fullstack')}
              </p>
            </div>
            <div className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                <FaServer className="text-emerald-400" size={18} />
              </div>
              <p className="text-sm dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.devops')}
              </p>
            </div>
            <div className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
                <FaTerminal className="text-amber-400" size={18} />
              </div>
              <p className="text-sm dark:text-neutral-400 leading-relaxed pt-1.5">
                {t('about.linux')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
