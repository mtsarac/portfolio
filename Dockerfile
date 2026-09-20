# ---- Build ----
FROM oven/bun:1.4.2-alpine@sha256:d888c0ae6c86d7866ff10c5aafdd9077b36aee6455b33dd270fb93c0dd5cef6f AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG VITE_UMAMI_SITE_ID
ARG VITE_UMAMI_SCRIPT_URL
ARG VITE_UMAMI_DOMAINS
ENV VITE_UMAMI_SITE_ID=$VITE_UMAMI_SITE_ID
ENV VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL
ENV VITE_UMAMI_DOMAINS=$VITE_UMAMI_DOMAINS

COPY . .
RUN bun run build

# ---- Serve ----
FROM nginx:alpine@sha256:62ff2089abf5a9ed33bd232895bef5e22f7bb4b200675cec49a5ebc48e3d4ac8
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
