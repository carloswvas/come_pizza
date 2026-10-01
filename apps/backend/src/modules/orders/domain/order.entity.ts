import { CustomerInfo, OrderItem, OrderStatus } from './order-types';

export interface OrderEntityProps {
  id: string;
  code: string;
  customerId: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  status?: OrderStatus;
  deliveryFeeCents: number;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'CARD_ON_DELIVERY';
  createdAt?: Date;
  updatedAt?: Date;
}

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.CREATED]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.IN_PREPARATION, OrderStatus.CANCELLED],
  [OrderStatus.IN_PREPARATION]: [OrderStatus.BAKING, OrderStatus.CANCELLED],
  [OrderStatus.BAKING]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: []
};

export class OrderEntity {
  readonly id: string;
  readonly code: string;
  readonly customerId: string;
  readonly customerInfo: CustomerInfo;
  readonly items: OrderItem[];
  readonly deliveryFeeCents: number;
  readonly paymentMethod: 'PIX' | 'CREDIT_CARD' | 'CARD_ON_DELIVERY';
  readonly createdAt: Date;
  
  private _status: OrderStatus;
  private _updatedAt: Date;

  constructor(props: OrderEntityProps) {
    this.id = props.id;
    this.code = props.code;
    this.customerId = props.customerId;
    this.customerInfo = props.customerInfo;
    this.items = props.items;
    this._status = props.status ?? OrderStatus.CREATED;
    this.deliveryFeeCents = props.deliveryFeeCents;
    this.paymentMethod = props.paymentMethod;
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get status(): OrderStatus {
    return this._status;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get subtotalCents(): number {
    return this.items.reduce((total, item) => {
      let itemTotal = item.unitPriceCents * item.quantity;
      if (item.customization?.extraToppings) {
        const extraSum = item.customization.extraToppings.reduce(
          (sum, top) => sum + top.priceCents,
          0
        );
        itemTotal += extraSum * item.quantity;
      }
      return total + itemTotal;
    }, 0);
  }

  get totalCents(): number {
    return this.subtotalCents + this.deliveryFeeCents;
  }

  updateStatus(newStatus: OrderStatus): void {
    const allowed = ALLOWED_TRANSITIONS[this._status];
    if (!allowed.includes(newStatus)) {
      throw new Error(
        `Transição de status inválida de ${this._status} para ${newStatus}`
      );
    }
    this._status = newStatus;
    this._updatedAt = new Date();
  }
}
