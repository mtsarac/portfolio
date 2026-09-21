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

function parseDomains(raw: string): string {
  return raw
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter((d) => d.length > 0)
    .join(',')
}

export class UmamiLogger implements LoggingService {
  #initialized = false
  #failed = false
  #queue: LogEvent[] = []
  #siteId: string
  #scriptUrl: string
  #domains: string
  #recorderUrl: string

  constructor(siteId: string, scriptUrl: string, domains = '', recorderUrl = '') {
    this.#siteId = siteId
    this.#scriptUrl = scriptUrl
    this.#domains = parseDomains(domains)
    this.#recorderUrl = recorderUrl
  }

  initialize(): void {
    if (this.#initialized || this.#failed) return
    if (typeof document === 'undefined') return
    if (!this.#siteId || !this.#scriptUrl) return
    this.#injectScript()
    this.#injectRecorder()
  }

  // Fire-and-forget: a recorder failure must never affect tracking or the page.
  #injectRecorder(): void {
    if (!this.#recorderUrl) return
    if (document.querySelector('script[data-umami-recorder]')) return

    const script = document.createElement('script')
    script.src = this.#recorderUrl
    script.dataset.websiteId = this.#siteId
    script.dataset.umamiRecorder = 'true'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  #injectScript(): void {
    if (this.#initialized || this.#failed) return

    const existing = document.querySelector(
      `script[data-website-id="${this.#siteId}"]`,
    ) as HTMLScriptElement | null

    if (existing) {
      const status = existing.dataset.status

      if (!status) {
        if (window.umami) {
          this.#initialized = true
          this.#flushQueue()
          return
        }
        existing.remove()
      } else if (status === 'failed') {
        this.#failed = true
        this.#queue = []
        return
      } else if (status === 'loaded' || window.umami) {
        this.#initialized = true
        this.#flushQueue()
        return
      } else if (status === 'loading') {
        existing.addEventListener(
          'load',
          () => {
            existing.dataset.status = 'loaded'
            this.#initialized = true
            this.#flushQueue()
          },
          { once: true },
        )
        existing.addEventListener(
          'error',
          () => {
            existing.dataset.status = 'failed'
            this.#failed = true
            this.#queue = []
          },
          { once: true },
        )
        return
      }
    }

    const script = document.createElement('script')
    script.src = this.#scriptUrl
    script.dataset.websiteId = this.#siteId
    script.dataset.excludeHash = 'true'
    script.dataset.performance = 'true'
    if (this.#domains) {
      script.dataset.domains = this.#domains
    }
    script.dataset.status = 'loading'
    script.async = true
    script.defer = true
    script.addEventListener(
      'load',
      () => {
        script.dataset.status = 'loaded'
        this.#initialized = true
        this.#flushQueue()
      },
      { once: true },
    )
    script.addEventListener(
      'error',
      () => {
        script.dataset.status = 'failed'
        this.#failed = true
        this.#queue = []
      },
      { once: true },
    )
    document.head.appendChild(script)
  }

  #flushQueue(): void {
    for (const event of this.#queue) {
      this.#dispatch(event)
    }
    this.#queue = []
  }

  #dispatch(event: LogEvent): void {
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

  logEvent(name: string, data?: Record<string, unknown>): void {
    this.log({ type: 'event', name, data, timestamp: new Date().toISOString() })
  }

  log(event: LogEvent): void {
    if (this.#failed) return

    if (!this.#initialized) {
      this.#queue.push(event)
      return
    }

    this.#dispatch(event)
  }
}
