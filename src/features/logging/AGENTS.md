# src/features/logging - analytics

Self-contained analytics feature behind a `LoggingService` interface. `LoggingProvider` falls back to a noop logger when the tracker env vars are missing.

## Environment variables

Read `LoggingProvider.tsx` and `UmamiLogger.ts` for the full list. All are `VITE_UMAMI_*`:

- site ID and script URL are required; if either is missing the noop logger is used
- domains (optional): allowlist passed to the tracker; empty means track everywhere
- recorder URL (optional): empty means no recorder

Values are public build args. Never put secrets in `VITE_*` variables.

## Events

The source of truth is the `LogEvent` type in `src/types/index.ts` and the `logEvent(...)` callers. Grep for `logEvent(` to list them.

Pageviews are automatic via the tracker (hash excluded, query params preserved for UTM attribution).

## Where to look

- Tracker script loading → `UmamiLogger.ts`
- Add or remove an event → update `LogEvent` in `src/types/index.ts` and the callers
- Enable/disable per environment → `LoggingProvider.tsx`

## Anti-patterns

- Do not call the tracker global directly; use `useLogger()`.
- Do not add a manual pageview call.
- Do not add tests; the project has no test framework.
