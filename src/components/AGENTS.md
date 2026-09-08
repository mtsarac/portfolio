# src/components - Shared UI

Reusable visual and layout components used across feature sections.

## Files

| File | Role |
|------|------|
| `Layout.tsx` | Page shell: ScrollProgress + Navbar + `<main>` + Footer |
| `Navbar.tsx` | Fixed top nav, scroll background, active section observer, 5 hash anchors |
| `Footer.tsx` | Year + credit |
| `Section.tsx` | Generic section wrapper: id, h2 title, divider, GSAP reveal, `section_view` event |
| `AnimatedContent.tsx` | GSAP scroll-triggered fade-in; bypasses mobile + prefers-reduced-motion |
| `SpotlightCard.tsx` | Hover radial glow card; base `p-8 rounded-3xl`, callers override via `className` |
| `ClickSpark.tsx` | Canvas click particle effect |
| `LightRays.tsx` | WebGL radial rays background; lazy-loaded, desktop-only |
| `LogoLoop.tsx` | Infinite marquee (Skills) |
| `ScrollProgress.tsx` | Top scroll bar (`bg-neutral-800`, fill `sky-400/70`) |

## Conventions

- Components are named exports except `App.tsx`, `AnimatedContent.tsx`, `ClickSpark.tsx`, `LightRays.tsx`, `SpotlightCard.tsx` which default-export.
- `Section` already wraps children with `AnimatedContent`; `ExperienceSection` adds a second `AnimatedContent` per card intentionally.
- `SpotlightCard` accepts `className` to override padding/radius; Tailwind utility order matters.

## Where to look

- Add a new shared effect → here
- Change section reveal animation → `AnimatedContent.tsx` or `Section.tsx`
- Change nav items / active-section behavior → `Navbar.tsx`
- Change page chrome → `Layout.tsx`

## Anti-patterns

- Do not add logic that belongs inside a feature module (data, translations, section-specific events).
- Do not introduce a light-mode fallback; the site is dark-only.
