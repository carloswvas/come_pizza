'use client';

import React from 'react';
import { CustomizerState } from '../../types';

export interface StickyBottomBarProps {
  state: CustomizerState;
  onAddToCart: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ state, onAddToCart }) => {
  // Price calculation in Cents
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

  const formattedTotal = (totalCents / 100).toFixed(2).replace('.', ',');

  const modeLabel = state.flavorMode === 'split' ? 'Meio a Meio' : '1 Sabor Inteiro';
  const summaryTitle = `${state.size.name} (${state.size.diameterCm}cm) • ${modeLabel}`;
  const toppingsStr =
    state.selectedToppings.length > 0
      ? ` • ${state.selectedToppings.map((t) => t.name).join(', ')}`
      : '';

  const summaryFlavors =
    state.flavorMode === 'split'
      ? `1/2 ${state.flavor1.name} + 1/2 ${state.flavor2.name}${toppingsStr}`
      : `${state.flavor1.name} (Inteira)${toppingsStr}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-2xl border-t border-surface-container-high">
      <div className="max-w-[1440px] mx-auto px-margin py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
        {/* Resumo dos Ingredientes e Specs da Montagem */}
        <div className="flex items-center gap-space-md w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high p-1 shrink-0 hidden sm:block">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={state.flavor1.image}
              alt="Preview"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold truncate">
                {summaryTitle}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              <span className="font-label-sm text-label-sm text-outline uppercase truncate">
                {state.crust.name}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-md">
              {summaryFlavors}
            </p>
          </div>
        </div>

        {/* Live Pricing & Primary Action Call-to-Action */}
        <div className="flex items-center gap-space-lg w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="text-right">
            <p className="font-label-sm text-label-sm uppercase text-outline">Investimento Total</p>
            <p className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              R$ {formattedTotal}
            </p>
          </div>

          <button
            type="button"
            onClick={onAddToCart}
            className="px-space-xl py-3.5 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs shadow-[0_8px_24px_-4px_rgba(255,77,77,0.35)] transition-all hover:bg-secondary-container hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Adicionar Pizza ao Pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
