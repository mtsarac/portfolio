import { useMemo, type ReactNode } from 'react'
import type { LoggingService } from './LoggingService'
import { UmamiLogger } from './UmamiLogger'
import { LoggingContext } from './LoggingContext'

const noopLogger: LoggingService = {
  log() {},
  logEvent() {},
}

function createLogger(): LoggingService {
  const siteId = import.meta.env.VITE_UMAMI_SITE_ID
  const umamiUrl = import.meta.env.VITE_UMAMI_URL

  if (siteId && umamiUrl) {
    return new UmamiLogger(siteId, umamiUrl)
  }

  return noopLogger
}

export function LoggingProvider({ children }: { children: ReactNode }) {
  const logger = useMemo(() => createLogger(), [])

  return (
    <LoggingContext.Provider value={{ logger }}>
      {children}
    </LoggingContext.Provider>
  )
}
