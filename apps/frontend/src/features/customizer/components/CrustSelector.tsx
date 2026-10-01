'use client';

import React from 'react';
import { CustomizerCrust } from '../customizer.types';
import { MOCK_CRUSTS } from '../customizer.mock';

interface CrustSelectorProps {
  selectedCrust: CustomizerCrust;
  onSelectCrust: (crust: CustomizerCrust) => void;
}

export const CrustSelector: React.FC<CrustSelectorProps> = ({ selectedCrust, onSelectCrust }) => {
  return (
    <section className="bg-surface-container rounded-2xl p-space-lg shadow-md space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-primary">
            03
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Estilo do Cornicione (Borda)
          </h2>
        </div>
        <span className="font-label-sm text-label-sm uppercase text-outline">
          Fechamento Manual
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        {MOCK_CRUSTS.map((crust) => {
          const isSelected = selectedCrust.id === crust.id;
          return (
            <button
              key={crust.id}
              type="button"
              onClick={() => onSelectCrust(crust)}
              className={`p-space-md rounded-xl text-left flex items-start justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'bg-surface-container-high ring-1 ring-secondary-container/50'
                  : 'bg-surface-container-low hover:bg-surface-container-high'
              }`}
            >
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  {crust.name}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {crust.description}
                </p>
              </div>
              <span
                className={`font-label-sm text-label-sm uppercase px-2 py-0.5 rounded bg-surface-container-lowest ${
                  crust.priceCents > 0 ? 'text-primary font-semibold' : 'text-outline'
                }`}
              >
                {crust.priceCents > 0
                  ? `+R$ ${(crust.priceCents / 100).toFixed(2).replace('.', ',')}`
                  : 'Inclusa'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
