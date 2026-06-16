import { createContext, useState, type ReactNode } from 'react'
import type { Language, Translations } from '../../types'
import tr from './translations/tr.json'
import en from './translations/en.json'

const translations: Record<Language, Translations> = { tr, en }

export interface I18nContextType {
  lang: Language
  t: (path: string) => string
  toggleLang: () => void
}

export const I18nContext = createContext<I18nContextType | null>(null)

function getValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('portfolio_lang')
    if (stored === 'tr' || stored === 'en') return stored
    return navigator.language.startsWith('tr') ? 'tr' : 'en'
  })

  const toggleLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    setLang(next)
    localStorage.setItem('portfolio_lang', next)
  }

  const t = (path: string) => getValue(translations[lang] as unknown as Record<string, unknown>, path)

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}
