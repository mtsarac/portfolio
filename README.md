# portfolio-site

[![CI](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml)

Personal site of Muhammet Sarac, live at [msarac.me](https://msarac.me). Single-page React app in Turkish and English, with light/dark theme, internship entries with documents, and Umami analytics served first-party.

## Run

```bash
bun install
bun dev            # dev server
bun run build      # type check + production build
bun run lint       # ESLint
```

## Configure

Copy `.env.example` to `.env` and fill in the Umami values to enable tracking. Without them the site runs with a noop logger and tracking stays off.

## Deploy

```bash
docker compose up -d --build
```

The stack is portfolio + Umami + PostgreSQL + Traefik behind Cloudflare Tunnel. CI builds the image and pushes it to `ghcr.io` on every push to `main`. See `docker-compose.yml`.

## Stack

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## License

MIT.

---

# portfolio-site

Muhammet Sarac'in kisisel sitesi, [msarac.me](https://msarac.me) adresinde yayinda. Turkce ve Ingilizce tek sayfa React uygulamasi; aydinlik/karanlik tema, belgeli staj kayitlari ve birinci taraf uzerinden sunulan Umami analitigi icerir.

## Calistirma

```bash
bun install
bun dev            # gelistirme sunucusu
bun run build      # tip kontrolu + production build
bun run lint       # ESLint
```

## Yapilandirma

`.env.example` dosyasini `.env` olarak kopyalayip Umami degerlerini doldurun. Bu degerler yoksa site noop logger ile calisir, takip kapali kalir.

## Yayinlama

```bash
docker compose up -d --build
```

Stack: Cloudflare Tunnel arkasinda portfolio + Umami + PostgreSQL + Traefik. CI, `main`'e her push'ta imaji derleyip `ghcr.io`'ya gonderir. Detay icin `docker-compose.yml`.

## Teknolojiler

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## Lisans

MIT.
