import { describe, it, expect } from 'vitest';
import { OrderEntity } from './order.entity';
import { OrderStatus } from './order-types';

describe('OrderEntity (Domain Unit Test)', () => {
  const sampleCustomer = {
    id: 'cust-123',
    name: 'Carlos Silva',
    phone: '11999998888',
    deliveryAddress: {
      street: 'Rua das Pizzas',
      number: '450',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      zipCode: '01400-000'
    }
  };

  it('deve calcular corretamente o total do pedido com adicionais e taxa de entrega', () => {
    const order = new OrderEntity({
      id: 'order-1',
      code: '#CP-1001',
      customerId: sampleCustomer.id,
      customerInfo: sampleCustomer,
      items: [
        {
          id: 'item-1',
          productId: 'prod-margherita',
          productName: 'Pizza Margherita Especial',
          quantity: 1,
          unitPriceCents: 6000, // R$ 60,00
          customization: {
            size: 'LARGE_35CM',
            crust: 'STUFFED_CHEESE',
            flavors: [
              { flavorId: 'flv-1', name: 'Margherita', fraction: 0.5 },
              { flavorId: 'flv-2', name: 'Calabresa Gourmet', fraction: 0.5 }
            ],
            extraToppings: [
              { toppingId: 'top-bacon', name: 'Bacon Crocante', priceCents: 800 } // R$ 8,00
            ],
            removedIngredients: []
          }
        }
      ],
      status: OrderStatus.CREATED,
      deliveryFeeCents: 1000, // R$ 10,00
      paymentMethod: 'PIX'
    });

    expect(order.subtotalCents).toBe(6800); // 6000 + 800
    expect(order.totalCents).toBe(7800); // 6800 + 1000
  });

  it('deve permitir transição válida de status de CREATED até DELIVERED', () => {
    const order = new OrderEntity({
      id: 'order-2',
      code: '#CP-1002',
      customerId: sampleCustomer.id,
      customerInfo: sampleCustomer,
      items: [],
      status: OrderStatus.CREATED,
      deliveryFeeCents: 500,
      paymentMethod: 'PIX'
    });

    expect(order.status).toBe(OrderStatus.CREATED);

    order.updateStatus(OrderStatus.CONFIRMED);
    expect(order.status).toBe(OrderStatus.CONFIRMED);

    order.updateStatus(OrderStatus.IN_PREPARATION);
    expect(order.status).toBe(OrderStatus.IN_PREPARATION);

    order.updateStatus(OrderStatus.BAKING);
    expect(order.status).toBe(OrderStatus.BAKING);

    order.updateStatus(OrderStatus.OUT_FOR_DELIVERY);
    expect(order.status).toBe(OrderStatus.OUT_FOR_DELIVERY);

    order.updateStatus(OrderStatus.DELIVERED);
    expect(order.status).toBe(OrderStatus.DELIVERED);
  });

  it('deve lançar erro ao tentar transição de status inválida', () => {
    const order = new OrderEntity({
      id: 'order-3',
      code: '#CP-1003',
      customerId: sampleCustomer.id,
      customerInfo: sampleCustomer,
      items: [],
      status: OrderStatus.DELIVERED,
      deliveryFeeCents: 500,
      paymentMethod: 'PIX'
    });

    expect(() => order.updateStatus(OrderStatus.BAKING)).toThrow(
      'Transição de status inválida de DELIVERED para BAKING'
    );
  });
});
