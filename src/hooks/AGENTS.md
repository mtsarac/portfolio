# src/hooks - Context hooks + analytics hooks

All custom hooks live here. Two kinds: context consumers with null guards, and analytics hooks.

## Files

| File | Role |
|------|------|
| `useI18n.ts` | Consumes `I18nContext`; throws if provider missing |
| `useLogger.ts` | Consumes `LoggingContext`; throws if provider missing |
| `useTheme.ts` | Consumes `ThemeContext`; throws if provider missing |
| `useScrollDepth.ts` | Fires `scroll_depth {depth}` at 25/50/75/100 |
| `useEngagementTime.ts` | Fires `engagement_time {seconds}` at 30/60/120; visibility-only |

## Pattern

Every context hook follows the same guard:

```ts
const ctx = useContext(SomeContext)
if (!ctx) throw new Error('useX must be used within XProvider')
return ctx
```

## Where to look

- Add a new context consumer → follow `useI18n.ts`/`useLogger.ts`
- Add a new analytics lifecycle hook → wire into `AppContent` in `src/App.tsx`
- Fix missing provider errors → check provider nesting in `src/App.tsx`

## Anti-patterns

- Do not call these outside a provider (they throw).
- Do not add business logic here; hooks should be thin wrappers or lifecycle observers.
- Do not add tests — this project has no test framework.
