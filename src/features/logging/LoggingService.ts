import type { LogEvent } from '../../types'

export interface LoggingService {
  log(event: LogEvent): void
  logEvent(name: string, data?: Record<string, unknown>): void
}
