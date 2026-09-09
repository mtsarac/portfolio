# portfolio-site

Personal portfolio site - Muhammet Saraç ([msarac.me](https://msarac.me))

## Features

- **i18n**: TR / EN toggle, respects `navigator.language`
- **Dark mode**: dark-only theme (`bg-neutral-950`), persisted via `@custom-variant dark`
- **Visitor logging**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_SCRIPT_URL` env vars) or noop fallback. Tracker is served as a first-party resource at `/metrics.js` and collects to `/api/metrics` via Traefik.
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

Full stack: portfolio, Umami analytics, PostgreSQL, Traefik. Requires `VITE_UMAMI_SITE_ID`, `VITE_UMAMI_SCRIPT_URL`, `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` env vars.

The Umami dashboard remains at `https://umami.msarac.me`. The tracker script is served through the main domain at `/metrics.js` and data is collected at `/api/metrics` so that ad blockers do not block the third-party `umami.msarac.me/script.js` request.

## Analytics

```text
browser
  | GET /metrics.js  POST /api/metrics
  v
msarac.me / www.msarac.me
  v
Cloudflare Tunnel
  v
Traefik
  |--> portfolio container       everything else
  |--> umami container           /metrics.js + /api/metrics  (priority 20 router)
umami.msarac.me
  |--> umami container           dashboard/admin
```

The same-origin tracker router has higher priority than the generic portfolio router, so `/metrics.js` and `/api/metrics` reach the Umami container instead of nginx.

### Required environment variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_UMAMI_SITE_ID` | Umami website ID | `e868537e-...` |
| `VITE_UMAMI_SCRIPT_URL` | Full URL to the first-party tracker | `https://msarac.me/metrics.js` |
| `UMAMI_DB_PASSWORD` | PostgreSQL password for Umami | (random) |
| `UMAMI_APP_SECRET` | Umami app secret | (random) |
| `UMAMI_CORS_ORIGINS` | Allowed origins | `https://msarac.me` |

### Local (portfolio only)

```bash
docker compose -f docker-compose.local.yml up -d --build
# http://localhost:8000
```

### CI (Docker image, no secrets)

`.github/workflows/docker.yml` builds the `Dockerfile` without `VITE_UMAMI_*` build args and pushes to `ghcr.io` on `main` (`latest` + `sha-*`). PRs only build, no push.

The CI image works fine but Umami tracking is disabled (noop logger fallback). For a production image with tracking, build locally with:

```bash
docker build \
  --build-arg VITE_UMAMI_SITE_ID=$VITE_UMAMI_SITE_ID \
  --build-arg VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL \
  -t portfolio-site .
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
- **Ziyaretçi Loglama**: Umami (`VITE_UMAMI_SITE_ID` + `VITE_UMAMI_SCRIPT_URL` ortam değişkenleri) veya noop. Traefik üzerinden birinci taraf `/metrics.js` ve `/api/metrics` ile çalışır.
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

Tam stack: portfolio, Umami analytics, PostgreSQL, Traefik. `VITE_UMAMI_SITE_ID`, `VITE_UMAMI_SCRIPT_URL`, `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET` ortam degiskenleri gerekli.

Umami paneli `https://umami.msarac.me` adresinde kalır. Tracker script ana domain üzerinden `/metrics.js` ile sunulur ve veri toplama `/api/metrics` üzerinden yapılır; böylece üçüncü taraf `umami.msarac.me/script.js` isteği reklam engelleyiciler tarafından engellenmez.

## Analytics

```text
tarayici
  | GET /metrics.js  POST /api/metrics
  v
msarac.me / www.msarac.me
  v
Cloudflare Tunnel
  v
Traefik
  |--> portfolio container       diger her sey
  |--> umami container           /metrics.js + /api/metrics  (priority 20 router)
umami.msarac.me
  |--> umami container           panel/admin
```

Birinci taraf tracker router'i genel portfolio router'inden daha yuksek oncelige sahiptir, bu nedenle `/metrics.js` ve `/api/metrics` nginx yerine Umami container'ina ulasir.

### Gerekli ortam degiskenleri

| Degisken | Amaç | Örnek |
|----------|------|-------|
| `VITE_UMAMI_SITE_ID` | Umami website ID | `e868537e-...` |
| `VITE_UMAMI_SCRIPT_URL` | Birinci taraf tracker icin tam URL | `https://msarac.me/metrics.js` |
| `UMAMI_DB_PASSWORD` | Umami icin PostgreSQL sifresi | (rastgele) |
| `UMAMI_APP_SECRET` | Umami app secret | (rastgele) |
| `UMAMI_CORS_ORIGINS` | Izin verilen origin'ler | `https://msarac.me` |

### Local (sadece portfolio)

```bash
docker compose -f docker-compose.local.yml up -d --build
# http://localhost:8000
```

### CI (Docker imaji, secretsiz)

`.github/workflows/docker.yml` dosyasi `Dockerfile`'i `VITE_UMAMI_*` argumanlari olmadan derler ve `main`'e push olunca `ghcr.io`'ya gonderir (`latest` + `sha-*`). PR'larda sadece derlenir, push yapilmaz.

CI imaji sorunsuz calisir ama Umami takibi kapalidir (noop logger). Takipli production imaji icin yerelde derleyin:

```bash
docker build \
  --build-arg VITE_UMAMI_SITE_ID=$VITE_UMAMI_SITE_ID \
  --build-arg VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL \
  -t portfolio-site .
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
