import { OrderEntity } from '../../domain/order.entity';
import { CustomerInfo, OrderItem } from '../../domain/order-types';
import { OrderRepositoryPort } from '../ports/order-repository.port';

export interface CreateOrderInput {
  customerId: string;
  customerInfo: CustomerInfo;
  items: Omit<OrderItem, 'id'>[];
  deliveryFeeCents: number;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'CARD_ON_DELIVERY';
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(input: CreateOrderInput): Promise<OrderEntity> {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    const itemsWithIds: OrderItem[] = input.items.map((item, idx) => ({
      ...item,
      id: `item-${idx + 1}-${Date.now()}`
    }));

    const order = new OrderEntity({
      id: orderId,
      code: `#CP-${randomCode}`,
      customerId: input.customerId,
      customerInfo: input.customerInfo,
      items: itemsWithIds,
      deliveryFeeCents: input.deliveryFeeCents,
      paymentMethod: input.paymentMethod
    });

    return await this.orderRepository.save(order);
  }
}
