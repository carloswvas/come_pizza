'use client';

import { useState } from 'react';
import { CatalogProduct } from '../../types/catalog.types';

export interface CustomizeModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
  onConfirm: (product: CatalogProduct, size: string, crust: string, extras: string[]) => void;
}

export function CustomizeModal({ product, onClose, onConfirm }: CustomizeModalProps) {
  const [selectedSize, setSelectedSize] = useState('LARGE_35CM');
  const [selectedCrust, setSelectedCrust] = useState('TRADITIONAL');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  if (!product) return null;

  const toggleExtra = (extraName: string) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-surface-container-low border border-surface-container-high rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
          type="button"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="space-y-1">
          <span className="font-label text-xs uppercase text-secondary font-bold">Personalizador Rápido</span>
          <h3 className="font-display text-2xl text-on-surface font-bold">{product.name}</h3>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">{product.description}</p>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <label className="font-label text-xs uppercase text-on-surface font-bold">Tamanho da Pizza</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'INDIVIDUAL_25CM', label: 'Brotinho (25cm)' },
              { id: 'MEDIUM_30CM', label: 'Média (30cm)' },
              { id: 'LARGE_35CM', label: 'Grande (35cm)' },
            ].map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size.id)}
                className={`p-2 rounded-xl border text-xs font-label text-center transition-all ${
                  selectedSize === size.id
                    ? 'border-primary-container bg-primary-container/20 text-on-surface font-bold'
                    : 'border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Crust Selection */}
        <div className="space-y-2">
          <label className="font-label text-xs uppercase text-on-surface font-bold">Borda Recheada</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'TRADITIONAL', label: 'Tradicional (Sem recheio)' },
              { id: 'STUFFED_CHEESE', label: 'Mozzarella (+R$ 12)' },
              { id: 'CHARRED_HERB', label: 'Ervas Tostadas (+R$ 10)' },
              { id: 'CHEDDAR', label: 'Cheddar (+R$ 12)' },
            ].map((crust) => (
              <button
                key={crust.id}
                type="button"
                onClick={() => setSelectedCrust(crust.id)}
                className={`p-2 rounded-xl border text-xs font-label text-left transition-all ${
                  selectedCrust === crust.id
                    ? 'border-secondary-container bg-secondary-container/20 text-on-surface font-bold'
                    : 'border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {crust.label}
              </button>
            ))}
          </div>
        </div>

        {/* Extra Toppings */}
        <div className="space-y-2">
          <label className="font-label text-xs uppercase text-on-surface font-bold">Adicionais Extras</label>
          <div className="flex flex-wrap gap-2">
            {[
              'Bacon Crocante (+R$ 8)',
              'Burrata Inteira (+R$ 16)',
              'Mel Silvestre (+R$ 6)',
              'Manjericão Extra (+R$ 4)',
            ].map((extra) => {
              const isSelected = selectedExtras.includes(extra);
              return (
                <button
                  key={extra}
                  type="button"
                  onClick={() => toggleExtra(extra)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-label transition-all ${
                    isSelected
                      ? 'border-tertiary bg-tertiary/20 text-on-surface font-bold'
                      : 'border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {extra}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-surface-container-high flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label text-xs uppercase"
            type="button"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(product, selectedSize, selectedCrust, selectedExtras)}
            className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label text-xs uppercase font-bold shadow-md hover:bg-secondary-container transition-all"
            type="button"
          >
            Adicionar à Sacola
          </button>
        </div>
      </div>
    </div>
  );
}
