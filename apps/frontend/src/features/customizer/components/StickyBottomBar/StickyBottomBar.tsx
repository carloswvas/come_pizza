'use client';

import React, { useState } from 'react';
import { CustomizerState } from '../../types';

export interface StickyBottomBarProps {
  state: CustomizerState;
  onAddToCart: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ state, onAddToCart }) => {
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  // Price calculations
  const basePriceCents = state.size.priceCents;
  const flavorSurchargeCents =
    state.flavorMode === 'split'
      ? state.flavor1.extraPriceCents + state.flavor2.extraPriceCents
      : state.flavor1.extraPriceCents;

  const crustPriceCents = state.crust.priceCents;
  const toppingsTotalCents = state.selectedToppings.reduce(
    (acc, item) => acc + item.priceCents,
    0
  );

  const totalCents = basePriceCents + flavorSurchargeCents + crustPriceCents + toppingsTotalCents;

  const formatBRL = (cents: number) =>
    (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formattedTotal = formatBRL(totalCents);

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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.3)] border-t border-surface-container-high/60">
      {/* Expanded Detailed Price Breakdown Modal/Drawer */}
      {showPriceDetails && (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 border-b border-surface-container-high/40 bg-surface-container-low/90 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-xs uppercase font-bold text-secondary">
              Detalhamento de Preço
            </span>
            <button
              onClick={() => setShowPriceDetails(false)}
              className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
              type="button"
              aria-label="Fechar detalhes"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-body text-xs text-on-surface-variant">
            <div className="p-2 rounded-lg bg-surface-container">
              <span className="block text-[10px] uppercase font-label">Massa Base:</span>
              <span className="font-bold text-on-surface">{formatBRL(basePriceCents)}</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container">
              <span className="block text-[10px] uppercase font-label">Taxa de Sabores:</span>
              <span className="font-bold text-on-surface">
                {flavorSurchargeCents > 0 ? `+${formatBRL(flavorSurchargeCents)}` : 'R$ 0,00'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container">
              <span className="block text-[10px] uppercase font-label">Borda Recheada:</span>
              <span className="font-bold text-on-surface">
                {crustPriceCents > 0 ? `+${formatBRL(crustPriceCents)}` : 'Inclusa'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container">
              <span className="block text-[10px] uppercase font-label">Adicionais Extras:</span>
              <span className="font-bold text-on-surface">
                {toppingsTotalCents > 0 ? `+${formatBRL(toppingsTotalCents)}` : 'R$ 0,00'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Resumo da Montagem */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="w-11 h-11 rounded-xl bg-surface-container-high p-0.5 shrink-0 hidden sm:block border border-surface-container-highest">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={state.flavor1.image}
              alt="Preview"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label text-xs uppercase tracking-wider text-on-surface font-bold truncate">
                {summaryTitle}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              <span className="font-label text-[11px] text-on-surface-variant uppercase truncate">
                {state.crust.name}
              </span>
            </div>
            <p className="font-body text-xs text-on-surface-variant truncate max-w-md">
              {summaryFlavors}
            </p>
          </div>
        </div>

        {/* Live Pricing & Primary Action CTA */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="text-right">
            <button
              onClick={() => setShowPriceDetails(!showPriceDetails)}
              className="flex items-center justify-end gap-1 font-label text-[10px] uppercase text-on-surface-variant hover:text-secondary cursor-pointer"
              type="button"
            >
              <span>Investimento Total</span>
              <span className="material-symbols-outlined text-[14px]">
                {showPriceDetails ? 'expand_less' : 'info'}
              </span>
            </button>
            <p className="font-display text-2xl text-on-surface font-bold tracking-tight">
              {formattedTotal}
            </p>
          </div>

          <button
            type="button"
            onClick={onAddToCart}
            className="px-6 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-label text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,83,82,0.45)] hover:bg-secondary-container hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold min-h-[48px]"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Adicionar ao Pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
