# AGENTS.md — portfolio-site

Personal portfolio site for **Muhammet Saraç** (`msarac.me`). Single-page React app with dark mode, i18n (TR/EN), and Umami analytics.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19, TypeScript 6 |
| Build | Vite 8 + `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite` plugin) |
| Runtime | Bun |
| Analytics | Umami (self-hosted, behind Traefik) |
| Deployment | Docker multi-stage (nginx:alpine) + Traefik |

## Essential Commands

```bash
bun dev           # Start dev server (Vite)
bun run build     # TypeScript check + production build
bun run lint      # ESLint on all .ts/.tsx
bun run preview   # Preview production build locally
```

There are **no tests** in this repo — no test framework, no test files, no test-related dependencies in `package.json`.

## Project Structure

```
src/
├── App.tsx                          # Root component — provider nesting & section layout
├── main.tsx                         # Entry point
├── index.css                        # Global styles + Tailwind import
├── types/index.ts                   # All shared types
├── components/                      # Reusable UI components
│   ├── Layout.tsx                   # Page shell (Navbar + main + Footer)
│   ├── Navbar.tsx                   # Fixed top nav with scroll-based styling
│   ├── Footer.tsx                   # Year, credit text
│   └── Section.tsx                  # Generic section wrapper (id, title, children)
├── features/                        # Feature modules (each self-contained)
│   ├── hero/                        # HeroSection — profile photo, title, CTA buttons
│   ├── about/                       # AboutSection — bio + education timeline
│   ├── skills/                      # SkillsSection — categorized skill cards
│   ├── contact/                     # ContactSection — contact links with Umami event tracking
│   ├── theme/                       # ThemeProvider + ThemeToggle (dark/light)
│   ├── i18n/                        # I18nProvider + LangToggle + translations/
│   └── logging/                     # LoggingProvider + UmamiLogger + abstract LoggingService
└── hooks/                           # Context-consuming hooks with guard
    ├── useTheme.ts
    ├── useI18n.ts
    └── useLogger.ts
```

## Architecture & Conventions

### Feature-based organization

Each feature lives in `src/features/<name>/` and exports via a barrel `index.ts`:
```
features/contact/
├── ContactSection.tsx    # Component implementation
└── index.ts              # Re-exports (e.g., export { ContactSection } from './ContactSection')
```

### Provider nesting order (in App.tsx)

```tsx
<ThemeProvider>
  <I18nProvider>
    <LoggingProvider>
      <AppContent />
    </LoggingProvider>
  </I18nProvider>
</ThemeProvider>
```

`ThemeProvider` outermost (affects everything), `LoggingProvider` innermost.

### State management

No external state library. Uses **Context + Provider** pattern exclusively:
- `ThemeContext` — dark/light toggle, persisted to `localStorage('portfolio_theme')`, respects `prefers-color-scheme`
- `I18nContext` — TR/EN toggle, persisted to `localStorage('portfolio_lang')`, respects `navigator.language`
- `LoggingContext` — provides `LoggingService` instance; no localStorage, conditionally creates `UmamiLogger` if env vars are set, otherwise `NoopLogger`

### Custom hook pattern

Every context has a corresponding hook in `src/hooks/` that:
1. Calls `useContext(Context)`
2. Throws if context is `null` (provider missing)
3. Exports the typed context value

Example (`src/hooks/useLogger.ts`):
```ts
export function useLogger(): LoggingContextType {
  const ctx = useContext(LoggingContext)
  if (!ctx) throw new Error('useLogger must be used within LoggingProvider')
  return ctx
}
```

### Logging system

Abstract base class `LoggingService` (`src/features/logging/LoggingService.ts`) with `log()`, `logPageView()`, `logEvent()`. `UmamiLogger` extends it and dynamically injects the Umami script. When `VITE_UMAMI_SITE_ID` or `VITE_UMAMI_URL` env vars are missing, a `NoopLogger` is used instead (no-op). `LoggingProvider` decides which implementation to instantiate.

### i18n

Translation JSON files in `src/features/i18n/translations/`. The `t()` function accepts dot-notation paths (e.g., `t('nav.about')`). Falls back to raw path string if key not found.

### Types

All shared types in `src/types/index.ts`. Notable: `LogEvent` (tagged union with `type: 'pageview' | 'event'`), `Translations` (nested object matching JSON structure), `SkillCategory`, `ContactInfo`.

## Deployment

### Docker (production)

```bash
docker compose up -d --build
```

Two-compose-file setup:
- `docker-compose.yml` — production stack (portfolio + Umami + PostgreSQL behind Traefik)
- `docker-compose.local.yml` — local override (portfolio only on port 8000, no Umami)

Dockerfile is multi-stage: `Node 22-alpine` (build) → `nginx:alpine` (serve). Build args `VITE_UMAMI_SITE_ID` and `VITE_UMAMI_URL` are baked into the static JS at build time.

### Environment variables

```env
# Required for Umami analytics to activate
VITE_UMAMI_SITE_ID=<id>       # If empty, NoopLogger is used
VITE_UMAMI_URL=https://umami.msarac.me
```

Vite exposes `VITE_` prefixed variables to client code via `import.meta.env`.

## Routing

No React Router. All navigation uses **hash anchors** (`href="#about"`, `href="#contact"`). The sections are stacked on one page. Nginx SPA fallback (`try_files $uri $uri/ /index.html;`) handles direct URL access.

## Important Gotchas

- **No test framework installed** — don't look for `vitest`, `jest`, or test scripts. There are zero tests.
- **`bun run build` = `tsc -b && vite build`** — TypeScript check runs first and blocks on errors. Use `bun run build` not just `vite build`.
- **TypeScript 6.0.3** — very new. `erasableSyntaxOnly: true` in tsconfig means type-only imports/exports use `type` keyword explicitly.
- **`verbatimModuleSyntax: true`** — imports must use `import type` for type-only imports. The pattern is `import type { X } from './y'` not `import { type X } from './y'`.
- **`noUnusedLocals` / `noUnusedParameters`** are on — TypeScript build fails on unused variables.
- **LocalStorage keys** are `portfolio_theme` and `portfolio_lang` (prefixed with `portfolio_`).
- **Tailwind CSS 4** — uses the new Vite plugin (`@tailwindcss/vite`), not the PostCSS config approach from v3. Custom variants use `@custom-variant dark (&:where(.dark, .dark *));` syntax. No `tailwind.config.js`.
- **`<html lang="en">` is hardcoded** — the `<html>` lang attribute is not synced to the i18n language state.
- **Commit messages use Turkish** in commit body (e.g., "eklendi", "kaldırıldı", "temizlendi") — this is intentional by the author.
- **Umami tracking** is implemented both via the programmatic `UmamiLogger` class and via inline `data-umami-event` HTML attributes (see `HeroSection.tsx` download button).
