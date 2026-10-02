'use client';

import React from 'react';
import { PizzaSizeOption } from '../../types';
import { MOCK_SIZES } from '../../mocks';

export interface SizeSelectorProps {
  selectedSize: PizzaSizeOption;
  onSelectSize: (size: PizzaSizeOption) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSelectSize }) => {
  return (
    <section className="bg-surface-container-low rounded-2xl p-5 md:p-6 shadow-sm border border-surface-container-high/40 space-y-4">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label text-xs font-bold shrink-0">
            01
          </span>
          <h2 className="font-display text-xl text-on-surface font-bold">
            Dimensão & Fatiamento
          </h2>
        </div>
        <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium hidden sm:inline-block">
          Massa Biga 72h D.O.P.
        </span>
      </div>

      {/* Size Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MOCK_SIZES.map((size) => {
          const isSelected = selectedSize.key === size.key;
          const formattedPrice = (size.priceCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return (
            <button
              key={size.key}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`group relative flex flex-col text-left p-4 rounded-xl transition-all duration-200 cursor-pointer min-h-[110px] justify-between ${
                isSelected
                  ? 'bg-surface-container-high text-on-surface ring-2 ring-primary-container shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              {size.recommended && (
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase font-bold tracking-wider shadow-sm animate-pulse">
                  Mais Pedido
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-label text-sm uppercase font-bold text-on-surface">
                    {size.name}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isSelected ? 'text-secondary-container font-bold' : 'text-outline'
                    }`}
                  >
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
                <p className="font-display text-2xl text-primary font-bold">{formattedPrice}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-surface-container-high/40 flex items-center justify-between text-on-surface-variant font-body text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">straighten</span>
                  {size.diameterCm} cm
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">pie_chart</span>
                  {size.slices} fatias
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
