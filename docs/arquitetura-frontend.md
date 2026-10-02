---
name: arquitetura-frontend
description: "Guia e padrões de arquitetura e organização de pastas escalável para projetos React/Front-end baseado na metodologia Rocketseat. Utilize quando for criar novos componentes, estruturar projetos ou refatorar a árvore de pastas no React."
category: architecture
---

# Arquitetura e Organização de Pastas no React (Estrutura Escalável)

Este documento define as diretrizes arquiteturais para projetos Front-end em **React** (JavaScript / TypeScript). Ele serve como instrução direta para agentes e desenvolvedores sobre como estruturar, modularizar e manter aplicações limpas e sustentáveis.

---

## 🎯 Princípios Fundamentais

1. **Baixo Acoplamento e Alta Coesão**: Cada componente ou módulo deve ter responsabilidade clara e encapsular seus próprios recursos (estilos, testes, tipos).
2. **Encapsulamento por Funcionalidade (Feature-based)**: Recursos específicos de um domínio de negócio devem residir juntos na camada de `features/`.
3. **Reutilização Inteligente**: Componentes genéricos de UI pertencem a `components/`, enquanto lógicas e telas específicas pertencem a `features/` e `pages/`.
4. **Importações Limpas**: Utilização de exportações via `index.js/ts` (barrels) e caminhos absolutos (`baseUrl` / path aliases) para evitar importações relativas profundas (`../../..`).

---

## 🪜 Evolução da Estrutura de Pastas

Conforme o projeto cresce, a estrutura de pastas evolui em etapas:

### 1. Separação Modular Básica (Projetos Iniciais / Pequenos)
Ao extrair a lógica do arquivo principal (`App.js`), separam-se os componentes em arquivos individuais:
```text
src/
├── App.js
├── List.js
└── ListItem.js
```

### 2. Encapsulamento por Componente (Component Folder Pattern)
Cada componente passa a ter sua própria pasta contendo o componente, seus estilos e testes:
```text
src/
└── components/
    ├── App/
    │   ├── App.js
    │   ├── App.test.js
    │   └── App.css
    └── List/
        ├── List.js
        ├── ListItem.js
        └── List.css
```

### 3. Divisão entre Componentes Genéricos e Funcionalidades (Features)
Diferenciar o que é UI genérica do que é regra/domínio da aplicação:
- `src/components/`: Componentes agnósticos ao negócio (botões, inputs, modais).
- `src/features/`: Componentes, formulários e estados específicos de um módulo de negócio (Autenticação, Carrinho, Dashboard).

```text
src/
├── components/          # Reutilizáveis em qualquer parte do sistema
│   ├── Button/
│   └── Input/
├── features/            # Específicos do domínio do negócio
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Register.js
│   └── Dashboard/
└── services/            # Integração com APIs externas
    └── api.js
```

---

## 📁 Estrutura Completa de Referência Escalável

Abaixo está o modelo completo recomendado para projetos React de médio e grande porte:

```text
meu-projeto-react/
├── public/
│   └── index.html
├── src/
│   ├── assets/                  # Arquivos estáticos (imagens, SVGs, fontes)
│   ├── components/              # Componentes de UI genéricos e reutilizáveis
│   │   ├── Button/
│   │   │   ├── Button.jsx (ou .tsx)
│   │   │   ├── Button.module.css (ou Button.styles.js / Styled Components)
│   │   │   ├── Button.test.jsx
│   │   │   └── index.js
│   │   ├── Modal/
│   │   └── index.js             # Exportador central de componentes de UI
│   ├── context/                 # Contextos globais (React Context API)
│   │   └── AuthContext.jsx
│   ├── features/                # Módulos de domínio / funcionalidades específicas
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── authSlice.js (ou authStore.ts)
│   │   └── Dashboard/
│   │       ├── Dashboard.jsx
│   │       ├── Dashboard.css
│   │       └── Dashboard.test.jsx
│   ├── hooks/                   # Custom Hooks reutilizáveis
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── pages/                   # Páginas / Roteamento principal da aplicação
│   │   ├── Home.jsx
│   │   └── Profile.jsx
│   ├── services/                # Clientes HTTP, instâncias Axios e serviços de API
│   │   ├── api.js
│   │   └── authService.js
│   ├── styles/                  # Estilos globais, temas e variáveis CSS
│   │   ├── variables.css
│   │   └── main.css
│   ├── utils/                   # Funções utilitárias puras e helpers
│   │   ├── formatDate.js
│   │   └── slugify.js
│   ├── App.jsx
│   ├── index.jsx
│   └── setupTests.js
├── .env
├── jsconfig.json (ou tsconfig.json)
├── package.json
└── README.md
```

---

## 🛠️ Regras de Organização das Camadas

| Pasta | Responsabilidade | Exemplo de Conteúdo |
| :--- | :--- | :--- |
| `assets/` | Recursos visuais e mídias estáticas | Logos, ilustrações, ícones em SVG/PNG |
| `components/` | Elementos visuais genéricos (UI Kit local) | `Button`, `Input`, `Card`, `Modal`, `Table` |
| `features/` | Funcionalidades completas ligadas à regra de negócio | `Auth/Login`, `Checkout/Cart`, `Products/ProductGrid` |
| `context/` | Estados globais compartilhados por toda a app | `AuthContext`, `ThemeContext`, `CartContext` |
| `hooks/` | Hooks customizados e lógicas comportamentais reutilizáveis | `useAuth`, `useFetch`, `useDebounce`, `useLocalStorage` |
| `pages/` | Componentes de página (containers das rotas) | `Home`, `CheckoutPage`, `UserProfilePage` |
| `services/` | Comunicação com APIs, WebSockets e serviços externos | Instância do Axios, métodos da API (`getProducts`, `loginUser`) |
| `styles/` | Regras globais de estilo e reset de CSS | `variables.css`, `global.css`, tokens de design |
| `utils/` | Funções puras utilitárias (sem JSX ou hooks) | `formatCurrency`, `maskCPF`, `validateEmail` |

---

## ⚙️ Boas Práticas e Padrões de Código

### 1. Uso de Arquivos `index.js` (Export Barrel Pattern)
Para simplificar chamadas e esconder detalhes de implementação interna:

```javascript
// src/components/Button/index.js
export { default as Button } from './Button';

// src/components/index.js
export { Button } from './Button';
export { Modal } from './Modal';
```

Isso permite importações diretas:
```javascript
import { Button, Modal } from 'components';
```

### 2. Importações Absolutas (`baseUrl` / Path Aliases)
Evite caminhos relativos complexos como `../../components/Button`.

**Em JavaScript (`jsconfig.json`):**
```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

**Em TypeScript (`tsconfig.json`):**
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@features/*": ["features/*"],
      "@hooks/*": ["hooks/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

Com essa configuração:
```javascript
// Antes (Ruim):
import Button from '../../components/Button';

// Depois (Recomendado):
import Button from 'components/Button';
// ou com alias:
import Button from '@components/Button';
```

### 3. Estratégias de Estilização Encapsulada

#### A. CSS Modules
Garante escopo local para os estilos, evitando vazamento ou conflito de nomes de classes:
```css
/* Button.module.css */
.button {
  background-color: #8257e5;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
```
```javascript
// Button.jsx
import styles from './Button.module.css';

const Button = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
```

#### B. Styled Components / CSS-in-JS
Encapsula o estilo diretamente no componente React:
```javascript
// Button.jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #8257e5;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    background-color: #996dff;
  }
`;

export default function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
```

---

## ✅ Checklist do Agente para Modificações no Front-end

Ao criar, mover ou refatorar arquivos React, o agente deve seguir este procedimento:

- [ ] **Classificação do Componente**: É genérico (`components/`) ou de domínio (`features/`)?
- [ ] **Encapsulamento**: O novo componente possui pasta dedicada contendo componente, estilos e index?
- [ ] **Centralização de Lógica**: Regras de API estão em `services/` e Custom Hooks em `hooks/`?
- [ ] **Importações Absolutas**: As importações estão usando o caminho relativo curto ou aliases configurados?
- [ ] **Estilos Encapsulados**: O CSS está escopado via CSS Modules, Styled Components ou Tailwind sem alterar CSS global desnecessariamente?
