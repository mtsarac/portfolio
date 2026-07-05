import { useI18n } from '../hooks/useI18n'
import { ThemeToggle } from '../features/theme/ThemeToggle'
import { LangToggle } from '../features/i18n/LangToggle'
import { useEffect, useState } from 'react'

const NAV_ITEMS = ['about', 'skills', 'contact'] as const

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled ? 'shadow-sm bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#hero" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100" onClick={close}>
          MS
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
          <div className="flex items-center gap-2 ml-2 border-l border-neutral-300 dark:border-neutral-700 pl-3">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <button
          className="sm:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={close}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
