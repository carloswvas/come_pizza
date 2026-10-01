# 🍕 COME PIZZA — Plataforma D2C de Delivery de Pizza Artesanal

> Gastronomia de alta precisão no calor bruto da lenha (480°C). Fermentação natural biga 72 horas com farinha italiana 00 D.O.P. e molho de tomate San Marzano.

---

## 📐 Visão Geral da Arquitetura

O **COME PIZZA** é um sistema Monorepo gerenciado com **`pnpm`**, composto por microsserviços e aplicações frontend orientadas a funcionalidades (*Feature-Based Architecture*):

- **`apps/backend`**: API RESTful em **Node.js** + **TypeScript** + **Fastify**, **Vitest** (Test-Driven Development 100% testado), **PostgreSQL 16** (pedidos polimórficos via JSONB) e **Redis 7** (Pub/Sub e Rastreamento Geográfico via `GEOADD`/`GEORADIUS`).
- **`apps/frontend`**: Aplicação **Next.js 14** (App Router) + **React 18** + **Tailwind CSS**, com exportação estática (`output: 'export'`), suporte a Dark Mode Obsidian e telas interativas (Montador 2D de Pizzas, Cardápio, Rastreamento ao Vivo, Cozinha KDS e Admin Operacional).

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

1. **Node.js** (versão 18.x ou superior)
2. **pnpm** (gerenciador de pacotes padrão) — `npm install -g pnpm`
3. **Docker** e **Docker Compose** (para subir o PostgreSQL e o Redis localmente)

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
Suba os containers do **PostgreSQL 16** (porta 5432) e **Redis 7** (porta 6379):

```bash
docker-compose up -d
```

> **Verificação**: Certifique-se de que os containers `come_pizza_postgres` e `come_pizza_redis` estão ativos rodando `docker ps`.

---

### 3. Executar o Backend (API Fastify)

#### Modos de execução do Backend:
```bash
# Iniciar o servidor backend em modo desenvolvimento (Live Reload)
pnpm --filter @come-pizza/backend dev

# Executar a suíte de testes automatizados (Vitest - 14/14 tests passing)
pnpm --filter @come-pizza/backend test

# Executar a verificação de tipos e build do backend
pnpm --filter @come-pizza/backend build
```

A API estará rodando em `http://localhost:3001`.

---

### 4. Executar o Frontend (Next.js App Router)

#### Modos de execução do Frontend:
```bash
# Iniciar o servidor de desenvolvimento do Next.js
pnpm --filter @come-pizza/frontend dev
```

Acesse a aplicação no navegador em:
- **Cardápio Principal**: [http://localhost:3000](http://localhost:3000)
- **Montador 2D de Pizzas**: [http://localhost:3000/customizer](http://localhost:3000/customizer)

---

### 5. Compilar o Frontend para Exportação Estática (Production Build)

Para gerar a build estática otimizada do frontend (pasta `apps/frontend/out/`):

```bash
pnpm --filter @come-pizza/frontend build
```

---

## 📁 Estrutura de Pastas do Projeto

```
come_pizza/
├── apps/
│   ├── backend/                 # API Fastify Node.js/TypeScript
│   │   ├── src/
│   │   │   ├── domain/          # Entidades (OrderEntity, CourierLocation)
│   │   │   ├── use-cases/       # Casos de uso (CreateOrder, UpdateTracking)
│   │   │   ├── infra/           # Repositórios Postgres e Redis
│   │   │   └── presentation/    # Controllers e rotas Fastify
│   │   └── Vitest Tests         # Suíte de testes unitários/integração
│   │
│   └── frontend/                # Next.js 14 App Router
│       ├── public/              # Logo SVG/PNG e assets
│       └── src/
│           ├── app/             # Rotas (/ e /customizer)
│           ├── features/        # Feature-Based Architecture
│           │   ├── catalog/     # Header, Hero, ProductGrid, CartDrawer
│           │   └── customizer/  # Canvas 2D, Size, Flavor, Crust, Bake
│           └── shared/          # Componentes globais compartilhados
│
├── public/                      # Assets globais e protótipos Stitch UI
├── docker-compose.yml           # Configuração Docker (Postgres 16 + Redis 7)
├── pnpm-workspace.yaml          # Configuração de workspaces pnpm
└── README.md                    # Documentação do projeto
```

---

## 🧪 Suíte de Testes (TDD Backend)

O backend foi construído seguindo rigorosamente a metodologia **TDD (Test-Driven Development)**:

```bash
pnpm --filter @come-pizza/backend test
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
- **Logotipo**: SVG oficial com vetorização de chama artesanal e slice napolitano em `public/logo.svg`.

---

## 📄 Licença
Propriedade privada de **COME PIZZA Artesanal D2C**. Todos os direitos reservados.
