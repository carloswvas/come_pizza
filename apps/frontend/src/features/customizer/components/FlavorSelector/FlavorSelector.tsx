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
    <section className="bg-surface-container rounded-2xl p-space-lg shadow-md space-y-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-primary">
            02
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Divisão & Sabores Artesanais
          </h2>
        </div>

        {/* Toggle Mode: 1 Sabor Inteiro vs Meio a Meio */}
        <div className="flex p-1 bg-surface-container-lowest rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onModeChange('single')}
            className={`px-space-sm py-1 rounded-lg font-label-sm text-label-sm uppercase transition-all cursor-pointer ${
              !isSplit
                ? 'bg-surface-container-high text-secondary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            1 Sabor Inteiro
          </button>
          <button
            type="button"
            onClick={() => onModeChange('split')}
            className={`px-space-sm py-1 rounded-lg font-label-sm text-label-sm uppercase transition-all cursor-pointer ${
              isSplit
                ? 'bg-surface-container-high text-secondary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Meio a Meio (2 Sabores)
          </button>
        </div>
      </div>

      {/* Flavor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {/* Metade Esquerda (Sabor 1) */}
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md uppercase text-secondary font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              {isSplit ? 'Metade 1 (Esquerda)' : 'Sabor Escolhido'}
            </span>
            <span className="font-label-sm text-label-sm text-outline">Incluso</span>
          </div>

          <div className="space-y-space-xs">
            {MOCK_FLAVORS.map((flavor) => {
              const isSelected = flavor1.id === flavor.id;
              return (
                <div
                  key={`f1-${flavor.id}`}
                  onClick={() => onSelectFlavor(1, flavor)}
                  className={`p-space-sm rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-surface-container-high ring-1 ring-secondary-container/50'
                      : 'bg-surface-container-low hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={flavor.image}
                        alt={flavor.name}
                      />
                    </div>
                    <div>
                      <p className="font-body-md text-body-md font-semibold text-on-surface">
                        {flavor.name}
                      </p>
                      <p className="font-body-sm text-body-sm text-outline truncate max-w-[170px]">
                        {flavor.description}
                      </p>
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="material-symbols-outlined text-secondary-container text-[20px]">
                      check_circle
                    </span>
                  ) : (
                    <span className="font-label-sm text-label-sm text-outline">
                      {flavor.extraPriceCents > 0
                        ? `+R$ ${(flavor.extraPriceCents / 100).toFixed(2).replace('.', ',')}`
                        : 'Sem taxa'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Metade Direita (Sabor 2) */}
        <div
          className={`space-y-space-xs transition-opacity duration-300 ${
            !isSplit ? 'opacity-40 pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md uppercase text-primary font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Metade 2 (Direita)
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              {flavor2.extraPriceCents > 0
                ? `+R$ ${(flavor2.extraPriceCents / 100).toFixed(2).replace('.', ',')}`
                : 'Incluso'}
            </span>
          </div>

          <div className="space-y-space-xs">
            {MOCK_FLAVORS.map((flavor) => {
              const isSelected = flavor2.id === flavor.id;
              return (
                <div
                  key={`f2-${flavor.id}`}
                  onClick={() => onSelectFlavor(2, flavor)}
                  className={`p-space-sm rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-surface-container-high ring-1 ring-primary-container/50'
                      : 'bg-surface-container-low hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={flavor.image}
                        alt={flavor.name}
                      />
                    </div>
                    <div>
                      <p className="font-body-md text-body-md font-semibold text-on-surface">
                        {flavor.name}
                      </p>
                      <p className="font-body-sm text-body-sm text-outline truncate max-w-[170px]">
                        {flavor.description}
                      </p>
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="material-symbols-outlined text-secondary-container text-[20px]">
                      check_circle
                    </span>
                  ) : (
                    <span className="font-label-sm text-label-sm text-outline">
                      {flavor.extraPriceCents > 0
                        ? `+R$ ${(flavor.extraPriceCents / 100).toFixed(2).replace('.', ',')}`
                        : 'Sem taxa'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
