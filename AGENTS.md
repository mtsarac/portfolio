# AGENTS.md - portfolio-site

**Generated:** 2026-07-07
**Commit:** `5003fc5` (main)
**Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Bun

Personal portfolio site for **Muhammet Saraç** (`msarac.me`). Single-page app with dark mode, i18n (TR/EN), Umami analytics, WebGL light rays, canvas click sparkles, and GSAP scroll animations.

## Commands

```bash
bun dev           # Vite dev server
bun run build     # tsc -b && vite build
bun run lint      # ESLint on .ts/.tsx
bun run preview   # Preview production build
```

No test framework. `bun run build` = TypeScript check + production build.

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Provider nesting, section order | `src/App.tsx` |
| Entry point, DOM mount | `src/main.tsx` |
| Shared types (LogEvent, SkillCategory, Translations) | `src/types/index.ts` |
| Layout shell (Navbar + main + Footer) | `src/components/Layout.tsx` |
| Fixed top nav with scroll styling | `src/components/Navbar.tsx` |
| Generic section wrapper | `src/components/Section.tsx` |
| Canvas click sparkle effect | `src/components/ClickSpark.tsx` |
| WebGL radial light rays | `src/components/LightRays.tsx` |
| Infinite logo marquee | `src/components/LogoLoop.tsx` |
| GSAP scroll-triggered fade-in | `src/components/AnimatedContent.tsx` |
| Theme (dark/light toggle) | `src/features/theme/ThemeProvider.tsx` |
| i18n (TR/EN + translations JSON) | `src/features/i18n/` |
| Logging (Umami / noop) | `src/features/logging/LoggingProvider.tsx` |
| Context-consuming hooks with guard | `src/hooks/{useTheme,useI18n,useLogger}.ts` |
| Docker + Traefik config | `docker-compose.yml`, `Dockerfile` |
| Nginx SPA fallback | `nginx.conf` |
| Improvement backlog | `IMPROVEMENTS.md` |

## STRUCTURE

```
.
├── src/
│   ├── App.tsx              # Root: provider nest + section layout
│   ├── main.tsx             # Entry
│   ├── index.css            # Tailwind import + custom variants
│   ├── types/index.ts       # All shared types
│   ├── components/          # Reusable UI (Layout, Navbar, Footer, Section, ClickSpark, LightRays, LogoLoop, AnimatedContent)
│   ├── features/            # Self-contained feature modules
│   │   ├── hero/            # HeroSection: photo, title, CTAs
│   │   ├── about/           # AboutSection: bio + education
│   │   ├── skills/          # SkillsSection: badge carousel
│   │   ├── contact/         # ContactSection: links + Umami events
│   │   ├── theme/           # ThemeProvider + ThemeToggle
│   │   ├── i18n/            # I18nProvider + LangToggle + translations/
│   │   └── logging/         # LoggingProvider + UmamiLogger + LoggingService interface
│   └── hooks/               # Context hooks (each: useContext + null guard)
├── docker-compose.yml       # Production stack (portfolio + Umami + PostgreSQL + Traefik)
├── docker-compose.local.yml # Local (portfolio only, port 8000)
├── Dockerfile               # Multi-stage: node:22-alpine build → nginx:alpine serve
├── nginx.conf               # SPA fallback
└── AGENTS.md                # This file
```

## CODE MAP

| Symbol | Type | File | Refs | Role |
|--------|------|------|------|------|
| `App` | component | `src/App.tsx` | entry | Root provider nesting + section rendering |
| `AppContent` | component | `src/App.tsx` | 1 | Theme-aware content with effects |
| `Layout` | component | `src/components/Layout.tsx` | 1 | Page shell |
| `Navbar` | component | `src/components/Navbar.tsx` | 1 | Fixed nav with scroll bg |
| `Footer` | component | `src/components/Footer.tsx` | 1 | Year + credit |
| `Section` | component | `src/components/Section.tsx` | 4 | Generic wrapper per section |
| `ClickSpark` | component | `src/components/ClickSpark.tsx` | 1 | Canvas click particle effect |
| `LightRays` | component | `src/components/LightRays.tsx` | 1 | WebGL radial rays background |
| `LogoLoop` | component | `src/components/LogoLoop.tsx` | 1 | Infinite marquee |
| `AnimatedContent` | component | `src/components/AnimatedContent.tsx` | 4 | GSAP scroll-triggered fade-in |
| `ThemeProvider` | provider | `src/features/theme/ThemeProvider.tsx` | 1 | Dark/light context + localStorage |
| `I18nProvider` | provider | `src/features/i18n/I18nProvider.tsx` | 1 | TR/EN context + localStorage |
| `LoggingProvider` | provider | `src/features/logging/LoggingProvider.tsx` | 1 | Logging service context |
| `UmamiLogger` | class | `src/features/logging/UmamiLogger.ts` | 1 | Umami script injection + tracking |
| `useTheme` | hook | `src/hooks/useTheme.ts` | 1 | Consumes ThemeContext |
| `useI18n` | hook | `src/hooks/useI18n.ts` | 5 | Consumes I18nContext |
| `useLogger` | hook | `src/hooks/useLogger.ts` | 1 | Consumes LoggingContext |

## ARCHITECTURE

### Provider nesting

```tsx
<ThemeProvider>   {/* outermost - affects everything */}
  <I18nProvider>  {/* relies on theme */}
    <LoggingProvider>  {/* innermost - uses i18n + theme */}
      <AppContent />
    </LoggingProvider>
  </I18nProvider>
</ThemeProvider>
```

### State

No external lib. Context + Provider only, persisted to `localStorage` (keys: `portfolio_theme`, `portfolio_lang`). `ThemeProvider` respects `prefers-color-scheme`. `I18nProvider` respects `navigator.language`.

### Routing

No React Router. Hash anchors (`href="#about"`) on one page. Nginx `try_files $uri $uri/ /index.html;` for direct URL access.

### Logging

`LoggingService` interface → `UmamiLogger` (injects Umami script) or `noopLogger` object literal. Decision in `LoggingProvider` based on `VITE_UMAMI_SITE_ID` / `VITE_UMAMI_URL` env vars.

### Hook pattern

Every context has a hook in `src/hooks/` that `useContext(Context)` + throws if null (provider missing).

## CONVENTIONS

- Feature-based: each module in `src/features/<name>/` (self-contained)
- Type-only imports use `import type { X }` syntax (`verbatimModuleSyntax: true`)
- TypeScript strict: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`
- LocalStorage keys prefixed `portfolio_`
- Commit messages in English, one line, semantic prefix (`feat:`, `fix:`, etc.)

## ANTI-PATTERNS (THIS PROJECT)

- No `docker` / `docker compose` commands from agents
- No `as any`, `@ts-ignore`, `@ts-expect-error`
- No em dash (`—`) anywhere in source, translations, or docs
- No `Co-authored-by` or `Contributors` lines in commits
- No pushing without explicit request
- No `vitest` / `jest` / test framework (zero tests)

## GOTCHAS

- `bun run build` = `tsc -b && vite build` - TypeScript errors block build
- Tailwind CSS 4 via `@tailwindcss/vite` (no PostCSS config, no `tailwind.config.js`)
- Dark mode variant: `@custom-variant dark (&:where(.dark, .dark *));`
- `import.meta.env` for `VITE_` prefixed env vars
- Umami tracking: programmatic via `UmamiLogger.logEvent()` + inline `data-umami-event` HTML attributes
- GSAP + OGL + react-icons are the only non-React dependencies
- TypeScript 6.0.3 (very new, careful with incompatibilities)
