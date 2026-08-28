# portfolio-site

Personal portfolio site - Muhammet Saraç ([msarac.me](https://msarac.me))

## Features

- **i18n**: TR / EN toggle, respects `navigator.language`
- **Dark mode**: dark-only theme (`bg-neutral-950`), persisted via `@custom-variant dark`
- **Visitor logging**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_URL` env vars) or noop fallback
- **Experience**: Data-driven internship section (ADM Elektrik Dagitim, TNC Group / Social Office) with SpotlightCard and document links
- **Projects**: Thesis + Homelab spotlight cards
- **Skills**: Infinite logo marquee with categorized badges
- **Animations**: GSAP scroll-triggered reveals (with reduced-motion + mobile bypass), WebGL light rays (desktop only), canvas click sparkles, Spotlight hover glow
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
│   ├── about/       # About + education + interests
│   ├── contact/     # Contact links + Umami events
│   ├── experience/  # Internships: ExperienceSection, ExperienceCard, experienceData (ADM + TNC) + documents
│   ├── hero/        # Hero: photo, title, CTAs
│   ├── i18n/        # TR/EN translations
│   ├── logging/     # Umami / noop logger
│   ├── projects/    # Projects: thesis + homelab SpotlightCards
│   └── skills/      # Skills: badge carousel via LogoLoop
├── components/      # Shared UI (Layout, Navbar, Footer, Section, AnimatedContent, SpotlightCard, ClickSpark, LightRays, LogoLoop, ScrollProgress)
├── hooks/           # Context hooks with null guards (useI18n, useLogger, useScrollDepth, useEngagementTime)
└── types/           # Shared TypeScript types
public/
└── documents/
    └── internships/
        ├── adm/internship-certificate.pdf
        └── tnc/{certificate.pdf,reference-letter.pdf}
```

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Bun · GSAP · OGL

---

# portfolio-site

Kişisel portfolio sitesi - Muhammet Saraç ([msarac.me](https://msarac.me))

## Özellikler

- **Çoklu Dil**: TR / EN geçiş butonu, `navigator.language`'i okur
- **Karanlık Mod**: dark-only tema (`bg-neutral-950`)
- **Ziyaretçi Loglama**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_URL` ortam değişkenleri) veya noop
- **Deneyim**: Veri odaklı staj bölümü (ADM Elektrik Dağıtım, TNC Group / Social Office) SpotlightCard ve belge bağlantıları ile
- **Projeler**: Tez + Homelab spotlight kartları
- **Yetenekler**: Kategorize rozetler ve sonsuz logo akışı
- **Animasyonlar**: GSAP scroll animasyonları (reduced-motion ve mobilde bypass), WebGL ışın efekti (sadece masaüstü), canvas tıklama kıvılcımları, Spotlight hover ışığı
- **Docker**: Multi-stage nginx build, production'da Umami + PostgreSQL + Traefik

## Komutlar

```bash
bun dev            # Vite gelistirme sunucusu
bun run build      # tsc -b && vite build
bun run preview    # production build onizlemesi
bun run lint       # ESLint
```

## Docker

### Production (Umami + Traefik)

```bash
docker compose up -d --build
```

Tam stack: portfolio, Umami analytics, PostgreSQL, Traefik. `VITE_UMAMI_SITE_ID`, `VITE_UMAMI_URL`, `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` ortam degiskenleri gerekli.

### Local (sadece portfolio)

```bash
docker compose -f docker-compose.local.yml up -d --build
# http://localhost:8000
```

## Proje Yapısı

```
src/
├── features/        # Her özellik kendi klasöründe
│   ├── about/       # Hakkında + eğitim + ilgi alanları
│   ├── contact/     # İletişim bağlantıları
│   ├── experience/  # Stajlar: ExperienceSection, ExperienceCard, experienceData (ADM + TNC) + belgeler
│   ├── hero/        # Hero: fotoğraf, başlık, CTA'lar
│   ├── i18n/        # TR/EN çeviriler
│   ├── logging/     # Umami / noop loglayıcı
│   ├── projects/    # Projeler: tez + homelab
│   └── skills/      # Yetenekler: rozet carousel
├── components/      # Ortak UI bileşenleri (Layout, Navbar, Footer, efektler)
├── hooks/           # Context hook'ları (null guard'lı) (useI18n, useLogger, useScrollDepth, useEngagementTime)
└── types/           # Paylaşılan TypeScript tipleri
public/
└── documents/
    └── internships/
        ├── adm/internship-certificate.pdf
        └── tnc/{certificate.pdf,reference-letter.pdf}
```

## Kullanılan Teknolojiler

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Bun · GSAP · OGL

## Lisans

MIT
