# portfolio

[![CI](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/mtsarac/portfolio/badge)](https://securityscorecards.dev/viewer/?uri=github.com/mtsarac/portfolio)

Personal site of Muhammet Saraç, live at [msarac.me](https://msarac.me). Single-page React app in Turkish and English, with light/dark theme, internship entries with documents, downloadable CV, PWA support, and first-party analytics.

Türkçe sürüm için: [README.TR.md](README.TR.md).

## Run

```bash
bun install
bun dev            # dev server
bun run build      # type check + production build
bun run lint       # ESLint
```

## Configure

Copy `.env.example` to `.env` and fill in the `VITE_*` tracking values to enable analytics. Without them the site runs with a noop logger and tracking stays off.

## Deploy

```bash
docker compose up -d --build
```

The stack is portfolio only (Traefik routing on `traefik-net`), behind Cloudflare Tunnel. The analytics backend is managed separately and is never restarted by portfolio deploys. CI builds the image and pushes it to `ghcr.io` on every push to `main`. See `docker-compose.yml`.

## Stack

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## License

MIT.
