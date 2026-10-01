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

# Copiar código-fonte do backend
COPY apps/backend ./apps/backend

# Compilar TypeScript do backend
RUN pnpm --filter @come-pizza/backend build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/node_modules ./node_modules

EXPOSE 3001

CMD ["node", "dist/index.js"]
