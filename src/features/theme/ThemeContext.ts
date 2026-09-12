import { createContext } from 'react'
import type { ResolvedTheme, ThemeChoice } from '../../types'

export interface ThemeContextType {
  choice: ThemeChoice
  resolved: ResolvedTheme
  setTheme: (theme: ThemeChoice) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)
