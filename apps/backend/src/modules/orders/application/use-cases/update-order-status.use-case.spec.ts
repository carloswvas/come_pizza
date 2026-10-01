import { describe, it, expect, vi } from 'vitest';
import { UpdateOrderStatusUseCase } from './update-order-status.use-case';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { OrderEntity } from '../../domain/order.entity';
import { OrderStatus } from '../../domain/order-types';

describe('UpdateOrderStatusUseCase (Application Unit Test)', () => {
  it('deve atualizar o status do pedido com sucesso', async () => {
    const existingOrder = new OrderEntity({
      id: 'ord-10',
      code: '#CP-1010',
      customerId: 'cust-1',
      customerInfo: {
        id: 'cust-1',
        name: 'Carlos',
        phone: '11999999999',
        deliveryAddress: {
          street: 'Rua A',
          number: '10',
          neighborhood: 'Bairro',
          city: 'SP',
          zipCode: '00000-000'
        }
      },
      items: [],
      status: OrderStatus.CREATED,
      deliveryFeeCents: 500,
      paymentMethod: 'PIX'
    });

    const mockRepository: OrderRepositoryPort = {
      save: vi.fn().mockImplementation(async (o) => o),
      findById: vi.fn().mockResolvedValue(existingOrder),
      findByCode: vi.fn()
    };

    const useCase = new UpdateOrderStatusUseCase(mockRepository);

    const updated = await useCase.execute({
      orderId: 'ord-10',
      newStatus: OrderStatus.CONFIRMED
    });

    expect(updated.status).toBe(OrderStatus.CONFIRMED);
    expect(mockRepository.save).toHaveBeenCalledOnce();
  });

  it('deve lançar erro se o pedido não for encontrado', async () => {
    const mockRepository: OrderRepositoryPort = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(null),
      findByCode: vi.fn()
    };

    const useCase = new UpdateOrderStatusUseCase(mockRepository);

    await expect(
      useCase.execute({ orderId: 'ord-invalido', newStatus: OrderStatus.CONFIRMED })
    ).rejects.toThrow('Pedido com ID ord-invalido não encontrado');
  });
});
