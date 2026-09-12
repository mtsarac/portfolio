import { useContext } from 'react'
import { ThemeContext } from '../features/theme/ThemeContext'
import type { ThemeContextType } from '../features/theme/ThemeContext'

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
