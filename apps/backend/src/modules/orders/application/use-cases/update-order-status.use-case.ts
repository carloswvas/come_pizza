import { OrderEntity } from '../../domain/order.entity';
import { OrderStatus } from '../../domain/order-types';
import { OrderRepositoryPort } from '../ports/order-repository.port';

export interface UpdateOrderStatusInput {
  orderId: string;
  newStatus: OrderStatus;
}

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(input: UpdateOrderStatusInput): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new Error(`Pedido com ID ${input.orderId} não encontrado`);
    }

    order.updateStatus(input.newStatus);
    return await this.orderRepository.save(order);
  }
}
