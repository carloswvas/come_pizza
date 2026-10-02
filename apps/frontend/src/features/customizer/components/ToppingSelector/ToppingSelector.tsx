'use client';

import React from 'react';
import { CustomizerTopping } from '../../types';
import { MOCK_TOPPINGS } from '../../mocks';

export interface ToppingSelectorProps {
  selectedToppings: CustomizerTopping[];
  onToggleTopping: (topping: CustomizerTopping) => void;
}

export const ToppingSelector: React.FC<ToppingSelectorProps> = ({
  selectedToppings,
  onToggleTopping,
}) => {
  return (
    <section className="bg-surface-container-low rounded-2xl p-5 md:p-6 shadow-sm border border-surface-container-high/40 space-y-4">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label text-xs font-bold shrink-0">
            04
          </span>
          <h2 className="font-display text-xl text-on-surface font-bold">
            Finalizações & Extras Especiais
          </h2>
        </div>
        <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium hidden sm:inline-block">
          Toppings Pós-Forno
        </span>
      </div>

      {/* Topping Chips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_TOPPINGS.map((topping) => {
          const isSelected = selectedToppings.some((t) => t.id === topping.id);
          const formattedPrice = (topping.priceCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return (
            <button
              key={topping.id}
              type="button"
              onClick={() => onToggleTopping(topping)}
              className={`px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 min-h-[52px] ${
                isSelected
                  ? 'bg-surface-container-high text-on-surface ring-2 ring-tertiary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    isSelected ? 'text-tertiary font-bold' : 'text-outline'
                  }`}
                >
                  {isSelected ? 'check_circle' : 'add_circle'}
                </span>
                <span className="font-label text-sm font-bold text-on-surface">
                  {topping.name}
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded font-label text-xs font-bold ${
                  isSelected
                    ? 'bg-tertiary/20 text-tertiary'
                    : 'bg-surface-container-highest text-outline'
                }`}
              >
                +{formattedPrice}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
