'use client';

import { CartItem } from '../types/catalog.types';

export interface CartDrawerProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CartDrawer({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isOpen,
  onClose,
}: CartDrawerProps) {
  // If modal mode (isOpen provided) and isOpen is false, don't render
  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  const subtotalCents = items.reduce((acc, item) => acc + item.totalPriceCents * item.quantity, 0);
  const deliveryFeeCents = items.length > 0 ? 1000 : 0;
  const totalCents = subtotalCents + deliveryFeeCents;

  const formattedTotal = (totalCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const innerContent = (
    <div className="rounded-2xl bg-surface-container-low shadow-xl p-6 space-y-4 border border-surface-container-high/50 max-h-[85vh] overflow-y-auto w-full max-w-md">
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[24px]">local_mall</span>
          <h3 className="font-display text-xl text-on-surface font-bold">Sua Sacola</h3>
          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs font-bold">
            {items.reduce((acc, i) => acc + i.quantity, 0)} itens
          </span>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              type="button"
              className="text-on-surface-variant hover:text-on-surface text-xs font-label uppercase cursor-pointer"
            >
              Limpar
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer"
              aria-label="Fechar sacola"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl block mb-2 text-outline">
              shopping_bag
            </span>
            <p className="font-body text-sm">Sua sacola está vazia.</p>
            <p className="font-body text-xs text-outline">
              Escolha pizzas e acompanhamentos para começar seu pedido.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const formattedItemPrice = (
              (item.totalPriceCents * item.quantity) /
              100
            ).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            return (
              <div key={item.id} className="p-3 rounded-xl bg-surface-container space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-label text-sm text-on-surface font-bold">
                      {item.productName}
                    </h4>
                    {item.customizationSummary?.map((summary, idx) => (
                      <p
                        key={idx}
                        className="font-body text-[11px] text-on-surface-variant leading-tight"
                      >
                        {summary}
                      </p>
                    ))}
                  </div>
                  <span className="font-label text-sm text-on-surface font-bold shrink-0">
                    {formattedItemPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 bg-surface-container-high rounded-lg p-1">
                    <button
                      aria-label="Diminuir quantidade"
                      className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="font-label text-xs font-bold text-on-surface px-1">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Aumentar quantidade"
                      className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>

                  <button
                    aria-label="Remover item da sacola"
                    className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    onClick={() => onRemoveItem(item.id)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Summary & Checkout */}
      {items.length > 0 && (
        <div className="pt-3 border-t border-surface-container-high space-y-3">
          <div className="space-y-1 font-label text-xs text-on-surface-variant">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                {(subtotalCents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega:</span>
              <span>
                {(deliveryFeeCents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            <div className="flex justify-between font-bold text-sm text-on-surface pt-1 border-t border-surface-container-high">
              <span>Total:</span>
              <span className="text-primary">{formattedTotal}</span>
            </div>
          </div>

          <a
            href="/checkout"
            className="w-full py-3 rounded-xl bg-primary-container text-on-primary-container font-label text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold shadow-[0_4px_16px_rgba(255,83,82,0.4)] hover:bg-secondary-container transition-all text-center"
          >
            <span>Ir para Checkout PIX</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      )}
    </div>
  );

  // Modal mode overlay when isOpen is defined
  if (isOpen !== undefined) {
    return (
      <div className="fixed inset-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-center p-4">
        {innerContent}
      </div>
    );
  }

  // Inline mode (used in catalog page grid)
  return (
    <aside className="lg:col-span-4 sticky top-28 w-full">
      {innerContent}
    </aside>
  );
}
