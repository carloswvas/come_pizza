'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface HeaderProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onSearchChange?: (term: string) => void;
  currentLocation?: string;
}

export function Header({
  cartItemCount = 0,
  onOpenCart,
  onSearchChange,
  currentLocation = 'Rua Oscar Freire, Jardins',
}: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearchChange) {
      onSearchChange(term);
    }
  };

  const navLinks = [
    { label: 'Cardápio', href: '/' },
    { label: 'Montador 2D', href: '/customizer' },
    { label: 'Rastreamento', href: '/tracking/order-1' },
    { label: 'Cozinha KDS', href: '/kds' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-surface-container-high/40 shadow-sm">
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex items-center justify-between gap-3 md:gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
            <img
              src="/logo.svg"
              alt="COME PIZZA Logo"
              className="h-9 w-9 object-contain rounded-full shrink-0 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-label text-sm md:text-base tracking-wider text-on-surface uppercase font-bold whitespace-nowrap shrink-0 group-hover:text-primary transition-colors">
              COME PIZZA
            </span>
          </Link>

          <div className="h-4 w-px bg-surface-container-highest mx-1 hidden 2xl:block"></div>

          {/* Location Button */}
          <button
            className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
            <span className="font-body text-xs truncate max-w-[150px]">{currentLocation}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>

        {/* Search Input (Desktop XL) */}
        <div className="flex-1 max-w-xs hidden xl:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body text-xs placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary-container transition-all"
              placeholder="Buscar pizzas, ingredientes..."
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Navigation Links (Desktop md:flex) */}
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 font-label text-xs uppercase rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status Badges & Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Oven Telemetry Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-container"></span>
            </span>
            <span className="font-label text-[11px] text-secondary uppercase font-medium whitespace-nowrap">
              Forno 480°C • Aberto
            </span>
          </div>

          {/* Cart Icon Button */}
          <button
            aria-label="Sacola de pedidos"
            className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer shrink-0"
            type="button"
            onClick={onOpenCart}
          >
            <span className="material-symbols-outlined text-[22px]">local_mall</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-primary-container text-on-primary-container font-label text-[10px] flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile Badge */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {/* Mobile Menu Button (md:hidden) */}
          <button
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label="Menu de navegação"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (md:hidden) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-t border-surface-container-high px-4 py-4 space-y-2">
          {/* Mobile Search */}
          <div className="relative flex items-center mb-3">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface font-body text-xs placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary-container"
              placeholder="Buscar pizzas, ingredientes..."
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Mobile Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 font-label text-xs uppercase rounded-xl transition-all ${
                    isActive
                      ? 'bg-surface-container-high text-secondary border-l-2 border-secondary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
