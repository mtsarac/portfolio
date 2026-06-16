import { createContext, type ReactNode } from 'react'
import type { LoggingService } from './LoggingService'
import { UmamiLogger } from './UmamiLogger'

export interface LoggingContextType {
  logger: LoggingService
}

export const LoggingContext = createContext<LoggingContextType | null>(null)

const noopLogger: LoggingService = {
  log() {},
  logPageView() {},
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
  const logger = createLogger()

  return (
    <LoggingContext.Provider value={{ logger }}>
      {children}
    </LoggingContext.Provider>
  )
}
