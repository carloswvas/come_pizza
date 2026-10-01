import { OrderEntity } from '../../domain/order.entity';

export interface OrderRepositoryPort {
  save(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  findByCode(code: string): Promise<OrderEntity | null>;
}
