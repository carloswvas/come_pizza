'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-surface-container-lowest">
      {/* Background Oven Glow & Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMFgjJXneDGnLpOD1IvkJZrQYAXuzYFHMzRgCBkXjWAI3vkztJXHnHyTiViqqkRKpVCgBaJrhMeL33_sQBzVJ9xUkqMzXhhu1-plV_fogbyz9GCL_mJYHYhPpmV6-WKVvc8CSApcNFh-FshYH_sznvWsMWdv7nHWydk8Pn1eWaL6ggpXUDLvIZqQovK-uM-yWDfuM13nG_v7ILnqY4-YsNjYLiYBol9RN_7yLoCAPLS-lT6P9AsNc')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/80"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 pt-28 pb-16 lg:pt-32 lg:pb-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column Content */}
        <div className="max-w-2xl space-y-6">
          {/* Live Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label text-xs uppercase tracking-wider backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Deck Woodfire 480°C
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high/80 text-tertiary font-label text-xs uppercase tracking-wider backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
              Fermentação Natural 48h
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high/80 text-on-surface-variant font-label text-xs uppercase tracking-wider">
              Farinha Italiana 00 D.O.P.
            </span>
          </div>

          <h1 className="font-display text-4xl lg:text-6xl tracking-tight text-on-surface font-bold leading-tight">
            A Verdadeira Pizza Napolitana no{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-container">
              Forno a Lenha
            </span>
          </h1>

          <p className="font-body text-base lg:text-lg text-on-surface-variant max-w-xl">
            Massa biga maturada por 48 horas em câmara fria, aberta manualmente sobre sêmola e selada em 70 segundos sob o fogo vivo de carvalho e acácia.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/customizer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-label text-xs uppercase tracking-wider shadow-[0_8px_24px_-4px_rgba(255,83,82,0.45)] hover:bg-secondary-container hover:-translate-y-1 transition-all duration-300 font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Montar Minha Pizza
            </Link>
            <a
              href="#cardapio-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high/80 text-on-surface font-label text-xs uppercase tracking-wider backdrop-blur-md hover:bg-surface-container-highest transition-all duration-200"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">local_fire_department</span>
              Ver Mais Pedidas
            </a>
          </div>

          {/* Telemetry Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg">
            <div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
              <span className="font-display text-xl text-on-surface font-bold">480°C</span>
              <p className="font-label text-[10px] text-outline uppercase">Temperatura Deck</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
              <span className="font-display text-xl text-on-surface font-bold">70 seg</span>
              <p className="font-label text-[10px] text-outline uppercase">Tempo de Fornada</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
              <span className="font-display text-xl text-secondary font-bold">4.9 ★</span>
              <p className="font-label text-[10px] text-outline uppercase">2.4k Avaliações</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Accent Card */}
        <div className="relative w-full max-w-lg lg:max-w-md shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low p-2">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <img
                alt="Margherita Verace D.O.P. saindo do forno a lenha"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTyLwOD56p2XE4bbaE0vCDb4iL5UaU5zerzT88XhRq8ejc-XmbS2eimoYifwt14IHdEjLjxd7mhSasWbFhMg86hewe73Q3rbxImY5_9AJy76fd_IKXgt85yls7FygU8QjSXka1ewEDW6fVKN56oLyO74MuwCAiHNlOAZDdudzaetY3MyrUKTve2RS1VAwrjTHnkYkfvRIYzz-W5yUlWSfRXi6H7IM6sKSXrHNn1LCc02rf7F0I_k"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label text-xs uppercase">
                <span className="material-symbols-outlined text-[16px] text-primary-container">local_fire_department</span>
                Saindo do Forno Agora
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface">
                <div>
                  <span className="font-label text-xs text-secondary uppercase tracking-wider">Edição Especial</span>
                  <p className="font-display text-lg font-bold">Margherita Verace</p>
                </div>
                <span className="font-display text-xl text-primary font-bold">R$ 68,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
