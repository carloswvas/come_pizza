import { describe, it, expect } from 'vitest';
import { PostgresOrderRepository } from './postgres-order.repository';
import { OrderEntity } from '../domain/order.entity';
import { OrderStatus } from '../domain/order-types';

describe('PostgresOrderRepository (Integration Test)', () => {
  it('deve salvar e buscar um pedido com integridade de dados e objetos aninhados', async () => {
    const repo = new PostgresOrderRepository();
    const order = new OrderEntity({
      id: 'ord-pg-1',
      code: '#CP-9999',
      customerId: 'cust-99',
      customerInfo: {
        id: 'cust-99',
        name: 'Ana Clara',
        phone: '11977776666',
        deliveryAddress: {
          street: 'Av. Brasil',
          number: '500',
          neighborhood: 'Jardim América',
          city: 'São Paulo',
          zipCode: '01430-000'
        }
      },
      items: [
        {
          id: 'item-pg-1',
          productId: 'prod-quattro-formaggi',
          productName: 'Pizza Quatro Queijos Gourmet',
          quantity: 1,
          unitPriceCents: 6500,
          customization: {
            size: 'LARGE_35CM',
            crust: 'CHARRED_HERB',
            flavors: [{ flavorId: 'flv-4q', name: 'Quatro Queijos', fraction: 1.0 }],
            extraToppings: [{ toppingId: 'top-honey', name: 'Mel Silvestre', priceCents: 600 }],
            removedIngredients: []
          }
        }
      ],
      status: OrderStatus.CREATED,
      deliveryFeeCents: 800,
      paymentMethod: 'PIX'
    });

    await repo.save(order);
    const found = await repo.findById('ord-pg-1');

    expect(found).not.toBeNull();
    expect(found?.code).toBe('#CP-9999');
    expect(found?.items[0].customization?.crust).toBe('CHARRED_HERB');
    expect(found?.totalCents).toBe(7900); // 6500 + 600 + 800
  });
});
