# AGENTS.md - portfolio-site

**Generated:** 2026-09-08
**Commit:** b9dbd03
**Branch:** main
**Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Bun

Personal portfolio site for **Muhammet Saraç** (`msarac.me`). Single-page app with dark-only theme, i18n (TR/EN), Umami analytics served first-party through `/metrics.js` and `/api/metrics`, WebGL light rays, canvas click sparkles, GSAP scroll animations, and Spotlight hover glow.

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
| Shared types (LogEvent, SkillCategory, Translations + experience) | `src/types/index.ts` |
| Layout shell (Navbar + main + Footer) | `src/components/Layout.tsx` |
| Fixed top nav with scroll styling + active Section observer | `src/components/Navbar.tsx` |
| Generic section wrapper (GSAP reveal + section_view event) | `src/components/Section.tsx` |
| Canvas click sparkle effect | `src/components/ClickSpark.tsx` |
| WebGL radial light rays | `src/components/LightRays.tsx` |
| Infinite logo marquee | `src/components/LogoLoop.tsx` |
| GSAP scroll-triggered fade-in | `src/components/AnimatedContent.tsx` |
| Spotlight hover glow | `src/components/SpotlightCard.tsx` |
| Scroll progress bar | `src/components/ScrollProgress.tsx` |
| Experience (data-driven internships + documents) | `src/features/experience/` |
| i18n (TR/EN + translations JSON) | `src/features/i18n/I18nContext.ts` + `I18nProvider.tsx` + translations |
| Logging (Umami / noop) | `src/features/logging/AGENTS.md` |
| Context-consuming hooks with guard | `src/hooks/AGENTS.md` |
| Shared UI details | `src/components/AGENTS.md` |
| Docker + Traefik config | `docker-compose.yml`, `Dockerfile` |
| Nginx SPA fallback | `nginx.conf` |
| Improvement backlog | `IMPROVEMENTS.md` |
| Internship PDFs (public URLs) | `public/documents/internships/{adm,tnc}/` |

## STRUCTURE

```
.
├── src/
│   ├── App.tsx              # Root: provider nest + section layout (Hero > About > Experience > Projects > Skills > Contact)
│   ├── main.tsx             # Entry
│   ├── index.css            # Tailwind import + custom variants (@custom-variant dark)
│   ├── types/index.ts       # All shared types (Translations includes nav.experience + experience.*)
│   ├── components/          # Reusable UI - see src/components/AGENTS.md
│   ├── features/            # Self-contained feature modules
│   │   ├── hero/            # HeroSection: photo, title, CTAs
│   │   ├── about/           # AboutSection: bio + education + interests (SpotlightCard + divided list)
│   │   ├── experience/      # ExperienceSection + ExperienceCard (SpotlightCard) + experienceData (ADM + TNC) + index barrel
│   │   ├── projects/        # ProjectsSection: thesis + homelab SpotlightCards
│   │   ├── skills/          # SkillsSection: badge carousel via LogoLoop
│   │   ├── contact/         # ContactSection: links + Umami events
│   │   ├── i18n/            # I18nProvider + I18nContext + LangToggle + translations/{en,tr}.json
│   │   └── logging/         # Umami analytics subsystem - see src/features/logging/AGENTS.md
│   └── hooks/               # Context hooks + analytics hooks - see src/hooks/AGENTS.md
├── public/
│   ├── cv/                  # CV PDFs served at /cv/*
│   └── documents/internships/
│       ├── adm/internship-certificate.pdf
│       └── tnc/{certificate.pdf,reference-letter.pdf}
├── docker-compose.yml       # Production stack (portfolio + Umami + PostgreSQL + Traefik)
├── docker-compose.local.yml # Local (portfolio only, port 8000)
├── Dockerfile               # Multi-stage: node:22-alpine build → nginx:alpine serve
├── nginx.conf               # SPA fallback (try_files $uri $uri/ /index.html)
└── AGENTS.md                # This file
```

## CODE MAP

| Symbol | Type | File | Refs | Role |
|--------|------|------|------|------|
| `App` | component | `src/App.tsx` | entry | Root provider nesting + section rendering |
| `AppContent` | component | `src/App.tsx` | 1 | Theme-aware content with effects (ClickSpark + LightRays desktop) |
| `Layout` | component | `src/components/Layout.tsx` | 1 | Page shell (Navbar + ScrollProgress + Footer) |
| `Navbar` | component | `src/components/Navbar.tsx` | 1 | Fixed nav, scroll bg, active Section observer, 5 items |
| `Footer` | component | `src/components/Footer.tsx` | 1 | Year + credit |
| `Section` | component | `src/components/Section.tsx` | 6 | Generic wrapper per section (h2 + divider + logging) |
| `ClickSpark` | component | `src/components/ClickSpark.tsx` | 1 | Canvas click particle effect |
| `LightRays` | component | `src/components/LightRays.tsx` | 1 | WebGL radial rays background (lazy, desktop only) |
| `LogoLoop` | component | `src/components/LogoLoop.tsx` | 1 | Infinite marquee (Skills) |
| `AnimatedContent` | component | `src/components/AnimatedContent.tsx` | 6 | GSAP scroll-triggered fade-in (mobile/reduced-motion bypass) |
| `SpotlightCard` | component | `src/components/SpotlightCard.tsx` | 3 | Hover radial glow (About, Projects, Experience) |
| `ScrollProgress` | component | `src/components/ScrollProgress.tsx` | 1 | Top scroll bar (bg-neutral-800, fill sky-400/70) |
| `ExperienceSection` | component | `src/features/experience/ExperienceSection.tsx` | 1 | Data-driven internship list (ADM + TNC) |
| `ExperienceCard` | component | `src/features/experience/ExperienceCard.tsx` | 1 | Per-internship card (SpotlightCard, highlights grid, documents) |
| `experiences` | data | `src/features/experience/experienceData.ts` | 1 | Internship array + types (ExperienceDocument/Highlight) |
| `I18nProvider` | provider | `src/features/i18n/I18nProvider.tsx` | 1 | TR/EN context + localStorage `portfolio_lang` |
| `I18nContext` | context | `src/features/i18n/I18nContext.ts` | 2 | TR/EN context declaration |
| `LoggingProvider` | provider | `src/features/logging/LoggingProvider.tsx` | 1 | Logging service context (stable via useMemo) |
| `LoggingContext` | context | `src/features/logging/LoggingContext.ts` | 2 | Logging context declaration |
| `UmamiLogger` | class | `src/features/logging/UmamiLogger.ts` | 1 | Umami script injection + queued `track()` + `excludeHash`/`performance` |
| `useI18n` | hook | `src/hooks/useI18n.ts` | 9 | Consumes I18nContext with null guard |
| `useLogger` | hook | `src/hooks/useLogger.ts` | 7 | Consumes LoggingContext |
| `useScrollDepth` | hook | `src/hooks/useScrollDepth.ts` | 1 | Scroll-depth analytics (25/50/75/100) |
| `useEngagementTime` | hook | `src/hooks/useEngagementTime.ts` | 1 | Active engagement time (30/60/120, visible-only) |

## ARCHITECTURE

### Provider nesting

```tsx
<I18nProvider>        {/* TR/EN, localStorage portfolio_lang, navigator.language */}
  <LoggingProvider>   {/* Umami or noop, depends on VITE_UMAMI_* */}
    <AppContent />    {/* ClickSpark > LightRays (desktop) > Layout > Sections */}
  </LoggingProvider>
</I18nProvider>
```

Note: `ThemeProvider` was removed; site is now dark-only (`bg-neutral-950`, `@custom-variant dark`). No light toggle.

### State

No external lib. Context + Provider only, persisted to `localStorage` (key: `portfolio_lang`). `I18nProvider` respects `navigator.language`. Analytics via `useScrollDepth` / `useEngagementTime`.

### Routing

No React Router. Hash anchors (`href="#about"` etc., 5 nav items: about, experience, projects, skills, contact) on one page. Nginx `try_files $uri $uri/ /index.html;` for direct URL access.

### Logging

`LoggingService` interface → `UmamiLogger` (injects Umami script via `VITE_UMAMI_SITE_ID`/`VITE_UMAMI_SCRIPT_URL` with `excludeHash` and `performance` datasets, in-memory queued `track()`) or `noopLogger` object literal. Events: `nav_click`, `section_view`, `experience_document_click {experienceId, documentType, action}`, `contact_click {type}`, `hero_cta_click {target, lang?}`, `scroll_depth {depth}`, `engagement_time {seconds}` via hooks. Automatic pageview via Umami, hash excluded, no manual `logPageView`.

### Analytics routing

```text
browser
  | GET /metrics.js  POST /api/metrics
  v
msarac.me / www.msarac.me
  v
Cloudflare Tunnel
  v
Traefik
  |--> portfolio container   everything else
  |--> umami container       /metrics.js + /api/metrics  (priority 20 router)
umami.msarac.me
  |--> umami container       dashboard/admin
```

The same-origin tracker router (`umami-tracker`) has priority `20`, higher than the generic portfolio router (`priority 10`), so `/metrics.js` and `/api/metrics` never hit nginx.

### Hook pattern

Every context has a hook in `src/hooks/` that `useContext(Context)` + throws if null (provider missing). See `src/hooks/AGENTS.md` for details.

### Experience / Documents pattern

`experienceData.ts` is single source of truth. `ExperienceCard` renders `documents: ExperienceDocument[]` generically - adding a document only requires pushing to the array, no component change. Documents stored under `public/documents/internships/{adm,tnc}/` and served at `/documents/internships/...` with `target="_blank" rel="noopener noreferrer"` for view and `download` for download. Empty `documents` renders no broken links; now wired to real PDFs.

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
- Dark mode variant: `@custom-variant dark (&:where(.dark, .dark *));` but site is dark-only (`bg-neutral-950`)
- `import.meta.env` for `VITE_` prefixed env vars
- Umami tracking: programmatic via `UmamiLogger.logEvent()` only, auto pageview with `excludeHash`, queued until tracker ready
- GSAP + OGL + react-icons are the only non-React dependencies
- TypeScript 6.0.3 (very new, careful with incompatibilities)
- `Section` already wraps with `AnimatedContent`; `ExperienceSection` adds staggered `AnimatedContent` per card - double GSAP is intentional
- `SpotlightCard` base `p-8 rounded-3xl`; callers override with `p-6 rounded-lg` via `className` - works due to Tailwind override pattern used in Projects
