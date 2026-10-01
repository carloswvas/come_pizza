import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { UpdateOrderStatusUseCase } from '../application/use-cases/update-order-status.use-case';
import { OrderStatus } from '../domain/order-types';

export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase
  ) {}

  async createOrder(reqBody: any) {
    if (!reqBody.customerId || !reqBody.items || reqBody.items.length === 0) {
      return { status: 400, body: { error: 'Payload inválido: cliente e itens são obrigatórios' } };
    }

    try {
      const order = await this.createOrderUseCase.execute({
        customerId: reqBody.customerId,
        customerInfo: reqBody.customerInfo ?? {
          id: reqBody.customerId,
          name: 'Cliente Silva',
          phone: '11900000000',
          deliveryAddress: {
            street: 'Rua Principal',
            number: '100',
            neighborhood: 'Centro',
            city: 'São Paulo',
            zipCode: '01000-000'
          }
        },
        items: reqBody.items,
        deliveryFeeCents: reqBody.deliveryFeeCents ?? 1000,
        paymentMethod: reqBody.paymentMethod ?? 'PIX'
      });

      return { status: 201, body: order };
    } catch (err: any) {
      return { status: 500, body: { error: err.message } };
    }
  }

  async updateStatus(orderId: string, newStatus: OrderStatus) {
    try {
      const updated = await this.updateOrderStatusUseCase.execute({ orderId, newStatus });
      return { status: 200, body: updated };
    } catch (err: any) {
      return { status: 400, body: { error: err.message } };
    }
  }
}
