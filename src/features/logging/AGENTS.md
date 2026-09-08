# src/features/logging - Umami analytics

Self-contained analytics feature. Falls back to a noop logger when Umami env vars are missing.

## Files

| File | Role |
|------|------|
| `LoggingService.ts` | Interface: `initialize()`, `log(event)`, `logEvent(name, data?)` |
| `LoggingContext.ts` | React context declaration |
| `LoggingProvider.tsx` | Creates `UmamiLogger` or `noopLogger` via `useMemo`; calls `initialize()` in effect |
| `UmamiLogger.ts` | Injects `<script src={VITE_UMAMI_SCRIPT_URL}>` with `data-website-id`, `data-exclude-hash`, `data-performance`; queues `track()` calls until ready |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_UMAMI_SITE_ID` | Umami website ID |
| `VITE_UMAMI_SCRIPT_URL` | Full first-party script URL, e.g. `https://msarac.me/metrics.js` |

If either is missing, `LoggingProvider` returns `noopLogger`.

## Events

- `nav_click {section}`
- `section_view {name}`
- `experience_document_click {experienceId, documentType, action}`
- `contact_click {type}`
- `hero_cta_click {target, lang?}`
- `scroll_depth {depth}`
- `engagement_time {seconds}`

Pageviews are automatic via Umami; hash is excluded.

## Where to look

- Change tracker script loading → `UmamiLogger.ts`
- Add/remove an event type → update `LogEvent` in `src/types/index.ts` and the callers
- Toggle analytics on/off per environment → `LoggingProvider.tsx`

## Anti-patterns

- Do not call `umami.track()` directly; always use `useLogger()`.
- Do not add a manual `logPageView`; Umami handles pageviews.
- Do not expose secrets via `VITE_*` variables.
- Do not add tests — this project has no test framework.
