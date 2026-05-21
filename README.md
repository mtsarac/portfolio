# portfolio-site

Kişisel portfolio sitesi — Muhammet Saraç

## Özellikler

- **Çoklu Dil**: TR / EN geçiş butonu
- **Karanlık / Aydınlık Mod**: Sistem tercihini okur, manuel geçiş
- **Ziyaretçi Loglama**: LocalStorage tabanlı, soyut servis katmanı sayesinde Google Analytics / Umami entegrasyonu kolayca eklenebilir
- **Docker Desteği**: Multi-stage build ile hazır

## Geliştirme

```bash
bun dev
```

## Build

```bash
bun run build
```

## Docker ile Çalıştırma

```bash
docker compose up -d --build
# http://localhost:8080
```

## Proje Yapısı

```
src/
├── features/        # Her özellik kendi klasöründe
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── i18n/        # Dil sistemi + çeviriler
│   ├── logging/     # Ziyaretçi loglama (genişletilebilir)
│   ├── skills/
│   └── theme/       # Dark/Light mod
├── components/      # Ortak UI bileşenleri
├── hooks/           # Custom hook'lar
└── types/           # TypeScript tip tanımları
```

## Lisans

MIT

