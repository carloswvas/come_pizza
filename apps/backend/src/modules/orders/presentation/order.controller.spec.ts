import { describe, it, expect, vi } from 'vitest';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { UpdateOrderStatusUseCase } from '../application/use-cases/update-order-status.use-case';
import { OrderEntity } from '../domain/order.entity';
import { OrderStatus } from '../domain/order-types';

describe('OrderController (Presentation Layer Spec)', () => {
  it('deve retornar status 201 ao criar pedido com sucesso', async () => {
    const mockOrder = new OrderEntity({
      id: 'ord-http-1',
      code: '#CP-7777',
      customerId: 'cust-1',
      customerInfo: {
        id: 'cust-1',
        name: 'Maria',
        phone: '11999999999',
        deliveryAddress: {
          street: 'Rua X',
          number: '1',
          neighborhood: 'N',
          city: 'C',
          zipCode: '0'
        }
      },
      items: [],
      status: OrderStatus.CREATED,
      deliveryFeeCents: 500,
      paymentMethod: 'PIX'
    });

    const mockCreateUseCase = {
      execute: vi.fn().mockResolvedValue(mockOrder)
    } as unknown as CreateOrderUseCase;

    const mockUpdateUseCase = {} as unknown as UpdateOrderStatusUseCase;

    const controller = new OrderController(mockCreateUseCase, mockUpdateUseCase);

    const res = await controller.createOrder({
      customerId: 'cust-1',
      items: [{ productId: 'prod-1', productName: 'Pizza', quantity: 1, unitPriceCents: 5000 }]
    });

    expect(res.status).toBe(201);
    expect(res.body.code).toBe('#CP-7777');
  });

  it('deve retornar status 400 em payload sem itens', async () => {
    const controller = new OrderController({} as any, {} as any);
    const res = await controller.createOrder({ customerId: 'cust-1', items: [] });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Payload inválido');
  });
});
