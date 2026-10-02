# 🍕 COME PIZZA — Plataforma D2C de Delivery de Pizza Artesanal

> Gastronomia de alta precisão no calor bruto da lenha (480°C). Fermentação natural biga 72 horas com farinha italiana 00 D.O.P. e molho de tomate San Marzano.

---

## 📐 Visão Geral da Arquitetura

O **COME PIZZA** é um sistema Monorepo gerenciado com **`pnpm`**, composto por microsserviços e aplicações frontend orientadas a funcionalidades (*Feature-Based Architecture*):

- **`apps/backend`**: API RESTful em **Node.js** + **TypeScript** + **Fastify**, **Vitest** (Test-Driven Development 100% testado), **PostgreSQL 16** (pedidos polimórficos via JSONB) e **Redis 7** (Pub/Sub e Rastreamento Geográfico via `GEOADD`/`GEORADIUS`).
- **`apps/frontend`**: Aplicação **Next.js 14** (App Router) + **React 18** + **Tailwind CSS**, com exportação estática (`output: 'export'`), suporte a Dark Mode Obsidian e telas interativas (Montador 2D de Pizzas, Cardápio, Rastreamento ao Vivo, Cozinha KDS e Admin Operacional).
- **`docs/`**: Guias de Arquitetura e Diretrizes para Agentes de IA ([arquitetura-frontend.md](docs/arquitetura-frontend.md) e [arquitetura-backend.md](docs/arquitetura-backend.md)).

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

1. **Node.js** (versão 20.x ou superior)
2. **pnpm** (gerenciador de pacotes padrão v9.x) — `npm install -g pnpm`
3. **Docker** e **Docker Compose** (para infraestrutura local de bancos e containers)

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar o repositório e instalar dependências
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/come_pizza.git
cd come_pizza

# Instale todas as dependências do monorepo via pnpm
pnpm install
```

---

### 2. Iniciar a Infraestrutura de Banco de Dados e Cache (Docker)
Suba os containers do **PostgreSQL 16** (porta 5432) e **Redis 7** (porta 6379), além das imagens do backend e frontend se desejar:

```bash
# Subir apenas banco e cache para desenvolvimento local
docker-compose up -d postgres redis

# Ou subir toda a stack em containers (Postgres + Redis + Backend + Frontend)
docker-compose up -d --build
```

---

### 3. Executar o Backend (API Fastify)

```bash
# Iniciar o servidor backend em modo desenvolvimento (Live Reload)
pnpm --filter @come-pizza/backend dev

# Executar a suíte de testes automatizados (Vitest)
pnpm --filter @come-pizza/backend test

# Executar a verificação de tipos e build do backend
pnpm --filter @come-pizza/backend build
```

A API estará disponível em `http://localhost:3001`.

---

### 4. Executar o Frontend (Next.js App Router)

```bash
# Iniciar o servidor de desenvolvimento do Next.js
pnpm --filter @come-pizza/frontend dev

# Executar os testes unitários do frontend
pnpm --filter @come-pizza/frontend test
```

Acessem a aplicação no navegador em:
- **Cardápio Principal**: [http://localhost:3000](http://localhost:3000)
- **Montador 2D de Pizzas**: [http://localhost:3000/customizer](http://localhost:3000/customizer)

---

### 5. Build Estático do Frontend & Deploy no Firebase

```bash
# Gerar a build estática otimizada do frontend (pasta apps/frontend/out/)
pnpm --filter @come-pizza/frontend build

# (Opcional) Testar deploy no Firebase Hosting via CLI de dentro do frontend
cd apps/frontend
firebase deploy
```

---

## ⚙️ CI/CD & Deploy Automatizado (GitHub Actions & Firebase Hosting)

O projeto conta com uma pipeline completa de Integração e Entrega Contínua configurada em [.github/workflows/deploy-frontend-firebase.yml](.github/workflows/deploy-frontend-firebase.yml), composta por 4 jobs em paralelo e sequência:

1. **🔒 Varredura de Segurança**: Detecção de segredos via `Gitleaks` e auditoria de vulnerabilidades de dependências (`pnpm audit`).
2. **🧪 Execução de Testes**: Suíte de testes unitários com Vitest e exibição de resumo visual no *GitHub Step Summary*.
3. **🔍 Análise Estática**: Checagem rigorosa de tipos TypeScript (`tsc --noEmit`).
4. **🚀 Deploy no Firebase Hosting**: Deploy automático utilizando *GitHub Environments*:
   - **Preview Channel**: Gerado automaticamente para Pull Requests.
   - **Live Production**: Publicado na ramificação principal (`main`).

---

## 📁 Estrutura de Pastas do Monorepo

```
come_pizza/
├── .github/
│   └── workflows/              # Pipeline CI/CD GitHub Actions (Deploy Firebase)
├── apps/
│   ├── backend/                # API Fastify Node.js/TypeScript
│   │   ├── Dockerfile          # Multi-stage build otimizado com pnpm deploy
│   │   └── src/
│   │       ├── domain/         # Entidades (OrderEntity, CourierLocation)
│   │       ├── use-cases/      # Casos de uso (CreateOrder, UpdateTracking)
│   │       ├── infra/          # Repositórios Postgres e Redis
│   │       └── presentation/   # Controllers e rotas Fastify
│   │
│   └── frontend/               # Next.js 14 App Router (Feature-Based Architecture)
│       ├── Dockerfile          # Multi-stage build para servir build estático
│       ├── firebase.json       # Configuração do Firebase Hosting SPA
│       ├── .firebaserc         # Alias do projeto Firebase
│       ├── public/             # Logo SVG/PNG e assets
│       └── src/
│           ├── app/            # Rotas (/ e /customizer)
│           ├── features/       # Módulos encapsulados (catalog, customizer)
│           └── shared/         # Primitivos e componentes compartilhados
│
├── docs/                       # Diretrizes de Arquitetura para Agentes de IA
│   ├── arquitetura-frontend.md # Guia de arquitetura e pastas React/Next.js
│   └── arquitetura-backend.md  # Guia de Clean Architecture, DDD e TDD
├── docker-compose.yml          # Stack Docker (Postgres 16, Redis 7, Backend, Frontend)
├── pnpm-workspace.yaml         # Configuração do Monorepo pnpm
└── README.md                   # Documentação do projeto
```

---

## 🧪 Suíte de Testes (TDD Backend & Frontend)

O sistema foi construído seguindo rigorosamente a metodologia **TDD (Test-Driven Development)**:

```bash
# Executar todos os testes de todos os pacotes do monorepo
pnpm test
```

### Principais Casos de Teste Cobertos:
- ✅ Cálculo de preço com bordas recheadas e ingredientes extras
- ✅ Divisão Meio a Meio com preço da metade de maior valor + acréscimo proporcional
- ✅ Transição de estados de pedido (`CREATED` ➔ `PREPARING` ➔ `BAKING` ➔ `DISPATCHED` ➔ `DELIVERED`)
- ✅ Atualização de localização geográfica de entregadores no Redis (`GEOADD` / `GEORADIUS`)

---

## 🎨 Identidade Visual & Design System
- **Tema**: Obsidian Dark Mode (`#111319` background) com acentos em vermelho brasa (`#FF4D4D`) e laranja forno (`#EC6A06`).
- **Tipografia**: *Outfit* (títulos e corpos) & *Space Grotesk* (badges e labels numéricas).
- **Logotipo**: SVG oficial com vetorização de chama artesanal e slice napolitano em `apps/frontend/public/logo.svg`.

---

## 📄 Licença
Propriedade privada de **COME PIZZA Artesanal D2C**. Todos os direitos reservados.
