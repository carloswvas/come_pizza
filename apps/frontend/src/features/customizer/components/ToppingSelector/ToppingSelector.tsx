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
    <section className="bg-surface-container rounded-2xl p-space-lg shadow-md space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-primary">
            04
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Finalizações & Extras Especiais
          </h2>
        </div>
        <span className="font-label-sm text-label-sm uppercase text-outline">
          Toppings Pós-Forno
        </span>
      </div>

      <div className="flex flex-wrap gap-space-xs">
        {MOCK_TOPPINGS.map((topping) => {
          const isSelected = selectedToppings.some((t) => t.id === topping.id);
          return (
            <button
              key={topping.id}
              type="button"
              onClick={() => onToggleTopping(topping)}
              className={`px-space-md py-space-sm rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-surface-container-high text-on-surface ring-1 ring-secondary-container/50'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isSelected ? 'text-secondary-container' : ''
                }`}
              >
                {isSelected ? 'check_circle' : 'add_circle'}
              </span>
              <span className="font-body-md text-body-md">{topping.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded font-label-sm text-label-sm font-semibold ${
                  isSelected
                    ? 'bg-secondary-container/20 text-secondary'
                    : 'bg-surface-container text-primary'
                }`}
              >
                +R$ {(topping.priceCents / 100).toFixed(2).replace('.', ',')}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
