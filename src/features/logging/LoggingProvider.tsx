import { createContext, type ReactNode } from 'react'
import { LoggingService } from './LoggingService'
import { UmamiLogger } from './UmamiLogger'
import type { LogEvent } from '../../types'

export interface LoggingContextType {
  logger: LoggingService
}

export const LoggingContext = createContext<LoggingContextType | null>(null)

class NoopLogger extends LoggingService {
  log(_event: LogEvent): void {}
}

function createLogger(): LoggingService {
  const siteId = import.meta.env.VITE_UMAMI_SITE_ID
  const umamiUrl = import.meta.env.VITE_UMAMI_URL

  if (siteId && umamiUrl) {
    return new UmamiLogger(siteId, umamiUrl)
  }

  return new NoopLogger()
}

export function LoggingProvider({ children }: { children: ReactNode }) {
  const logger = createLogger()

  return (
    <LoggingContext.Provider value={{ logger }}>
      {children}
    </LoggingContext.Provider>
  )
}
