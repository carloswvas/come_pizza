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
    <section className="bg-surface-container rounded-2xl p-space-lg shadow-md space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-primary">
            01
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Dimensão & Fatiamento</h2>
        </div>
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
          Massa Biga 72h
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
        {MOCK_SIZES.map((size) => {
          const isSelected = selectedSize.key === size.key;
          return (
            <button
              key={size.key}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`group relative flex flex-col text-left p-space-md rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container-high'
              }`}
            >
              {size.recommended && (
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Recomendado
                </span>
              )}
              <div className="flex justify-between items-start mb-2">
                <span className="font-label-md text-label-md uppercase text-on-surface">
                  {size.name}
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isSelected ? 'text-secondary-container' : 'text-outline'
                  }`}
                >
                  {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm text-primary font-bold">
                R$ {(size.priceCents / 100).toFixed(2).replace('.', ',')}
              </p>
              <div className="mt-2 text-outline font-body-sm text-body-sm">
                <span>{size.diameterCm} cm</span> • <span>{size.slices} fatias</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
