'use client';

export function PairingStrip() {
  return (
    <section className="p-6 rounded-2xl bg-surface-container-low shadow-md relative overflow-hidden my-6 border border-surface-container-high/40">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-label text-xs uppercase text-secondary font-bold tracking-wider">
            Harmonização Especial
          </span>
          <h3 className="font-display text-xl text-on-surface font-bold">
            Molhos de Borda & Azeites Nobres
          </h3>
          <p className="font-body text-xs text-on-surface-variant">
            Intensifique a borda alveolada com nossas reduções e azeites prensados a frio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-surface-container flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">science</span>
            <span className="font-label text-xs text-on-surface">Pesto Genovês D.O.P. (+R$ 14)</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-surface-container flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">local_fire_department</span>
            <span className="font-label text-xs text-on-surface">Mel Picante Habanero (+R$ 12)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
