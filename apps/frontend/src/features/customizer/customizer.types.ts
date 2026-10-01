export type PizzaSizeKey = 'brotinho' | 'media' | 'grande';
export type FlavorMode = 'single' | 'split';
export type BakeLevel = 'gold' | 'char';

export interface PizzaSizeOption {
  key: PizzaSizeKey;
  name: string;
  priceCents: number;
  dimensions: string;
  slices: number;
  diameterCm: number;
  recommended?: boolean;
}

export interface CustomizerFlavor {
  id: string;
  name: string;
  description: string;
  extraPriceCents: number;
  image: string;
}

export interface CustomizerCrust {
  id: string;
  name: string;
  description: string;
  priceCents: number;
}

export interface CustomizerTopping {
  id: string;
  name: string;
  priceCents: number;
}

export interface CustomizerState {
  size: PizzaSizeOption;
  flavorMode: FlavorMode;
  flavor1: CustomizerFlavor;
  flavor2: CustomizerFlavor;
  crust: CustomizerCrust;
  selectedToppings: CustomizerTopping[];
  bakeLevel: BakeLevel;
}
