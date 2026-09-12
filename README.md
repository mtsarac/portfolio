# portfolio-site

[![CI](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml)

Personal site of Muhammet Saraç, live at [msarac.me](https://msarac.me). Single-page React app in Turkish and English, with light/dark theme, internship entries with documents, and Umami analytics served first-party.

Türkçe sürüm için: [README.TR.md](README.TR.md).

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
