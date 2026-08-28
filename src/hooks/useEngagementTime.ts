import { useEffect, useRef } from 'react'
import type { LoggingService } from '../features/logging/LoggingService'

const MILESTONES = [30, 60, 120] as const

const now = (): number =>
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now()

export function useEngagementTime(logger: LoggingService): void {
  const elapsed = useRef(0)
  const fired = useRef<Set<number>>(new Set<number>())
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastTick = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const current = now()
      const previous = lastTick.current ?? current
      const deltaSec = (current - previous) / 1000
      lastTick.current = current
      elapsed.current += deltaSec

      for (const seconds of MILESTONES) {
        if (elapsed.current >= seconds && !fired.current.has(seconds)) {
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
      lastTick.current = now()
      intervalId.current = setInterval(tick, 1000)
    }

    const stop = () => {
      if (intervalId.current !== null) {
        const current = now()
        const previous = lastTick.current
        if (previous !== null) {
          const deltaSec = (current - previous) / 1000
          elapsed.current += deltaSec
          for (const seconds of MILESTONES) {
            if (elapsed.current >= seconds && !fired.current.has(seconds)) {
              fired.current.add(seconds)
              logger.logEvent('engagement_time', { seconds })
            }
          }
        }
        clearInterval(intervalId.current)
        intervalId.current = null
      }
      lastTick.current = null
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
