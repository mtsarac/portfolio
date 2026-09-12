import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { ResolvedTheme, ThemeChoice } from '../../types'
import { ThemeContext } from './ThemeContext'

const STORAGE_KEY = 'portfolio_theme'

function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice !== 'system') return choice
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStored(): ThemeChoice {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ThemeChoice>(getStored)
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(getStored()))

  useEffect(() => {
    const update = () => setResolved(resolveTheme(choice))
    update()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [choice])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  const setTheme = useCallback((next: ThemeChoice) => {
    setChoice(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return (
    <ThemeContext.Provider value={{ choice, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
