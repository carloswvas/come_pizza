'use client';

import { CatalogProduct } from '../types/catalog.types';

interface ProductCardProps {
  product: CatalogProduct;
  onAddToCart: (product: CatalogProduct) => void;
  onCustomize: (product: CatalogProduct) => void;
}

export function ProductCard({ product, onAddToCart, onCustomize }: ProductCardProps) {
  const formattedPrice = (product.priceCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <article className="group rounded-2xl bg-surface-container-low overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Product Image Header */}
        <div className="relative h-60 w-full overflow-hidden bg-surface-container-lowest">
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={product.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md font-label text-[10px] uppercase font-bold tracking-wider ${
                  idx === 0
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-lowest/80 backdrop-blur-md text-tertiary'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-on-surface-variant font-label text-[11px] backdrop-blur-md">
            {product.bakeTimeMinutes}
          </span>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <span className="flex items-center gap-1 font-label text-xs text-secondary font-bold shrink-0">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              {product.rating.toFixed(1)}
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 pt-1">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-surface-container font-label text-[10px] text-outline">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Price & Actions */}
      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div>
          <span className="font-label text-[10px] text-outline uppercase block">Preço individual</span>
          <p className="font-display text-xl text-on-surface font-bold">{formattedPrice}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-xl bg-surface-container-high text-on-surface hover:text-secondary font-label text-xs uppercase transition-colors"
            onClick={() => onCustomize(product)}
            type="button"
          >
            Personalizar
          </button>
          <button
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_4px_16px_rgba(255,83,82,0.4)] hover:bg-secondary-container hover:scale-105 active:scale-95 transition-all"
            onClick={() => onAddToCart(product)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
