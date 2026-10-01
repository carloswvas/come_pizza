export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  rating: number;
  bakeTimeMinutes: string;
  tags: string[];
  badges: string[];
  isPopular?: boolean;
  category: 'pizzas' | 'entradas' | 'bebidas' | 'sobremesas';
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  unitPriceCents: number;
  quantity: number;
  customizationSummary?: string[];
  totalPriceCents: number;
}
