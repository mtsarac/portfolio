import { useEffect, useRef } from 'react'
import type { LoggingService } from '../features/logging/LoggingService'

const MILESTONES = [30, 60, 120] as const

export function useTimeOnPage(logger: LoggingService): void {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    for (const seconds of MILESTONES) {
      const id = setTimeout(() => {
        logger.logEvent('time_on_page', { seconds })
      }, seconds * 1000)
      timers.current.push(id)
    }

    return () => {
      for (const id of timers.current) clearTimeout(id)
      timers.current = []
    }
  }, [logger])
}
