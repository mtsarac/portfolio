# ---- Build ----
FROM oven/bun:1.4.3-alpine@sha256:629e17411f1f129dbec3af78d5af9c9f2a937435c80349437206c6b0b7422373 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG VITE_UMAMI_SITE_ID
ARG VITE_UMAMI_SCRIPT_URL
ARG VITE_UMAMI_DOMAINS
ARG VITE_UMAMI_RECORDER_URL
ENV VITE_UMAMI_SITE_ID=$VITE_UMAMI_SITE_ID
ENV VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL
ENV VITE_UMAMI_DOMAINS=$VITE_UMAMI_DOMAINS
ENV VITE_UMAMI_RECORDER_URL=$VITE_UMAMI_RECORDER_URL

COPY . .
RUN bun run build

# ---- Serve ----
FROM nginx:alpine@sha256:62ff2089abf5a9ed33bd232895bef5e22f7bb4b200675cec49a5ebc48e3d4ac8
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
