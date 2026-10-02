'use client';

import React from 'react';
import { CustomizerCrust } from '../../types';
import { MOCK_CRUSTS } from '../../mocks';

export interface CrustSelectorProps {
  selectedCrust: CustomizerCrust;
  onSelectCrust: (crust: CustomizerCrust) => void;
}

export const CrustSelector: React.FC<CrustSelectorProps> = ({ selectedCrust, onSelectCrust }) => {
  return (
    <section className="bg-surface-container-low rounded-2xl p-5 md:p-6 shadow-sm border border-surface-container-high/40 space-y-4">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label text-xs font-bold shrink-0">
            03
          </span>
          <h2 className="font-display text-xl text-on-surface font-bold">
            Estilo do Cornicione (Borda)
          </h2>
        </div>
        <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium hidden sm:inline-block">
          Selada no Fogo Vivo
        </span>
      </div>

      {/* Crust Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_CRUSTS.map((crust) => {
          const isSelected = selectedCrust.id === crust.id;
          const formattedPrice = (crust.priceCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return (
            <button
              key={crust.id}
              type="button"
              onClick={() => onSelectCrust(crust)}
              className={`p-4 rounded-xl text-left flex items-start justify-between cursor-pointer transition-all duration-200 min-h-[80px] ${
                isSelected
                  ? 'bg-surface-container-high ring-2 ring-secondary-container shadow-md'
                  : 'bg-surface-container hover:bg-surface-container-high'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isSelected ? 'text-secondary-container' : 'text-outline'
                    }`}
                  >
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <p className="font-label text-sm font-bold text-on-surface">
                    {crust.name}
                  </p>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-tight pl-6">
                  {crust.description}
                </p>
              </div>

              <span
                className={`font-label text-xs uppercase px-2 py-1 rounded-md shrink-0 font-bold ${
                  crust.priceCents > 0
                    ? 'bg-primary-container/20 text-primary'
                    : 'bg-surface-container-highest text-outline'
                }`}
              >
                {crust.priceCents > 0 ? `+${formattedPrice}` : 'Inclusa'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
