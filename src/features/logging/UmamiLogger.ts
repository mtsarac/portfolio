import { LoggingService } from './LoggingService'
import type { LogEvent } from '../../types'

interface UmamiWindow {
  umami?: {
    track: (event: string, data?: Record<string, unknown>) => void
  }
}

declare global {
  interface Window {
    umami?: UmamiWindow['umami']
  }
}

export class UmamiLogger extends LoggingService {
  #initialized = false
  #siteId: string
  #umamiUrl: string

  constructor(siteId: string, umamiUrl: string) {
    super()
    this.#siteId = siteId
    this.#umamiUrl = umamiUrl
    if (!siteId || !umamiUrl) return
    this.#injectScript()
  }

  #injectScript(): void {
    if (this.#initialized || typeof document === 'undefined') return

    const existing = document.querySelector(`script[data-website-id="${this.#siteId}"]`)
    if (existing) {
      this.#initialized = true
      return
    }

    const script = document.createElement('script')
    script.src = `${this.#umamiUrl}/script.js`
    script.dataset.websiteId = this.#siteId
    script.async = true
    script.defer = true
    script.onload = () => {
      this.#initialized = true
    }
    document.head.appendChild(script)
  }

  log(event: LogEvent): void {
    if (!this.#initialized) return

    if (event.type === 'pageview') {
      window.umami?.track('pageview', {
        url: event.name,
        title: event.name,
      })
    } else {
      window.umami?.track(event.name, event.data)
    }
  }
}
