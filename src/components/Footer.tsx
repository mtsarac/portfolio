import { useI18n } from '../hooks/useI18n'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="py-8 px-4 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
      <p>© {YEAR} Muhammet Saraç - {t('footer.builtWith')}</p>
    </footer>
  )
}
