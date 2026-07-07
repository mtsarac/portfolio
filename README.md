# portfolio-site

Personal portfolio site — Muhammet Saraç ([msarac.me](https://msarac.me))

## Features

- **i18n**: TR / EN toggle, respects `navigator.language`
- **Dark / Light mode**: respects `prefers-color-scheme`, manual toggle, persisted to localStorage
- **Visitor logging**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_URL` env vars) or noop fallback
- **Animations**: GSAP scroll-triggered reveals, WebGL light rays (desktop only), canvas click sparkles
- **Docker**: multi-stage nginx build, Umami + PostgreSQL + Traefik in production stack

## Commands

```bash
bun dev            # Vite dev server
bun run build      # tsc -b && vite build
bun run preview    # preview production build
bun run lint       # ESLint
```

## Docker

### Production (Umami + Traefik)

```bash
docker compose up -d --build
```

Full stack: portfolio, Umami analytics, PostgreSQL, Traefik. Requires `VITE_UMAMI_SITE_ID`, `VITE_UMAMI_URL`, `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` env vars.

### Local (portfolio only)

```bash
docker compose -f docker-compose.local.yml up -d --build
# http://localhost:8000
```

## Project Structure

```
src/
├── features/        # Feature modules (self-contained)
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── i18n/        # TR/EN translations
│   ├── logging/     # Umami / noop logger
│   ├── skills/
│   └── theme/       # Dark/Light mode
├── components/      # Shared UI (Layout, Navbar, Footer, effects)
├── hooks/           # Context hooks with null guards
└── types/           # Shared TypeScript types
```

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Bun · GSAP · OGL

---

# portfolio-site

Kişisel portfolio sitesi — Muhammet Saraç ([msarac.me](https://msarac.me))

## Özellikler

- **Çoklu Dil**: TR / EN geçiş butonu, `navigator.language`'i okur
- **Karanlık / Aydınlık Mod**: Sistem tercihini okur, manuel geçiş, localStorage'a kaydedilir
- **Ziyaretçi Loglama**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_URL` ortam değişkenleri) veya noop
- **Animasyonlar**: GSAP scroll animasyonları, WebGL ışın efekti (sadece masaüstü), canvas tıklama kıvılcımları
- **Docker**: Multi-stage nginx build, production'da Umami + PostgreSQL + Traefik

## Komutlar

```bash
bun dev            # Vite geliştirme sunucusu
bun run build      # tsc -b && vite build
bun run preview    # production build önizlemesi
bun run lint       # ESLint
```

## Docker

### Production (Umami + Traefik)

```bash
docker compose up -d --build
```

Tam stack: portfolio, Umami analytics, PostgreSQL, Traefik. `VITE_UMAMI_SITE_ID`, `VITE_UMAMI_URL`, `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` ortam değişkenleri gerekli.

### Local (sadece portfolio)

```bash
docker compose -f docker-compose.local.yml up -d --build
# http://localhost:8000
```

## Proje Yapısı

```
src/
├── features/        # Her özellik kendi klasöründe
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── i18n/        # TR/EN çeviriler
│   ├── logging/     # Umami / noop loglayıcı
│   ├── skills/
│   └── theme/       # Dark/Light mod
├── components/      # Ortak UI bileşenleri (Layout, Navbar, Footer, efektler)
├── hooks/           # Context hook'ları (null guard'lı)
└── types/           # Paylaşılan TypeScript tipleri
```

## Kullanılan Teknolojiler

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Bun · GSAP · OGL

## Lisans

MIT
