import type { LoggingService } from './LoggingService'
import type { LogEvent } from '../../types'

type TrackPayload = Record<string, unknown>

interface Umami {
  track(): void
  track(payload: TrackPayload): void
  track(callback: (props: TrackPayload) => TrackPayload): void
  track(eventName: string): void
  track(eventName: string, data: TrackPayload): void
}

declare global {
  interface Window {
    umami?: Umami
  }
}

export class UmamiLogger implements LoggingService {
  #initialized = false
  #siteId: string
  #umamiUrl: string

  constructor(siteId: string, umamiUrl: string) {
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
    script.onerror = () => {
      this.#initialized = false
    }
    document.head.appendChild(script)
  }

  logPageView(page: string): void {
    this.log({ type: 'pageview', name: page, timestamp: new Date().toISOString() })
  }

  logEvent(name: string, data?: Record<string, unknown>): void {
    this.log({ type: 'event', name, data, timestamp: new Date().toISOString() })
  }

  log(event: LogEvent): void {
    if (!this.#initialized) return

    if (event.type === 'pageview') {
      window.umami?.track((props) => ({
        ...props,
        url: event.name,
        title: event.name,
      }))
    } else {
      window.umami?.track(event.name, event.data ?? {})
    }
  }
}
