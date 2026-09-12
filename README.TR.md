# portfolio-site

[![CI](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio-site/actions/workflows/docker.yml)

Muhammet Saraç'ın kişisel sitesi, [msarac.me](https://msarac.me) adresinde yayında. Türkçe ve İngilizce tek sayfa React uygulaması; aydınlık/karanlık tema, belgeli staj kayıtları ve birinci taraf üzerinden sunulan Umami analitiği içerir.

English version: [README.md](README.md).

## Çalıştırma

```bash
bun install
bun dev            # geliştirme sunucusu
bun run build      # tür denetimi + production derlemesi
bun run lint       # ESLint
```

## Yapılandırma

`.env.example` dosyasını `.env` olarak kopyalayıp Umami değerlerini doldurun. Bu değerler yoksa site noop logger ile çalışır, takip kapalı kalır.

## Yayınlama

```bash
docker compose up -d --build
```

Stack: Cloudflare Tunnel arkasında portfolio + Umami + PostgreSQL + Traefik. CI, `main`'e her push'ta imajı derleyip `ghcr.io`'ya gönderir. Detay için `docker-compose.yml`.

## Teknolojiler

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## Lisans

MIT.
