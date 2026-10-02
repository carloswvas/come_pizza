'use client';

import { CatalogProduct } from '../../types/catalog.types';
import { ProductCard } from '../ProductCard';

export interface ProductGridProps {
  products: CatalogProduct[];
  onAddToCart: (product: CatalogProduct) => void;
  onCustomize: (product: CatalogProduct) => void;
}

export function ProductGrid({ products, onAddToCart, onCustomize }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-secondary font-semibold">
            Seleção de Mestrado
          </span>
          <h2 className="font-display text-3xl text-on-surface tracking-tight mt-1 font-bold">
            Redondas & Focaccias
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-on-surface-variant font-body text-xs">
          <span>Organizar por:</span>
          <select
            aria-label="Organizar cardápio por"
            className="bg-surface-container-low text-on-surface font-label text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary-container border border-surface-container-high"
          >
            <option>Mais Populares</option>
            <option>Menor Tempo Forno</option>
            <option>Preço: Menor para Maior</option>
            <option>Exclusividades Chef</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onCustomize={onCustomize}
          />
        ))}
      </div>
    </div>
  );
}
