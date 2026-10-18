# portfolio

[![CI](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/mtsarac/portfolio/badge)](https://securityscorecards.dev/viewer/?uri=github.com/mtsarac/portfolio)

Personal site of Muhammet Saraç, live at [msarac.me](https://msarac.me). Single-page React app in Turkish and English, with light/dark theme, internship entries with documents, downloadable CV, PWA support, and first-party analytics.

Türkçe sürüm için: [README.TR.md](README.TR.md).

## Run

Requires Bun 1.4.3 (matches the `Dockerfile`).

```bash
bun install
bun dev            # dev server
bun run build      # type check + production build
bun run lint       # oxlint
```

## Configure

Copy `.env.example` to `.env` and fill in the `VITE_*` values to enable analytics. Without them the site runs with a noop logger and tracking stays off. The values are build-time: they are baked into the bundle, so changing one needs a rebuild.

| Variable | Purpose |
|---|---|
| `VITE_UMAMI_SITE_ID` | Umami website ID (required with the script URL) |
| `VITE_UMAMI_SCRIPT_URL` | Tracker script URL (required) |
| `VITE_UMAMI_DOMAINS` | Allowed tracker domains; compose default `msarac.me,www.msarac.me` |
| `VITE_UMAMI_RECORDER_URL` | Optional session recorder script |

## Deploy

Production is deployed by Dockhand on every push to `main` (GitHub webhook). CI (`.github/workflows/docker.yml`) only builds the image to verify it; nothing is pushed.

Prerequisites: Docker with Compose v2, an external Docker network `traefik-net`, and a `.env` with the `VITE_UMAMI_*` values.

```bash
docker compose up -d --build
```

The stack is portfolio only (Traefik routing on `traefik-net`), behind Cloudflare Tunnel. The analytics backend is managed separately and is never restarted by portfolio deploys. See `docker-compose.yml`.

## Stack

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## Contributing and security

All changes go through pull requests; see [AGENTS.md](AGENTS.md) for conventions. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE).
