import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'

export function LangToggle() {
  const { lang, toggleLang } = useI18n()
  const { logger } = useLogger()

  const handleToggle = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    logger.logEvent('lang_toggle', { lang: next })
    toggleLang()
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1.5 text-sm font-medium rounded-lg border dark:border-neutral-600 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      aria-label={lang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
    >
      {lang === 'tr' ? 'EN' : 'TR'}
    </button>
  )
}
