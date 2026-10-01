'use client';

import { useState } from 'react';
import {
  Header,
  HeroSection,
  CategoryFilters,
  ProductGrid,
  PairingStrip,
  CartDrawer,
  CustomizeModal,
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_INITIAL_CART,
  CatalogProduct,
  CartItem,
} from '@/features/catalog';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('pizzas');
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_INITIAL_CART);
  const [customizingProduct, setCustomizingProduct] = useState<CatalogProduct | null>(null);

  // Filter products by selected category
  const filteredProducts = MOCK_PRODUCTS.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory
  );

  const handleAddToCart = (product: CatalogProduct) => {
    const existingIndex = cartItems.findIndex((item) => item.productId === product.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        unitPriceCents: product.priceCents,
        quantity: 1,
        customizationSummary: ['+ Massa Biga 48h Tradicional'],
        totalPriceCents: product.priceCents,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleOpenCustomize = (product: CatalogProduct) => {
    setCustomizingProduct(product);
  };

  const handleConfirmCustomize = (
    product: CatalogProduct,
    size: string,
    crust: string,
    extras: string[]
  ) => {
    const customizationSummary = [
      `Tamanho: ${size}`,
      `Borda: ${crust}`,
      ...extras.map((e) => `+ ${e}`),
    ];

    const newItem: CartItem = {
      id: `cart-cust-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      unitPriceCents: product.priceCents,
      quantity: 1,
      customizationSummary,
      totalPriceCents: product.priceCents + (crust !== 'TRADITIONAL' ? 1200 : 0),
    };

    setCartItems([...cartItems, newItem]);
    setCustomizingProduct(null);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
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
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Fixed Header */}
      <Header
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => {
          const cartEl = document.getElementById('cardapio-grid');
          cartEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]">
        <div className="flex flex-col w-full relative overflow-x-hidden">
          {/* Ambient Flame Glow Elements */}
          <div className="absolute top-0 right-0 w-[580px] h-[580px] bg-secondary-container/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
          <div className="absolute top-[48rem] -left-32 w-[640px] h-[640px] bg-primary-container/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>

          {/* Hero Section */}
          <HeroSection />

          {/* Sticky Category Filters */}
          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={MOCK_CATEGORIES}
          />

          {/* Main Catalog Content + Persistent Slide-over Cart */}
          <div
            className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            id="cardapio-grid"
          >
            {/* Left Column: Product Grid */}
            <div className="lg:col-span-8 space-y-6">
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onCustomize={handleOpenCustomize}
              />

              {/* Pairing Strip */}
              <PairingStrip />
            </div>

            {/* Right Column: Slide-Over Cart Drawer */}
            <CartDrawer
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      </main>

      {/* Customize Modal Dialog */}
      <CustomizeModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onConfirm={handleConfirmCustomize}
      />
    </div>
  );
}
