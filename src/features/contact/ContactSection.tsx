import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'
import { Section } from '../../components/Section'

interface ContactItem {
  label: string
  value: string
  href: string
  type: string
  icon: IconType
}

const contactItems: ContactItem[] = [
  { label: 'contact.email', value: 'mtsarac03@gmail.com', href: 'mailto:mtsarac03@gmail.com', type: 'email' as const, icon: FaEnvelope },
  { label: 'contact.phone', value: '(541) 614-8690', href: 'tel:+905416148690', type: 'phone' as const, icon: FaPhone },
  { label: 'GitHub', value: 'github.com/mtsarac', href: 'https://github.com/mtsarac', type: 'github' as const, icon: FaGithub },
  { label: 'LinkedIn', value: 'linkedin.com/in/mtsarac', href: 'https://linkedin.com/in/mtsarac', type: 'linkedin' as const, icon: FaLinkedin },
  { label: 'contact.instagram', value: 'instagram.com/mtsarac0', href: 'https://www.instagram.com/mtsarac0/', type: 'instagram' as const, icon: FaInstagram },
]

export function ContactSection() {
  const { t } = useI18n()
  const { logger } = useLogger()

  const handleClick = (type: string, href: string) => {
    logger.logEvent('contact_click', { type, href })
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
            onClick={() => handleClick(item.type, item.href)}
            className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-transparent border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors group shadow-sm"
          >
            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400">
              <item.icon className="shrink-0" size={18} />
              {item.label.startsWith('contact.') ? t(item.label) : item.label}
            </span>
            <span className="font-medium text-slate-900 dark:text-neutral-100 group-hover:text-slate-600 dark:group-hover:text-sky-400 transition-colors">
              {item.value}
            </span>
          </a>
        ))}

        <p className="text-center text-sm text-slate-500 dark:text-neutral-500 mt-6">
          {t('contact.location')}
        </p>
      </div>
    </Section>
  )
}
