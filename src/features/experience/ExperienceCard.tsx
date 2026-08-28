import { FaRegCalendar, FaLocationDot, FaRegFileLines } from 'react-icons/fa6'
import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'
import SpotlightCard from '../../components/SpotlightCard'
import type { InternshipExperience } from './experienceData'

interface ExperienceCardProps {
  experience: InternshipExperience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { t } = useI18n()
  const { logger } = useLogger()

  const handleDocClick = (action: 'view' | 'download', documentType: string) => {
    logger.logEvent('experience_document_click', {
      experienceId: experience.id,
      documentType,
      action,
    })
  }

  const hasDocuments = experience.documents.length > 0

  return (
    <SpotlightCard className="rounded-lg border-neutral-800 bg-neutral-900/50 p-6 shadow-sm md:p-7">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-neutral-100">
          {t(experience.companyKey)}
        </h3>
        {experience.departmentKey && (
          <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
            {t(experience.departmentKey)}
          </p>
        )}
        {experience.programKey && (
          <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
            {t(experience.programKey)}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <FaRegCalendar className="shrink-0" size={12} aria-hidden="true" />
            {t(experience.periodKey)}
          </span>
          {experience.locationKey && (
            <>
              <span className="h-3 w-px bg-slate-200 dark:bg-neutral-700" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <FaLocationDot className="shrink-0" size={12} aria-hidden="true" />
                {t(experience.locationKey)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
        {t(experience.descriptionKey)}
      </p>

      {/* Highlights */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {experience.highlights.map((item) => (
          <div
            key={item.titleKey}
            className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/50"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100">
              {t(item.titleKey)}
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
              {t(item.descKey)}
            </p>
            {item.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex px-2 py-0.5 text-[11px] font-medium rounded border border-slate-200 bg-white text-slate-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Documents - data-driven, visually secondary */}
      {hasDocuments && (
        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-neutral-800">
          <h4 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-500">
            <FaRegFileLines size={11} aria-hidden="true" />
            {t('experience.documents')}
          </h4>
          <ul className="mt-3 space-y-2">
            {experience.documents.map((doc) => (
              <li
                key={doc.href}
                className="flex flex-col gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">
                  {t(doc.labelKey)}
                </span>
                <span className="flex items-center gap-3">
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDocClick('view', doc.type)}
                    className="text-xs font-medium text-slate-600 underline-offset-2 hover:underline dark:text-neutral-400"
                    aria-label={`${t(doc.labelKey)} - ${t('experience.view')}`}
                  >
                    {t('experience.view')}
                  </a>
                  <span className="text-slate-300 dark:text-neutral-600" aria-hidden="true">
                    |
                  </span>
                  <a
                    href={doc.href}
                    download
                    onClick={() => handleDocClick('download', doc.type)}
                    className="text-xs font-medium text-slate-600 underline-offset-2 hover:underline dark:text-neutral-400"
                    aria-label={`${t(doc.labelKey)} - ${t('experience.download')}`}
                  >
                    {t('experience.download')}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SpotlightCard>
  )
}
