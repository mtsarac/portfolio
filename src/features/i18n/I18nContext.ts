import { createContext } from 'react'
import type { Language, Translations } from '../../types'

export interface I18nContextType {
  lang: Language
  t: (path: string) => string
  toggleLang: () => void
}

export const I18nContext = createContext<I18nContextType | null>(null)

// Provide consistent type mapping for tests/docs if needed
export type { Language, Translations }
