export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  IN_PREPARATION = 'IN_PREPARATION',
  BAKING = 'BAKING', // Específico do forno a lenha
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export type CrustType = 'TRADITIONAL' | 'STUFFED_CHEESE' | 'CHARRED_HERB';
export type PizzaSize = 'INDIVIDUAL_25CM' | 'MEDIUM_30CM' | 'LARGE_35CM';

export interface PizzaFlavorSelection {
  flavorId: string;
  name: string;
  fraction: 0.5 | 1.0;
}

export interface ExtraTopping {
  toppingId: string;
  name: string;
  priceCents: number;
}

export interface PizzaCustomization {
  size: PizzaSize;
  crust: CrustType;
  flavors: PizzaFlavorSelection[];
  extraToppings: ExtraTopping[];
  removedIngredients: string[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPriceCents: number;
  customization?: PizzaCustomization;
}

export interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  deliveryAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
}
