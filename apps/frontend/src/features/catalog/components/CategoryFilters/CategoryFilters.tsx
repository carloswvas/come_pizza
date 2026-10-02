'use client';

export interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: Array<{ id: string; label: string; icon: string; count: number }>;
}

export function CategoryFilters({
  selectedCategory,
  onSelectCategory,
  categories,
}: CategoryFiltersProps) {
  return (
    <section className="sticky top-20 z-40 w-full py-3 bg-surface/90 backdrop-blur-xl shadow-md border-b border-surface-container-high/50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-label text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container shadow-[0_4px_16px_rgba(255,83,82,0.35)] font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-surface-container-lowest/30' : 'bg-surface-container-highest'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Tags */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          <button
            className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface text-[11px] font-label uppercase flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">eco</span>
            Vegetarianas
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface text-[11px] font-label uppercase flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">flare</span>
            Picantes
          </button>
        </div>
      </div>
    </section>
  );
}
