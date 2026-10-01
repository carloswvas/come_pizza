# 🎨 Mapeamento de Telas, Mockups & Protótipos — COME PIZZA

Todas as telas geradas pelo Stitch/IA estão organizadas e padronizadas dentro da pasta:
👉 **[`public/assets/screens/stitch_come_pizza_ui_ux_platform/`](../public/assets/screens/stitch_come_pizza_ui_ux_platform/)**

Cada pasta contém o protótipo funcional em HTML (`code.html`) e o preview em imagem (`screen.png`).

---

## 📁 Tabela de Mapeamento de Telas & Rotas do Frontend

| Pasta de Referência Visual / Código | Descrição da Tela / Módulo | Rota Correspondente no Next.js (`apps/frontend/src/app`) |
| :--- | :--- | :--- |
| **`00-logo-brand/`** | Marca & Logo Vetorial Oficial | Componentes de marca / Header |
| **`01-home-cardapio/`** | Cardápio Digital Interativo | `apps/frontend/src/app/page.tsx` |
| **`02-montador-customizer-2d/`** | Montador 2D de Pizzas Gourmet | `apps/frontend/src/app/customizer/page.tsx` |
| **`03-checkout-pix/`** | Checkout & Pagamento PIX | `apps/frontend/src/app/checkout/page.tsx` |
| **`04-rastreamento-pedido/`** | Rastreamento de Pedido em Tempo Real | `apps/frontend/src/app/tracking/[orderId]/page.tsx` |
| **`05-cozinha-kds/`** | Painel Touchscreen da Cozinha (KDS) | `apps/frontend/src/app/kds/page.tsx` |
| **`06-entregador-pwa/`** | Painel Mobile PWA do Entregador | `apps/frontend/src/app/courier/page.tsx` |
| **`07-admin-dashboard/`** | Dashboard Admin & Estoque | `apps/frontend/src/app/admin/page.tsx` |
| **`08-admin-modal-precos/`** | Modal de Ajuste de Preços / CMV (Admin) | `apps/frontend/src/app/admin/prices/page.tsx` |
| **`design-system/`** | Especificação do Design System (`DESIGN.md`) | Guia de Tokens e Estilos |
| **`assets-media/`** | Fotografia da Pizza Artesanal | `public/assets/` |

---

## 💡 Como Instruir o Agente de IA para Construir as Telas

Para que a IA crie o código de qualquer uma das telas do projeto, basta enviar uma instrução com os caminhos mapeados. Exemplo:

> *"Consulte o protótipo HTML em `public/assets/screens/stitch_come_pizza_ui_ux_platform/02-montador-customizer-2d/code.html` e a imagem `screen.png` da mesma pasta. Implemente o componente React correspondente em `apps/frontend/src/app/customizer/page.tsx` usando Tailwind CSS e as cores do `BRAND_IDENTITY.md`."*
