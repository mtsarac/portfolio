# AGENTS.md - portfolio

Personal portfolio site (single-page React app). Stack and versions: see `package.json`.
Features: light/dark/system theme, TR/EN i18n, first-party analytics, scroll and hover effects.

## Commands

```bash
bun dev           # dev server
bun run build     # type check + production build
bun run lint      # ESLint
bun run preview   # preview production build
```

No test framework. `bun run build` is the type check.

## Layout

```
src/
  App.tsx, main.tsx, index.css   # root composition, entry, global styles
  types/                         # shared types
  components/                    # reusable UI (see src/components/AGENTS.md)
  features/<name>/               # self-contained feature modules (sections, i18n, theme, logging)
  hooks/                         # context + analytics hooks (see src/hooks/AGENTS.md)
public/                          # static assets, SEO files, downloadable documents
```

Analytics details: `src/features/logging/AGENTS.md`.
Deploy config (Dockerfile, nginx, compose files) lives at the repo root.

## Architecture

- **Providers**: nested in `src/App.tsx`. Read it for the current order.
- **State**: Context + Provider only, no external state library. Persisted keys are prefixed `portfolio_`.
- **Routing**: none. Hash anchors on one page; the server falls back to `index.html`.
- **Content**: section text comes from the translations JSON; data-driven lists (e.g. experience) live in a data file next to their component. Add entries to the data, not the component.
- **Analytics**: tracker is served first-party and managed outside this repo. This project only consumes `VITE_*` build args. Never call the tracker global directly; use `useLogger()`.
- **Theme**: `ThemeProvider` toggles the `.dark` class; an inline script in `index.html` sets it before first paint.

## Git workflow

`main` is protected. All changes go through Pull Requests.

- Work on a dedicated branch from latest `origin/main` (`feat/...`, `fix/...`, `docs/...`, `ci/...`)
- Every git command uses the `GIT_MASTER=1` prefix
- Never commit or push directly to `main`
- Never force-push, never rewrite published history
- Never merge your own PR, never enable auto-merge, never touch branch protection settings
- Push only the feature branch, and only when explicitly requested
- Open the PR with `gh` using the already-authenticated account. Do not change git identity
- PR targets `main`. The owner reviews and merges manually

## Conventions

- Feature-based modules under `src/features/<name>/`
- Type-only imports use `import type`
- TypeScript strict, including unused locals/parameters
- Commit messages in English, one line, semantic prefix (`feat:`, `fix:`, etc.)

## Anti-patterns

- No `docker` / `docker compose` commands from agents (read-only `docker compose config` only when explicitly asked)
- No `as any`, `@ts-ignore`, `@ts-expect-error`
- No em dash (`—`) in source, translations, or docs
- No `Co-authored-by` or `Contributors` lines in commits
- No test framework or tests
- Do not force `.dark` in `main.tsx`; the theme comes from the inline script and `ThemeProvider`
- No per-scroll or per-mousemove values in React state; use refs, `transform`, or CSS variables

## Gotchas

- Tailwind runs through its Vite plugin: no PostCSS config, no `tailwind.config.js`. Dark variant is a custom `@custom-variant` in `index.css`; every surface needs light defaults plus `dark:` overrides.
- `import.meta.env` only exposes `VITE_`-prefixed variables.
- `Section` already wraps its children in `AnimatedContent`; extra `AnimatedContent` inside a section (e.g. per card) is intentional.
- Motion must respect `prefers-reduced-motion`: a global rule in `index.css` covers CSS, `AnimatedContent` and `ClickSpark` handle JS.
- `AnimatedContent` is visible by default and hidden in a layout effect, so content stays visible without JS.
- Decorative tag lists use `<ul role="list">`; decorative icons use `aria-hidden`.
- SEO files: canonical in `index.html`, `public/robots.txt`, `public/sitemap.xml`. Update them when the site URL or pages change.
