# ---- Build ----
FROM oven/bun:1.4.5-alpine@sha256:da816670775f4c2b4e990b6b1847cf5540dcdc721a42033dd331ce7a88ba6a3b AS builder
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
FROM nginx:alpine@sha256:df221db836e1754089190208cee7eeda94f233197056426eda74a43ab1abeac2
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
