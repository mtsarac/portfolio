import { useI18n } from '../hooks/useI18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="py-8 px-4 text-center text-sm dark:text-neutral-500 border-t dark:border-neutral-800">
      <p>© {new Date().getFullYear()} Muhammet Saraç - {t('footer.builtWith')}</p>
    </footer>
  )
}
