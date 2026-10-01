'use client';

import React from 'react';
import { CustomizerState, BakeLevel } from '../customizer.types';

interface Pizza2DCanvasProps {
  state: CustomizerState;
  onBakeChange: (level: BakeLevel) => void;
}

export const Pizza2DCanvas: React.FC<Pizza2DCanvasProps> = ({ state, onBakeChange }) => {
  const isSplit = state.flavorMode === 'split';

  return (
    <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
      {/* Interactive Visual Pizza Showcase */}
      <div className="relative w-full aspect-square rounded-2xl bg-surface-container-lowest p-space-md flex flex-col items-center justify-center overflow-hidden shadow-xl">
        {/* Thermal Ambient Radiation Backlight Glow */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>

        {/* Top Meta Chips over visual */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-space-xs py-1 rounded bg-surface/80 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase">
            {state.size.dimensions}
          </span>
          <span className="px-space-xs py-1 rounded bg-secondary-container/20 text-secondary font-label-sm text-label-sm uppercase">
            {state.bakeLevel === 'char' ? 'Leopard Spotting 480°C' : 'Dourada Clássica 450°C'}
          </span>
        </div>

        {/* Slate Board & Pizza Representation */}
        <div className="relative w-[92%] h-[92%] rounded-full bg-surface-container-low shadow-2xl flex items-center justify-center p-3 transition-transform duration-500 hover:scale-[1.01]">
          {/* Dark Slate Stone Ring Structure */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-surface-container-lowest via-surface-container to-surface-container-low opacity-95"></div>

          {/* Pizza Interactive Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-all duration-700">
            {/* Split Half Visuals Container */}
            <div className="absolute inset-0 flex w-full h-full">
              {/* Left Half (Sabor 1) */}
              <div
                className={`relative h-full overflow-hidden transition-all duration-500 ${
                  isSplit ? 'w-1/2' : 'w-full'
                }`}
              >
                <img
                  className="absolute top-0 left-0 w-[200%] h-full max-w-none object-cover"
                  src={state.flavor1.image}
                  alt={state.flavor1.name}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/30 to-transparent"></div>
                {/* Tag Indicator */}
                <div className="absolute bottom-6 left-4 z-10">
                  <span className="px-2 py-1 rounded bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
                    {isSplit ? `1. ${state.flavor1.name}` : `${state.flavor1.name} (100%)`}
                  </span>
                </div>
              </div>

              {/* Right Half (Sabor 2) - Only visible when split mode is active */}
              {isSplit && (
                <div className="relative w-1/2 h-full overflow-hidden">
                  <img
                    className="absolute top-0 right-0 w-[200%] h-full max-w-none object-cover"
                    src={state.flavor2.image}
                    alt={state.flavor2.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-surface-container-lowest/30 to-transparent"></div>
                  {/* Tag Indicator */}
                  <div className="absolute bottom-6 right-4 z-10 text-right">
                    <span className="px-2 py-1 rounded bg-surface/90 backdrop-blur-md text-secondary font-label-sm text-label-sm uppercase shadow-sm">
                      2. {state.flavor2.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Center Neon Fire Cut Line Splitter */}
            {isSplit && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-secondary-container to-transparent z-20 flex items-center justify-center shadow-[0_0_12px_#ec6a06]">
                <div className="w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center shadow-lg text-secondary-container">
                  <span className="material-symbols-outlined text-[15px]">call_split</span>
                </div>
              </div>
            )}

            {/* Animated Falling Ingredient Sparks (Visual Accent) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <div className="absolute top-6 left-1/3 w-3 h-3 rounded-full bg-tertiary/80 blur-xs animate-pulse"></div>
              <div className="absolute bottom-16 right-1/4 w-2 h-2 rounded-full bg-primary-container/80 blur-xs animate-ping"></div>
              <div className="absolute top-1/2 left-1/4 w-4 h-2 rounded-full bg-secondary-container/60 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Bottom Visual Legend */}
        <div className="mt-space-sm flex items-center gap-space-lg z-10 text-outline">
          <span className="flex items-center gap-1 font-label-sm text-label-sm uppercase">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Cornicione Alveolado
          </span>
          <span className="flex items-center gap-1 font-label-sm text-label-sm uppercase">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Farinha Nápoles 00
          </span>
        </div>
      </div>

      {/* Seletor do Nível de Assamento do Forno a Lenha */}
      <div className="bg-surface-container rounded-2xl p-space-md shadow-md space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]">oven_gen</span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
              Ponto de Forneamento
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-outline uppercase">Lenha de Nó de Pinho</span>
        </div>

        {/* Dual Tactile Switch */}
        <div className="grid grid-cols-2 gap-space-xs p-1 bg-surface-container-lowest rounded-xl">
          <button
            type="button"
            onClick={() => onBakeChange('gold')}
            className={`flex flex-col items-start p-space-sm rounded-lg transition-all text-left cursor-pointer ${
              state.bakeLevel === 'gold'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'bg-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Dourada Clássica
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-outline mt-1">450°C • Macia & suave</span>
          </button>

          <button
            type="button"
            onClick={() => onBakeChange('char')}
            className={`flex flex-col items-start p-space-sm rounded-lg transition-all text-left cursor-pointer ${
              state.bakeLevel === 'char'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'bg-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-md text-label-md font-semibold text-secondary">
                Leopard Spotting
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              480°C • Chamuscado rústico
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
