import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useI18n } from '../../hooks/useI18n'
import { useLogger } from '../../hooks/useLogger'
import { Section } from '../../components/Section'

const contactItems: { label: string; href: string; type: string; icon: IconType; color: string }[] = [
  { label: 'contact.email', href: 'mailto:mtsarac03@gmail.com', type: 'email', icon: FaEnvelope, color: '#EA4335' },
  { label: 'contact.phone', href: 'tel:+905416148690', type: 'phone', icon: FaPhone, color: '#22C55E' },
  { label: 'GitHub', href: 'https://github.com/mtsarac', type: 'github', icon: FaGithub, color: '#888' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mtsarac', type: 'linkedin', icon: FaLinkedin, color: '#0A66C2' },
  { label: 'contact.instagram', href: 'https://www.instagram.com/mtsarac0/', type: 'instagram', icon: FaInstagram, color: '#E4405F' },
]

export function ContactSection() {
  const { t } = useI18n()
  const { logger } = useLogger()

  const handleClick = (type: string, href: string) => {
    logger.logEvent('contact_click', { type, href })
  }

  return (
    <Section id="contact" title={t('contact.title')}>
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* open to work badge */}
        <div className="flex items-center justify-center gap-2 -mt-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-500">{t('contact.openToWork')}</span>
        </div>

        {/* intro sentence */}
        <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
          {t('contact.intro')}
        </p>

        {/* icon row */}
        <div className="flex items-center justify-center gap-5 pt-2">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => handleClick(item.type, item.href)}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 hover:shadow-md transition-all"
              style={{ color: item.color }}
              title={item.label.startsWith('contact.') ? t(item.label) : item.label}
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-neutral-500">
          {t('contact.location')}
        </p>
      </div>
    </Section>
  )
}
