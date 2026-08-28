import { createContext } from 'react'
import type { LoggingService } from './LoggingService'

export interface LoggingContextType {
  logger: LoggingService
}

export const LoggingContext = createContext<LoggingContextType | null>(null)
