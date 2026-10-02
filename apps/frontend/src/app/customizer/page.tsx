'use client';

import { useState } from 'react';
import { Header } from '@/components';
import { CartDrawer, CartItem, MOCK_INITIAL_CART } from '@/features/catalog';
import {
  Pizza2DCanvas,
  SizeSelector,
  FlavorSelector,
  CrustSelector,
  ToppingSelector,
  StickyBottomBar,
  CustomizerState,
  PizzaSizeOption,
  FlavorMode,
  CustomizerFlavor,
  CustomizerCrust,
  CustomizerTopping,
  BakeLevel,
  MOCK_SIZES,
  MOCK_FLAVORS,
  MOCK_CRUSTS,
  MOCK_TOPPINGS,
} from '@/features/customizer';

export default function CustomizerPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [state, setState] = useState<CustomizerState>({
    size: MOCK_SIZES[2], // Grande Família by default
    flavorMode: 'split',
    flavor1: MOCK_FLAVORS[0], // Margherita D.O.P.
    flavor2: MOCK_FLAVORS[2], // Diavola Artesanal
    crust: MOCK_CRUSTS[0], // Napolitana Inflada
    selectedToppings: [MOCK_TOPPINGS[2]], // Mel Silvestre Picante
    bakeLevel: 'char',
  });

  const handleSelectSize = (size: PizzaSizeOption) => {
    setState((prev) => ({ ...prev, size }));
  };

  const handleModeChange = (mode: FlavorMode) => {
    setState((prev) => ({ ...prev, flavorMode: mode }));
  };

  const handleSelectFlavor = (half: 1 | 2, flavor: CustomizerFlavor) => {
    setState((prev) => ({
      ...prev,
      [half === 1 ? 'flavor1' : 'flavor2']: flavor,
    }));
  };

  const handleSelectCrust = (crust: CustomizerCrust) => {
    setState((prev) => ({ ...prev, crust }));
  };

  const handleToggleTopping = (topping: CustomizerTopping) => {
    setState((prev) => {
      const exists = prev.selectedToppings.some((t) => t.id === topping.id);
      const selectedToppings = exists
        ? prev.selectedToppings.filter((t) => t.id !== topping.id)
        : [...prev.selectedToppings, topping];
      return { ...prev, selectedToppings };
    });
  };

  const handleBakeChange = (level: BakeLevel) => {
    setState((prev) => ({ ...prev, bakeLevel: level }));
  };

  const handleAddToCart = () => {
    const flavorSurchargeCents =
      state.flavorMode === 'split'
        ? state.flavor1.extraPriceCents + state.flavor2.extraPriceCents
        : state.flavor1.extraPriceCents;

    const toppingsTotalCents = state.selectedToppings.reduce(
      (acc, item) => acc + item.priceCents,
      0
    );

    const totalCents =
      state.size.priceCents + flavorSurchargeCents + state.crust.priceCents + toppingsTotalCents;

    const flavorDesc =
      state.flavorMode === 'split'
        ? `1/2 ${state.flavor1.name} + 1/2 ${state.flavor2.name}`
        : `${state.flavor1.name} (Inteira)`;

    const customizationSummary = [
      `Tamanho: ${state.size.name} (${state.size.diameterCm}cm)`,
      `Borda: ${state.crust.name}`,
      `Assamento: ${state.bakeLevel === 'char' ? 'Leopard Spotting 480°C' : 'Dourada 450°C'}`,
      ...state.selectedToppings.map((t) => `+ ${t.name}`),
    ];

    const newItem: CartItem = {
      id: `cart-custom-${Date.now()}`,
      productId: 'custom-2d-pizza',
      productName: `Pizza 2D Customizada - ${flavorDesc}`,
      unitPriceCents: totalCents,
      quantity: 1,
      customizationSummary,
      totalPriceCents: totalCents,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Header cartItemCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="w-full pt-24 bg-surface min-h-[calc(100vh-140px)]">
        <div className="max-w-[1440px] w-full mx-auto px-margin py-space-lg">
          {/* Header Contextual Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                  Ateliê 2D de Montagem
                </span>
                <span className="text-outline text-label-sm font-label-sm uppercase tracking-wider">
                  • Biga 72h D.O.P.
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                Personalize sua Redonda Woodfire
              </h1>
            </div>

            {/* Live Oven Indicator Mini Card */}
            <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-container text-[20px]">
                  local_fire_department
                </span>
                <div>
                  <p className="font-label-sm text-label-sm uppercase text-outline">
                    Deck de Pedra
                  </p>
                  <p className="font-label-md text-label-md text-secondary font-semibold">
                    {state.bakeLevel === 'char' ? '480°C Napolitano' : '450°C Equilibrado'}
                  </p>
                </div>
              </div>
              <div className="h-6 w-px bg-surface-container-highest"></div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm uppercase text-outline">Tempo Médio</p>
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  90 segundos
                </p>
              </div>
            </div>
          </div>

          {/* Main Workspace: 2-Column Desktop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start pb-28">
            {/* Coluna Esquerda: Canvas Visual 2D */}
            <Pizza2DCanvas state={state} onBakeChange={handleBakeChange} />

            {/* Coluna Direita: Etapas de Configuração */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-space-lg">
              <SizeSelector selectedSize={state.size} onSelectSize={handleSelectSize} />

              <FlavorSelector
                flavorMode={state.flavorMode}
                flavor1={state.flavor1}
                flavor2={state.flavor2}
                onModeChange={handleModeChange}
                onSelectFlavor={handleSelectFlavor}
              />

              <CrustSelector selectedCrust={state.crust} onSelectCrust={handleSelectCrust} />

              <ToppingSelector
                selectedToppings={state.selectedToppings}
                onToggleTopping={handleToggleTopping}
              />
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <StickyBottomBar state={state} onAddToCart={handleAddToCart} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
