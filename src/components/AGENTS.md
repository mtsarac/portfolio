# src/components - Shared UI

Reusable visual and layout components used across feature sections. Read the files for the current list.

## Conventions

- Named exports, except effect components that already default-export (match the neighbouring file).
- `Section` wraps children in `AnimatedContent`; nested `AnimatedContent` inside a section is intentional.
- `SpotlightCard` has a default padding/radius; callers override via `className`. Tailwind utility order matters.
- Effects must honour `prefers-reduced-motion` and avoid React state for per-frame values.

## Where to look

- New shared effect → here
- Section reveal animation → `AnimatedContent.tsx`, `Section.tsx`
- Nav items / active-section behavior → `Navbar.tsx`
- Page chrome → `Layout.tsx`

## Anti-patterns

- Do not add logic that belongs in a feature module (data, translations, section-specific events).
