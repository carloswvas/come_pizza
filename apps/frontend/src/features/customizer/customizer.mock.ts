import {
  PizzaSizeOption,
  CustomizerFlavor,
  CustomizerCrust,
  CustomizerTopping,
} from './customizer.types';

export const MOCK_SIZES: PizzaSizeOption[] = [
  {
    key: 'brotinho',
    name: 'Brotinho',
    priceCents: 5200,
    dimensions: '25cm • 4 fatias',
    slices: 4,
    diameterCm: 25,
  },
  {
    key: 'media',
    name: 'Média',
    priceCents: 6800,
    dimensions: '30cm • 6 fatias',
    slices: 6,
    diameterCm: 30,
  },
  {
    key: 'grande',
    name: 'Grande Família',
    priceCents: 8400,
    dimensions: '35cm • 8 fatias',
    slices: 8,
    diameterCm: 35,
    recommended: true,
  },
];

export const MOCK_FLAVORS: CustomizerFlavor[] = [
  {
    id: 'margherita-dop',
    name: 'Margherita D.O.P.',
    description: 'San Marzano, Fior di Latte & Manjericão',
    extraPriceCents: 0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwHxYOupAj3zW1t2_wjpCRVKymjOxUxk4VAR6hE4sQFyrQRaWmPP31PyW-0UyT2x5H8VAugjBzBRHbipVFBk-iRxkRAujIvKEPmxDoMt09cfEFZ1ZJXsl_XUfJ4FhKEt-7V8Y1boIzAhx05zTdp0VzC03ATHZZYxWc00hBeJ3G2UU0fsLZ4sjRC5h88QSUouI7ufwqwgdFvUJHF1FBfp0Y09gKO-oEeQwcwdP427LkT4MPakeskds',
  },
  {
    id: 'quatro-queijos',
    name: 'Quatro Queijos Raros',
    description: 'Taleggio, Gorgonzola Doce & Grana Padano',
    extraPriceCents: 600,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfXrq5TEFnhFhXsvseU1uyemJArAlV1CdnShzFFsXrtlYBhxW5euGoA_Ufi3PRKXGowJimxBWeArRRePTOTiug1DjcW83ucx2D_g9aHoOGBJ0kfbbg2VeEWOr7O3a5ERYzC01S1v2OP5NBmnifBy5XRBWY94XLr-yLNwJ9Da6k4UvgvLL0roW10h31LpJkpAk4a9qeoGOYEIjJAF2dIUNj9FXOKOKXU2htvDul0YkD-B36LZMVNrY',
  },
  {
    id: 'diavola-artesanal',
    name: 'Diavola Artesanal',
    description: 'Salame Picante, Provola & Mel Picante',
    extraPriceCents: 400,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxnN9ShP6ZsYM0nm_afS_NVwyvCvu7kBBeDHmULokIc67JeaLfxiSa_smRhFLrD0yllWUYV75RlIuo09FRF0pgZU2ns00BJ9OCxgIThVhgjpm2zXu7J3yzT6ib81n5HeKgr-6-gkBqyawfwmSTPNYqn_BjHj6LHiluGQUe_j7f_y2tjFhtsmex70gIjff7_7yDaqWxIykauTh0vSZy0qx5mwYPT2PJWXfQiUpvjozA00qFdlDArus',
  },
  {
    id: 'cogumelos-trufa',
    name: 'Cogumelos & Trufa',
    description: 'Shimeji, Porcini & Azeite Trufado',
    extraPriceCents: 800,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBS8kAo60RLCDmLMe4mVFdoK7QzEi4jHuMnsOZOeSW49HZExNdVACNeykfIie__RWk3bBCLpFZFJhSNLr36LvGyi27VcVSq18dT_kbMm0G3DsxQT2xp__vqQDplZPCf8-HJj3q0LJHcnN3gkZjWkF3IBCSyc3alJjgh4qBqT9D-OUrZDQre-iI2WL2bkVWEIIp5kijcDwy34__Qqnxr2zshvemRNA6iRVScuG7Gb_xPmA38J4HMAUc',
  },
];

export const MOCK_CRUSTS: CustomizerCrust[] = [
  {
    id: 'tradicional',
    name: 'Napolitana Inflada',
    description: 'Massa pura, aerada e oca por dentro.',
    priceCents: 0,
  },
  {
    id: 'catupiry',
    name: 'Catupiry Original',
    description: 'Recheio cremoso autêntico sem amido.',
    priceCents: 1200,
  },
  {
    id: 'cheddar',
    name: 'Cheddar Inglês',
    description: 'Maturado com infusão de pimenta jalapeño.',
    priceCents: 1400,
  },
  {
    id: 'ervas',
    name: 'Ervas Tostadas & Alho',
    description: 'Manteiga clarificada, flor de sal e alecrim.',
    priceCents: 800,
  },
];

export const MOCK_TOPPINGS: CustomizerTopping[] = [
  {
    id: 'burrata',
    name: 'Burrata Inteira Cremosa',
    priceCents: 1600,
  },
  {
    id: 'bacon',
    name: 'Bacon Artesanal Crocante',
    priceCents: 800,
  },
  {
    id: 'mel-picante',
    name: 'Mel Silvestre Picante',
    priceCents: 600,
  },
  {
    id: 'grana-padano',
    name: 'Parmesão Grana Padano Ralado',
    priceCents: 1000,
  },
];
