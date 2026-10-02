'use client';

import React, { useState } from 'react';
import { CustomizerState, BakeLevel } from '../../types';

export interface Pizza2DCanvasProps {
  state: CustomizerState;
  onBakeChange: (level: BakeLevel) => void;
}

export const Pizza2DCanvas: React.FC<Pizza2DCanvasProps> = ({ state, onBakeChange }) => {
  const [showSliceGuide, setShowSliceGuide] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'zoomed'>('normal');

  const isSplit = state.flavorMode === 'split';
  const slices = state.size.slices;

  // Crust ring style based on selected crust
  const getCrustBorder = () => {
    switch (state.crust.id) {
      case 'catupiry':
        return 'border-[14px] border-[#FFEBB3]/90 shadow-[inset_0_0_12px_rgba(255,215,0,0.5)]';
      case 'cheddar':
        return 'border-[14px] border-[#FFB020]/90 shadow-[inset_0_0_12px_rgba(255,140,0,0.5)]';
      case 'ervas':
        return 'border-[14px] border-[#85A947]/90 shadow-[inset_0_0_12px_rgba(46,125,50,0.5)]';
      default:
        return 'border-[12px] border-[#D4A373]/80';
    }
  };

  return (
    <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-24">
      {/* Canvas Showcase Card */}
      <div className="relative w-full aspect-square rounded-3xl bg-surface-container-lowest p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-surface-container-high/40">
        {/* Oven Thermal Backlight Glow */}
        <div
          className={`absolute -top-16 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            state.bakeLevel === 'char'
              ? 'bg-secondary-container/25 scale-110'
              : 'bg-tertiary/20 scale-100'
          }`}
        ></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>

        {/* Top Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
          {/* Dimension Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-surface-container-high/60 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">straighten</span>
            <span className="font-label text-xs uppercase font-bold text-on-surface">
              {state.size.dimensions}
            </span>
          </div>

          {/* Canvas View Controls */}
          <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-full border border-surface-container-high/60 shadow-sm">
            <button
              type="button"
              onClick={() => setShowSliceGuide(!showSliceGuide)}
              title="Alternar Guia de Fatiamento"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                showSliceGuide
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-label="Guia de fatias"
            >
              <span className="material-symbols-outlined text-[16px]">pie_chart</span>
            </button>

            <button
              type="button"
              onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'zoomed' : 'normal')}
              title="Zoom na Pizza"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                zoomLevel === 'zoomed'
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-label="Zoom no Canvas"
            >
              <span className="material-symbols-outlined text-[16px]">
                {zoomLevel === 'zoomed' ? 'zoom_out' : 'zoom_in'}
              </span>
            </button>
          </div>
        </div>

        {/* Slate Stone Base Plate */}
        <div
          className={`relative w-[92%] h-[92%] rounded-full bg-surface-container-low shadow-2xl flex items-center justify-center p-3 transition-transform duration-500 ${
            zoomLevel === 'zoomed' ? 'scale-110' : 'scale-100 hover:scale-[1.02]'
          }`}
        >
          {/* Stone Texture Border Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-surface-container-lowest via-surface-container to-surface-container-low opacity-95 shadow-inner"></div>

          {/* Pizza Disc Container */}
          <div
            className={`relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-all duration-500 ${getCrustBorder()}`}
          >
            {/* Bake Leopard Spotting Spots Effect */}
            {state.bakeLevel === 'char' && (
              <div className="absolute inset-0 z-20 pointer-events-none opacity-40">
                <div className="absolute top-2 left-10 w-3 h-2 bg-[#1A0C08] rounded-full blur-[0.5px] rotate-12"></div>
                <div className="absolute top-8 right-12 w-4 h-3 bg-[#1A0C08] rounded-full blur-[0.5px] -rotate-45"></div>
                <div className="absolute bottom-6 left-16 w-3.5 h-2 bg-[#1A0C08] rounded-full blur-[0.5px] rotate-45"></div>
                <div className="absolute bottom-10 right-8 w-4 h-2.5 bg-[#1A0C08] rounded-full blur-[0.5px] rotate-12"></div>
                <div className="absolute top-1/2 left-3 w-2.5 h-2 bg-[#1A0C08] rounded-full blur-[0.5px]"></div>
                <div className="absolute top-1/3 right-3 w-3 h-2 bg-[#1A0C08] rounded-full blur-[0.5px]"></div>
              </div>
            )}

            {/* Split Halves Container */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>

                {/* Sabor 1 Label */}
                <div className="absolute bottom-6 left-4 z-20">
                  <span className="px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-on-surface font-label text-xs uppercase font-bold shadow-md border border-surface-container-high/60 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    {isSplit ? `1. ${state.flavor1.name}` : state.flavor1.name}
                  </span>
                </div>
              </div>

              {/* Right Half (Sabor 2) */}
              {isSplit && (
                <div className="relative w-1/2 h-full overflow-hidden">
                  <img
                    className="absolute top-0 right-0 w-[200%] h-full max-w-none object-cover"
                    src={state.flavor2.image}
                    alt={state.flavor2.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent"></div>

                  {/* Sabor 2 Label */}
                  <div className="absolute bottom-6 right-4 z-20 text-right">
                    <span className="px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-secondary font-label text-xs uppercase font-bold shadow-md border border-surface-container-high/60 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                      2. {state.flavor2.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Neon Cut Line Splitter (Meio a Meio) */}
            {isSplit && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-secondary-container to-transparent z-25 flex items-center justify-center shadow-[0_0_12px_#ff5352]">
                <div className="w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-secondary-container/50 flex items-center justify-center shadow-lg text-secondary-container">
                  <span className="material-symbols-outlined text-[15px]">call_split</span>
                </div>
              </div>
            )}

            {/* Slices Grid Overlay Lines */}
            {showSliceGuide && (
              <div className="absolute inset-0 z-20 pointer-events-none opacity-30">
                {Array.from({ length: slices / 2 }).map((_, index) => {
                  const angle = (180 / (slices / 2)) * index;
                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-0 right-0 h-px bg-white/70 shadow-sm"
                      style={{ transform: `rotate(${angle}deg)` }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Toppings Active Chips Layer */}
        {state.selectedToppings.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 z-20">
            {state.selectedToppings.map((topping) => (
              <span
                key={topping.id}
                className="px-2.5 py-1 rounded-full bg-surface-container-high/90 text-on-surface font-label text-[11px] uppercase flex items-center gap-1 border border-surface-container-highest shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px] text-tertiary">add_circle</span>
                {topping.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Oven Bake Point Selector Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-surface-container-high/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">local_fire_department</span>
            <span className="font-label text-xs uppercase font-bold text-on-surface">
              Ponto do Forno a Lenha
            </span>
          </div>
          <span className="font-label text-[11px] text-on-surface-variant uppercase font-medium">
            Massa Biga 48h
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container rounded-xl">
          <button
            type="button"
            onClick={() => onBakeChange('gold')}
            className={`flex flex-col items-start p-3 rounded-lg transition-all text-left cursor-pointer ${
              state.bakeLevel === 'gold'
                ? 'bg-surface-container-high text-on-surface ring-1 ring-tertiary/50 shadow-xs'
                : 'bg-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-label text-xs font-bold uppercase">Dourada Clássica</span>
            </div>
            <span className="font-body text-[11px] text-on-surface-variant mt-0.5">
              450°C • Crosta macia e uniforme
            </span>
          </button>

          <button
            type="button"
            onClick={() => onBakeChange('char')}
            className={`flex flex-col items-start p-3 rounded-lg transition-all text-left cursor-pointer ${
              state.bakeLevel === 'char'
                ? 'bg-surface-container-high text-on-surface ring-1 ring-secondary-container/50 shadow-xs'
                : 'bg-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label text-xs font-bold uppercase text-secondary">
                Leopard Spotting
              </span>
            </div>
            <span className="font-body text-[11px] text-on-surface-variant mt-0.5">
              480°C • Chamuscado napolitano
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
