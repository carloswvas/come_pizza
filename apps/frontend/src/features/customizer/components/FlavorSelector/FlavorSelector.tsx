'use client';

import React from 'react';
import { FlavorMode, CustomizerFlavor } from '../../types';
import { MOCK_FLAVORS } from '../../mocks';

export interface FlavorSelectorProps {
  flavorMode: FlavorMode;
  flavor1: CustomizerFlavor;
  flavor2: CustomizerFlavor;
  onModeChange: (mode: FlavorMode) => void;
  onSelectFlavor: (half: 1 | 2, flavor: CustomizerFlavor) => void;
}

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavorMode,
  flavor1,
  flavor2,
  onModeChange,
  onSelectFlavor,
}) => {
  const isSplit = flavorMode === 'split';

  return (
    <section className="bg-surface-container-low rounded-2xl p-5 md:p-6 shadow-sm border border-surface-container-high/40 space-y-4">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label text-xs font-bold shrink-0">
            02
          </span>
          <h2 className="font-display text-xl text-on-surface font-bold">
            Divisão & Sabores Artesanais
          </h2>
        </div>

        {/* Toggle Mode Pills */}
        <div className="flex p-1 bg-surface-container rounded-xl self-start sm:self-auto border border-surface-container-high/50">
          <button
            type="button"
            onClick={() => onModeChange('single')}
            className={`px-3 py-1.5 rounded-lg font-label text-xs uppercase transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 ${
              !isSplit
                ? 'bg-surface-container-high text-secondary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">pie_chart</span>
            <span>1 Sabor Inteiro</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('split')}
            className={`px-3 py-1.5 rounded-lg font-label text-xs uppercase transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 ${
              isSplit
                ? 'bg-surface-container-high text-secondary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">call_split</span>
            <span>Meio a Meio (2 Sabores)</span>
          </button>
        </div>
      </div>

      {/* Flavor Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metade Esquerda (Sabor 1) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs uppercase text-secondary font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
              {isSplit ? 'Metade 1 (Esquerda)' : 'Sabor Escolhido'}
            </span>
            <span className="font-label text-[11px] text-outline uppercase font-medium">Incluso</span>
          </div>

          <div className="space-y-2">
            {MOCK_FLAVORS.map((flavor) => {
              const isSelected = flavor1.id === flavor.id;
              const formattedExtra = (flavor.extraPriceCents / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div
                  key={`f1-${flavor.id}`}
                  onClick={() => onSelectFlavor(1, flavor)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 min-h-[64px] ${
                    isSelected
                      ? 'bg-surface-container-high ring-2 ring-secondary-container shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-xs border border-surface-container-high">
                      <img
                        className="w-full h-full object-cover"
                        src={flavor.image}
                        alt={flavor.name}
                      />
                    </div>
                    <div>
                      <p className="font-label text-sm font-bold text-on-surface">
                        {flavor.name}
                      </p>
                      <p className="font-body text-xs text-on-surface-variant line-clamp-1 max-w-[170px]">
                        {flavor.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isSelected ? (
                      <span className="material-symbols-outlined text-secondary-container text-[22px]">
                        check_circle
                      </span>
                    ) : (
                      <span className="font-label text-xs text-outline font-medium">
                        {flavor.extraPriceCents > 0 ? `+${formattedExtra}` : 'Sem taxa'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metade Direita (Sabor 2) */}
        <div
          className={`space-y-2 transition-all duration-300 ${
            !isSplit ? 'opacity-35 pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-label text-xs uppercase text-primary font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              Metade 2 (Direita)
            </span>
            <span className="font-label text-[11px] text-outline uppercase font-medium">
              {flavor2.extraPriceCents > 0
                ? `+${(flavor2.extraPriceCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                : 'Incluso'}
            </span>
          </div>

          <div className="space-y-2">
            {MOCK_FLAVORS.map((flavor) => {
              const isSelected = flavor2.id === flavor.id;
              const formattedExtra = (flavor.extraPriceCents / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div
                  key={`f2-${flavor.id}`}
                  onClick={() => onSelectFlavor(2, flavor)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 min-h-[64px] ${
                    isSelected
                      ? 'bg-surface-container-high ring-2 ring-primary-container shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-xs border border-surface-container-high">
                      <img
                        className="w-full h-full object-cover"
                        src={flavor.image}
                        alt={flavor.name}
                      />
                    </div>
                    <div>
                      <p className="font-label text-sm font-bold text-on-surface">
                        {flavor.name}
                      </p>
                      <p className="font-body text-xs text-on-surface-variant line-clamp-1 max-w-[170px]">
                        {flavor.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isSelected ? (
                      <span className="material-symbols-outlined text-primary-container text-[22px]">
                        check_circle
                      </span>
                    ) : (
                      <span className="font-label text-xs text-outline font-medium">
                        {flavor.extraPriceCents > 0 ? `+${formattedExtra}` : 'Sem taxa'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
