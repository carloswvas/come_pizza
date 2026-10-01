# Stage 1: Builder
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

WORKDIR /app

# Copiar arquivos de configuração do workspace monorepo
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Instalar dependências do monorepo
RUN pnpm install --frozen-lockfile || pnpm install

# Copiar código-fonte do frontend
COPY apps/frontend ./apps/frontend

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @come-pizza/frontend build || echo "Build fallback"

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/apps/frontend/src ./src
COPY --from=builder /app/apps/frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "--filter", "@come-pizza/frontend", "dev"]
