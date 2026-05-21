# ---- Build ----
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG VITE_UMAMI_SITE_ID
ARG VITE_UMAMI_URL
ENV VITE_UMAMI_SITE_ID=$VITE_UMAMI_SITE_ID
ENV VITE_UMAMI_URL=$VITE_UMAMI_URL

COPY . .
RUN bun run build

# ---- Serve ----
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
