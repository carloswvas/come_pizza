import { describe, it, expect, vi } from 'vitest';
import { CreateOrderUseCase } from './create-order.use-case';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { OrderEntity } from '../../domain/order.entity';
import { OrderStatus } from '../../domain/order-types';

describe('CreateOrderUseCase (Application Unit Test)', () => {
  it('deve criar e salvar um pedido com código gerado e status CREATED', async () => {
    const mockRepository: OrderRepositoryPort = {
      save: vi.fn().mockImplementation(async (order: OrderEntity) => order),
      findById: vi.fn(),
      findByCode: vi.fn()
    };

    const useCase = new CreateOrderUseCase(mockRepository);

    const input = {
      customerId: 'cust-1',
      customerInfo: {
        id: 'cust-1',
        name: 'Maria Souza',
        phone: '11988887777',
        deliveryAddress: {
          street: 'Av. Paulista',
          number: '1000',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          zipCode: '01310-100'
        }
      },
      items: [
        {
          productId: 'prod-calabresa',
          productName: 'Pizza Calabresa Artesanal',
          quantity: 2,
          unitPriceCents: 5500,
          customization: {
            size: 'LARGE_35CM' as const,
            crust: 'TRADITIONAL' as const,
            flavors: [{ flavorId: 'flv-calabresa', name: 'Calabresa', fraction: 1.0 as const }],
            extraToppings: [],
            removedIngredients: ['cebola']
          }
        }
      ],
      deliveryFeeCents: 1200,
      paymentMethod: 'PIX' as const
    };

    const order = await useCase.execute(input);

    expect(order).toBeDefined();
    expect(order.code).toMatch(/^#CP-\d{4}$/);
    expect(order.status).toBe(OrderStatus.CREATED);
    expect(order.subtotalCents).toBe(11000); // 5500 * 2
    expect(order.totalCents).toBe(12200); // 11000 + 1200
    expect(mockRepository.save).toHaveBeenCalledOnce();
  });
});
