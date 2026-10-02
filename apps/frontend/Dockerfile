# Stage 1: Builder
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copiar arquivos de configuração do workspace monorepo
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Instalar dependências do monorepo
RUN pnpm install --frozen-lockfile || pnpm install

# Copiar código-fonte do frontend
COPY apps/frontend ./apps/frontend

# Build Next.js estático
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @come-pizza/frontend build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Servidor estático leve para a pasta out
RUN npm install -g serve

COPY --from=builder /app/apps/frontend/out ./out

EXPOSE 3000

CMD ["serve", "-s", "out", "-l", "3000"]
