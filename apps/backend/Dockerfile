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

# Copiar código-fonte do backend
COPY apps/backend ./apps/backend

# Compilar TypeScript do backend
RUN pnpm --filter @come-pizza/backend build

# Isolamento de dependências de produção via pnpm deploy
RUN pnpm deploy --filter=@come-pizza/backend --prod /deploy

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copiar aplicação pronta e isolada
COPY --from=builder /deploy ./

EXPOSE 3001

CMD ["node", "dist/index.js"]
