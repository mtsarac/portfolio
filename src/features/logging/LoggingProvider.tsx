import { useEffect, useMemo, type ReactNode } from 'react'
import type { LoggingService } from './LoggingService'
import { UmamiLogger } from './UmamiLogger'
import { LoggingContext } from './LoggingContext'

const noopLogger: LoggingService = {
  log() {},
  logEvent() {},
  initialize() {},
}

function createLogger(): LoggingService {
  const siteId = import.meta.env.VITE_UMAMI_SITE_ID
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL

  if (siteId && scriptUrl) {
    return new UmamiLogger(siteId, scriptUrl)
  }

  return noopLogger
}

export function LoggingProvider({ children }: { children: ReactNode }) {
  const logger = useMemo(() => createLogger(), [])

  useEffect(() => {
    logger.initialize()
  }, [logger])

  return (
    <LoggingContext.Provider value={{ logger }}>
      {children}
    </LoggingContext.Provider>
  )
}
