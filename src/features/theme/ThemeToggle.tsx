import { useTheme } from '../../hooks/useTheme'
import { useLogger } from '../../hooks/useLogger'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { logger } = useLogger()

  const handleToggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    logger.logEvent('theme_toggle', { theme: next })
    toggleTheme()
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-neutral-600 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
