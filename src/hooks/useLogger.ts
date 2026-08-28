import { useContext } from 'react'
import { LoggingContext } from '../features/logging/LoggingContext'
import type { LoggingContextType } from '../features/logging/LoggingContext'

export function useLogger(): LoggingContextType {
  const ctx = useContext(LoggingContext)
  if (!ctx) throw new Error('useLogger must be used within LoggingProvider')
  return ctx
}
