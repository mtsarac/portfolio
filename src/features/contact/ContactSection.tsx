import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'
import { Section } from '../../components/Section'

const contactItems = [
  { label: 'contact.email', value: 'mtsarac03@gmail.com', href: 'mailto:mtsarac03@gmail.com', type: 'email' as const },
  { label: 'contact.phone', value: '(541) 614-8690', href: 'tel:+905416148690', type: 'phone' as const },
  { label: 'GitHub', value: 'github.com/mtsarac', href: 'https://github.com/mtsarac', type: 'github' as const },
  { label: 'LinkedIn', value: 'linkedin.com/in/mtsarac', href: 'https://linkedin.com/in/mtsarac', type: 'linkedin' as const },
]

export function ContactSection() {
  const { t } = useI18n()
  const { logger } = useLogger()

  const handleClick = (type: string) => {
    logger.logEvent('contact_click', { type })
  }

  return (
    <Section id="contact" title={t('contact.title')}>
      <div className="max-w-md mx-auto space-y-4">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => handleClick(item.type)}
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-transparent border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group shadow-sm"
          >
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {item.label.startsWith('contact.') ? t(item.label) : item.label}
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {item.value}
            </span>
          </a>
        ))}

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-500 mt-6">
          {t('contact.location')}
        </p>
      </div>
    </Section>
  )
}
