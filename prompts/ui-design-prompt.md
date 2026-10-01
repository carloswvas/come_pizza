# 🎨 Prompt Mestre para Geração de Telas UI/UX — COME PIZZA

Este documento contém o **Prompt Mestre de Design UI/UX** consolidado com base na Identidade de Marca ([`BRAND_IDENTITY.md`](../BRAND_IDENTITY.md)) e no Roadmap de Produto ([`roadmap.md`](../roadmap.md)).

---

## 📋 PROMPT MESTRE (Copie o texto abaixo para utilizar em ferramentas de IA como Stitch, v0, Bolt.new ou Midjourney/Figma):

```markdown
Atue como um Designer UI/UX Senior especialista em produtos digitais de alta gastronomia e e-commerce de alimentos.

🎯 OBJETIVO
Projetar e desenhar o sistema completo de telas de interface (UI/UX) para o aplicativo e plataforma web do **COME PIZZA** (Delivery Direct-to-Consumer de Pizza Artesanal no Forno a Lenha).

---

🎨 SISTEMA VISUAL E IDENTIDADE DE MARCA (BRAND IDENTITY)

1. PALETA DE CORES (MODO ESCURO DE LUXO / DARK LUXURY):
- Fundo Principal (Midnight Onyx): #0F1117
- Cartões e Superfícies (Oven Charcoal): #1A1D24 (com efeito Glassmorphism: rgba(26, 29, 36, 0.8), border 1px solid rgba(255, 255, 255, 0.08))
- Destaque e Ação Primária (Woodfire Flame Red): #FF4D4D
- Secundário e Highlights (Ember Orange): #F97316
- Acentos e Avaliações (Cheese Gold): #FBBF24
- Tons de Borda (Crust Amber): #D97706
- Tipografia e Ícones (Warm Ivory): #FFFBEB

2. TIPOGRAFIA & ESTILO:
- Fonte: Sans-Serif Geométrica moderna (limpa, técnica e editorial).
- Estilo: Dark mode elegante, com brilhos neon quentes de fogo a lenha (flame glow), cantos arredondados (border-radius: 16px/24px) e espaçamento rigoroso de 8pt.

---

📱 ESCOPO DE TELAS A SEREM DESENHADAS (5 FASES DO ROADMAP)

---

### 🟢 FASE 1: JORNADA DO CLIENTE (APP D2C CLIENTE)

1. TELA 1 — HOME & CARDÁPIO DIGITAL INTERATIVO:
- Cabeçalho com localização atual do cliente e busca por ingredientes.
- Banners carrossel de promoções do forno a lenha com efeito de brilho de brasas.
- Pílulas de categorias: "Pizzas Artesanais", "Entradas", "Sobremesas", "Bebidas".
- Cards de produtos no modo escuro com foto apetitosa, tags ("Forno a Lenha", "Mais Pedido"), tempo estimado de preparo e botão de adicionar.

2. TELA 2 — MONTADOR DE PIZZAS GOURMET (CUSTOMIZER 2D):
- Montador interativo com canvas visual 2D mostrando a pizza dividida em tempo real.
- Seleção de Tamanho: Brotinho (25cm), Média (30cm), Grande (35cm).
- Seletor de Sabores: 1 Sabor ou Meio-a-Meio (com divisor no canvas 2D).
- Seleção de Borda: Tradicional, Catupiry, Cheddar, Ervas Tostadas.
- Adicionais Extras Dinâmicos: Chips com foto/ícone (+Bacon Crocante R$ 8, +Burrata R$ 12, +Mel Silvestre R$ 6).
- Seletor do Nível de Assamento do Forno: "Massa Clássica" vs "Massa Levemente Tostada".
- Rodapé Fixo com total dinâmico atualizado em tempo real e botão "Adicionar ao Pedido".

3. TELA 3 — MODAL DE AUTENTICAÇÃO FAST LOGIN (SEM SENHA):
- Tela/Modal limpo oferecendo Login Social (Google e Apple).
- Campo de entrada por Telefone/WhatsApp para envio de código OTP de 4 dígitos.
- Layout minimalista focado em zero atrito de checkout.

4. TELA 4 — CHECKOUT & PAGAMENTO PIX:
- Resumo dos itens do pedido (com detalhamento dos sabores meio-a-meio e adicionais).
- Seletor de Endereço de Entrega com mapa integrado.
- Seleção de Método de Pagamento (Destaque para PIX com desconto de 5%, Cartão Online, Cartão na Entrega).
- Tela de confirmação do PIX com QR Code legível, código Copia e Cola e contador regressivo de expiração.

5. TELA 5 — RASTREAMENTO DO PEDIDO EM TEMPO REAL:
- Linha do tempo animada de status: [1. Criado] ➔ [2. Confirmado] ➔ [3. Em Preparação] ➔ [4. No Forno a Lenha] ➔ [5. Saiu para Entrega] ➔ [6. Entregue].
- Mapa escuro em tempo real exibindo a rota e o ícone do entregador em movimento.
- Botão rápido "Ajuda via WhatsApp".

---

### 👨‍🍳 FASE 2: COZINHA (KDS - KITCHEN DISPLAY SYSTEM)

6. TELA 6 — PAINEL TOUCHSCREEN DA COZINHA (KDS):
- Interface de alto contraste para monitores de cozinha.
- Grid de cartões de pedidos organizados por horário de chegada e cor de urgência (Verde, Amarelo, Vermelho).
- Destaque claro para detalhes de assamento (ex: "BAKE: TOSTADA", "SEM CEBOLA", "BORDA ERVAS").
- Botão grande de 1-toque para avançar etapa: "Para o Forno" ➔ "Pronto".

---

### 🛵 FASE 3: LOGÍSTICA (WEBAPP DO ENTREGADOR)

7. TELA 7 — PAINEL DO ENTREGADOR (MOBILE PWA):
- Visão mobile vertical com lista de entregas atribuídas.
- Card do pedido com endereço de entrega, valor a receber e botão "Iniciar Rota (Google Maps/Waze)".
- Interruptor de transmissão de GPS ao vivo ("Online para Entregas").

---

### 📊 FASE 4: PAINEL ADMINISTRATIVO

8. TELA 8 — DASHBOARD ADMIN & GESTÃO DE ESTOQUE:
- Painel web desktop com gráficos de vendas do dia, ticket médio e tempo médio de forno.
- Tabela de gerenciamento do cardápio com chave liga/desliga rápida para pausar itens esgotados na noite.

---

### 🎁 FASE 5: FIDELIDADE & GROWTH

9. TELA 9 — PROGRAMA DE FIDELIDADE "CLUBE DO FORNO":
- Cartão digital de pontos com design de brasa metálica.
- Barra de progresso para a próxima pizza grátis.
- Vitrine de recompensas resgatáveis por pontos.

---

🎨 DIRETRIZES DE SAÍDA:
Gere os componentes no estilo moderno editorial, com alto nível de detalhamento visual, contraste perfeito para telas OLED/dark mode, ícones vetoriais em linha finos e estados interativos de hover/active.
```
