import { useEffect, useRef } from 'react'
import type { LoggingService } from '../features/logging/LoggingService'

const MILESTONES = [25, 50, 75, 100] as const

export function useScrollDepth(logger: LoggingService): void {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const percent = Math.round((scrollTop / docHeight) * 100)

      for (const m of MILESTONES) {
        if (percent >= m && !fired.current.has(m)) {
          fired.current.add(m)
          logger.logEvent('scroll_depth', { depth: m })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [logger])
}
