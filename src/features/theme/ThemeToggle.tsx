import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa6'
import { useTheme } from '../../hooks/useTheme'
import { useLogger } from '../../hooks/useLogger'
import type { ThemeChoice } from '../../types'

const ORDER: ThemeChoice[] = ['system', 'light', 'dark']

const ICONS = {
  system: FaDesktop,
  light: FaSun,
  dark: FaMoon,
} as const

const LABELS = {
  system: 'System theme (follows OS)',
  light: 'Light theme',
  dark: 'Dark theme',
} as const

export function ThemeToggle() {
  const { choice, setTheme } = useTheme()
  const { logger } = useLogger()

  const handleToggle = () => {
    const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length]
    setTheme(next)
    logger.logEvent('theme_change', { theme: next })
  }

  const Icon = ICONS[choice]

  return (
    <button
      onClick={handleToggle}
      className="p-2 text-sm rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      aria-label={`${LABELS[choice]} - switch theme`}
      title={LABELS[choice]}
    >
      <Icon size={15} />
    </button>
  )
}
