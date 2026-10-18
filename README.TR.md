# portfolio

[![CI](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/ci.yml)
[![Docker](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml/badge.svg)](https://github.com/mtsarac/portfolio/actions/workflows/docker.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/mtsarac/portfolio/badge)](https://securityscorecards.dev/viewer/?uri=github.com/mtsarac/portfolio)

Muhammet Saraç'ın kişisel sitesi, [msarac.me](https://msarac.me) adresinde yayında. Türkçe ve İngilizce tek sayfa React uygulaması; aydınlık/karanlık tema, belgeli staj kayıtları ve birinci taraf üzerinden sunulan analitik, indirilebilir CV ve PWA desteği içerir.

English version: [README.md](README.md).

## Çalıştırma

Bun 1.4.2 gerekir (`Dockerfile` ile aynı).

```bash
bun install
bun dev            # geliştirme sunucusu
bun run build      # tür denetimi + production derlemesi
bun run lint       # ESLint
```

## Yapılandırma

`.env.example` dosyasını `.env` olarak kopyalayıp analitiği açmak için `VITE_*` değerlerini doldurun. Bu değerler yoksa site noop logger ile çalışır, takip kapalı kalır. Değerler derleme zamanındadır: pakete gömülür, değiştirmek yeniden derleme ister.

| Değişken | Amaç |
|---|---|
| `VITE_UMAMI_SITE_ID` | Umami site kimliği (script URL ile birlikte zorunlu) |
| `VITE_UMAMI_SCRIPT_URL` | Takip scripti URL'si (zorunlu) |
| `VITE_UMAMI_DOMAINS` | İzin verilen takip alan adları; compose varsayılanı `msarac.me,www.msarac.me` |
| `VITE_UMAMI_RECORDER_URL` | İsteğe bağlı oturum kaydedici scripti |

## Yayınlama

Üretim, `main`'e her push'ta Dockhand tarafından yayınlanır (GitHub webhook). CI (`.github/workflows/docker.yml`) imajı yalnız doğrulamak için derler, hiçbir şey gönderilmez.

Önkoşullar: Docker Compose v2, harici `traefik-net` Docker ağı ve `VITE_UMAMI_*` değerlerini içeren bir `.env`.

```bash
docker compose up -d --build
```

Stack: Cloudflare Tunnel arkasında yalnız portfolio (`traefik-net` üzerinde Traefik yönlendirmesi). Analitik arka ucu ayrı yönetilir, portfolio yayınları onu yeniden başlatmaz. Detay için `docker-compose.yml`.

## Teknolojiler

React 19, TypeScript, Vite, Bun, Tailwind CSS 4, GSAP.

## Katkı ve güvenlik

Tüm değişiklikler pull request ile gelir; kurallar için [AGENTS.md](AGENTS.md). Güvenlik açıklarını [SECURITY.md](SECURITY.md) içinde anlatıldığı gibi özel olarak bildirin.

## Lisans

[MIT](LICENSE).
