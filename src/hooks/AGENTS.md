# src/hooks - Context hooks + analytics hooks

All custom hooks live here: context consumers with null guards, and analytics lifecycle hooks.

## Pattern

Every context hook uses the same guard:

```ts
const ctx = useContext(SomeContext)
if (!ctx) throw new Error('useX must be used within XProvider')
return ctx
```

## Where to look

- New context consumer → copy an existing context hook
- New analytics lifecycle hook → call it from `AppContent` in `src/App.tsx`
- Missing provider errors → check provider nesting in `src/App.tsx`

## Anti-patterns

- Do not call context hooks outside their provider (they throw).
- Do not add business logic here; keep hooks thin wrappers or lifecycle observers.
- Do not add tests; the project has no test framework.
