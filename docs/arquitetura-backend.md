---
name: arquitetura-backend
description: "Guia e padrões de arquitetura backend (Monólito Modular + Arquitetura Hexagonal / Ports & Adapters) para orientação de agentes de IA na criação, estruturação e refatoração de módulos, casos de uso, repositórios e serviços do Come Pizza."
category: architecture
---

# Arquitetura e Organização do Backend (Monólito Modular + Hexagonal)

Este documento define as diretrizes arquiteturais para desenvolvimento do backend do projeto **Come Pizza**. Ele serve como instrução direta para agentes de IA e desenvolvedores sobre como estruturar, criar e manter módulos, casos de uso, repositórios e rotas com código limpo, testável e desacoplado.

---

## 🎯 Princípios Fundamentais

1. **Um Módulo = Um Bounded Context (Capacidade de Negócio)**: Cada módulo em `apps/backend/src/modules/` representa um domínio funcional (ex: pedidos, rastreamento, cardápio). Múltiplas tabelas relacionadas residem no mesmo módulo se pertencerem à mesma capacidade de negócio.
2. **Isolamento de Banco de Dados**: Nenhum módulo lê ou escreve diretamente na tabela de outro módulo. A comunicação síncrona entre módulos ocorre via portas de entrada e a leitura de dados de outros domínios é feita por interfaces/adaptadores.
3. **Arquitetura Hexagonal (Ports & Adapters)**: Cada módulo isola seu domínio central de tecnologias externas (Fastify, Drizzle/Prisma, WebSockets, serviços de pagamento, etc.).
4. **Comunicação por Eventos (Event-Driven)**: Efeitos colaterais e desacoplamento assíncrono entre módulos ocorrem via **Event Bus interno** em memória (publish/subscribe).
5. **Inversão de Dependência**: As camadas internas (`domain` e `application`) nunca dependem das camadas externas (`infrastructure`). A infraestrutura implementa as portas definidas pelo domínio.

---

## 🏗️ As 3 Subcamadas Hexagonais por Módulo

Cada módulo dentro de `apps/backend/src/modules/<modulo>/` é estruturado rigorosamente em 3 subcamadas:

```text
apps/backend/src/modules/<nome-modulo>/
├── domain/            # 1. Regras de negócio puras (sem dependências de framework/HTTP/ORM)
│   ├── entities/      # Entidades do domínio com comportamentos e validações (ex: Order, PizzaItem)
│   ├── value-objects/ # Objeto de valor imutáveis (ex: OrderStatus, Money, Address)
│   ├── services/      # Serviços de domínio para regras puras envolvendo múltiplas entidades
│   └── ports/         # Contratos e interfaces (Inversão de Dependência)
│       ├── in/        # Interfaces dos casos de uso acessíveis por adaptadores de entrada
│       └── out/       # Interfaces para repositórios, gateways e clientes externos
├── application/       # 2. Orquestração de fluxos e casos de uso
│   ├── use-cases/     # Implementação dos casos de uso (ex: create-order.use-case.ts)
│   └── dto/           # Data Transfer Objects (estruturas de entrada e saída)
├── infrastructure/    # 3. Detalhes técnicos e adaptadores
│   ├── http/          # Controllers, rotas, schemas Zod/Fastify, middlewares locais
│   ├── database/      # Repositórios concretos (Drizzle/SQL), schemas do banco
│   └── <service>/     # Adaptadores externos concretos (Gateways de Pagamento, WebSockets, Push)
└── <modulo>.module.ts # Wiring / Injeção de dependência do módulo
```

---

## 📋 Regras de Responsabilidade por Camada

| Camada / Pasta | O que DEVE conter | O que NÃO DEVE conter |
| :--- | :--- | :--- |
| `domain/entities/` | Entidades puras, métodos de comportamento do domínio, validação de invariantes. | SQL, Decorators de ORM, imports do Fastify/Express, bibliotecas de terceiros. |
| `domain/value-objects/` | Tipos imutáveis com validação própria (`OrderStatus`, `Money`, `Address`). | Dependências externas complexas ou estado mutável. |
| `domain/ports/in/` | Interfaces TypeScript dos Use Cases (`ExecuteInput -> ExecuteOutput`). | Código executável ou implementações. |
| `domain/ports/out/` | Interfaces TypeScript de Repositórios e Serviços Externos (`OrderRepositoryPort`). | Imports de drivers de banco (`drizzle-orm`, `pg`) ou SDKs de terceiros. |
| `application/use-cases/` | Orquestração do fluxo de negócio, transações, chamada de portas `out` e eventos. | Parsing de requisição HTTP (`req`, `res`), queries SQL diretas. |
| `application/dto/` | DTOs de entrada e saída puras (types / interfaces). | Lógica de validação HTTP (fica nos Controllers/Schemas Zod da infra). |
| `infrastructure/http/` | Controllers, rotas Fastify, validação de payload (Zod), status codes HTTP. | Regras de negócio ou regras de cálculo de domínio. |
| `infrastructure/database/` | Implementação concreta das portas `out` utilizando Drizzle/SQL. | Tratamento de requisição HTTP ou regras de orquestração. |

---

## 🔗 Comunicação Entre Módulos

### 1. Comunicação Síncrona (Direta em Memória)
- O **Módulo A** (ex: `orders`) chama a **Porta de Entrada (`port/in`)** do **Módulo B** (ex: `catalog`).
- A chamada ocorre em memória, sem requisição HTTP.
- O **Módulo A** nunca faz consulta SQL na tabela mantida pelo **Módulo B**.

### 2. Comunicação Assíncrona (Event Bus Interno)
- Usada para **efeitos colaterais** (notificações de mudança de status, atualização de rastreamento).
- O Módulo A publica um evento de domínio: `domainEventBus.publish(new OrderStatusChangedEvent(orderId, newStatus))`.
- O módulo `tracking` ou `notifications` escuta o evento e atualiza o estado de entrega.

---

## 📁 Shared Kernel (`apps/backend/src/shared/`)

Contém utilitários transversais reutilizados por todos os módulos do backend do **Come Pizza**:

```text
apps/backend/src/shared/
├── domain/
│   ├── value-objects/  # Value Objects genéricos (Money, Address, Pagination)
│   └── events/         # Base para DomainEvent, EventPublisher, EventListener
├── infrastructure/
│   ├── http/           # Middlewares globais (Auth JWT, Error Handler, Rate Limit)
│   └── database/       # Conexão com o banco, instância Drizzle, migrations
└── errors/             # AppError e exceções de domínio padronizadas
```

---

## 🏷️ Convenção de Nomenclatura de Arquivos

| Elemento | Sufixo do Arquivo | Exemplo |
| :--- | :--- | :--- |
| **Entidade** | `.entity.ts` | `order.entity.ts` |
| **Value Object** | `.vo.ts` | `order-status.vo.ts` |
| **Serviço de Domínio** | `.service.ts` | `order-calculator.service.ts` |
| **Porta de Entrada (In)** | `.port.ts` | `create-order.port.ts` |
| **Porta de Saída (Out)** | `.repository.ts` ou `.service.ts` | `order.repository.ts`, `payment.service.ts` |
| **Caso de Uso** | `.use-case.ts` | `create-order.use-case.ts` |
| **DTO** | `.dto.ts` | `create-order.dto.ts` |
| **Controller** | `.controller.ts` | `order.controller.ts` |
| **Repositório Concreto** | `.repository.drizzle.ts` | `order.repository.drizzle.ts` |
| **Adaptador Concreto** | `.adapter.ts` | `stripe-payment.adapter.ts` |
| **Módulo Wiring** | `.module.ts` | `orders.module.ts` |

---

## 🍕 Módulos do Domínio (Come Pizza)

Módulos existentes e previstos para a aplicação de delivery de pizza:

- **`orders`**: Criação, atualização de status e histórico de pedidos de pizza.
- **`tracking`**: Rastreamento em tempo real do status de preparo e entrega do pedido.
- **`catalog` / `menu`**: Cardápio de pizzas, sabores, tamanhos, bordas e adicionais.
- **`identity`**: Autenticação e perfil dos clientes e entregadores.
- **`payments`**: Integração com gateways de pagamento (Pix, Cartão).

---

## ✅ Checklist do Agente para Modificações no Backend

Ao criar, mover ou refatorar arquivos no backend, o agente deve obrigatoriamente verificar:

- [ ] **Isolamento de Domínio**: O código em `domain/` está livre de qualquer importação de Fastify, Express, Drizzle ou bibliotecas de infraestrutura?
- [ ] **Portas de Entrada/Saída**: As interfaces foram definidas em `domain/ports/` antes das implementações concretas?
- [ ] **Acesso ao Banco**: A consulta SQL/Drizzle está estritamente localizada em `infrastructure/database/`?
- [ ] **Injeção de Dependências**: As dependências do Use Case são passadas via construtor/interface em vez de instanciação direta?
- [ ] **Comunicação Inter-módulos**: O acesso a outro módulo ocorre via Porta de Entrada (`port/in`) ou evento no `DomainEventBus`, sem acoplamento direto de banco de dados?
- [ ] **Nomenclatura**: Os arquivos seguem o padrão de sufixos (`.entity.ts`, `.use-case.ts`, `.repository.drizzle.ts`) em `kebab-case`?
