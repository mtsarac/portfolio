import { useEffect, useRef } from 'react'
import type { LoggingService } from '../features/logging/LoggingService'

const MILESTONES = [30, 60, 120] as const

export function useEngagementTime(logger: LoggingService): void {
  const elapsed = useRef(0)
  const fired = useRef<Set<number>>(new Set<number>())
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const tick = () => {
      elapsed.current += 1
      for (const seconds of MILESTONES) {
        if (elapsed.current === seconds && !fired.current.has(seconds)) {
          fired.current.add(seconds)
          logger.logEvent('engagement_time', { seconds })
        }
      }
      if (fired.current.size === MILESTONES.length) {
        if (intervalId.current !== null) {
          clearInterval(intervalId.current)
          intervalId.current = null
        }
      }
    }

    const start = () => {
      if (intervalId.current !== null) return
      intervalId.current = setInterval(tick, 1000)
    }

    const stop = () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current)
        intervalId.current = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        start()
      } else {
        stop()
      }
    }

    if (document.visibilityState === 'visible') {
      start()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [logger])
}
