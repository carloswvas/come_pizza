import { OrderRepositoryPort } from '../application/ports/order-repository.port';
import { OrderEntity } from '../domain/order.entity';

export class PostgresOrderRepository implements OrderRepositoryPort {
  private dbMap = new Map<string, OrderEntity>();

  constructor(private readonly dbClient?: any) {}

  async save(order: OrderEntity): Promise<OrderEntity> {
    if (this.dbClient && typeof this.dbClient.query === 'function') {
      // Direct SQL + JSONB query support when connected to PostgreSQL
      const queryText = `
        INSERT INTO orders (id, code, customer_id, customer_info, items, status, delivery_fee_cents, payment_method, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at
        RETURNING *;
      `;
      await this.dbClient.query(queryText, [
        order.id,
        order.code,
        order.customerId,
        JSON.stringify(order.customerInfo),
        JSON.stringify(order.items),
        order.status,
        order.deliveryFeeCents,
        order.paymentMethod,
        order.createdAt,
        order.updatedAt
      ]);
    }
    this.dbMap.set(order.id, order);
    return order;
  }

  async findById(id: string): Promise<OrderEntity | null> {
    if (this.dbClient && typeof this.dbClient.query === 'function') {
      const res = await this.dbClient.query('SELECT * FROM orders WHERE id = $1', [id]);
      if (res.rows.length === 0) return null;
      const row = res.rows[0];
      return new OrderEntity({
        id: row.id,
        code: row.code,
        customerId: row.customer_id,
        customerInfo: typeof row.customer_info === 'string' ? JSON.parse(row.customer_info) : row.customer_info,
        items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
        status: row.status,
        deliveryFeeCents: row.delivery_fee_cents,
        paymentMethod: row.payment_method,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      });
    }
    return this.dbMap.get(id) ?? null;
  }

  async findByCode(code: string): Promise<OrderEntity | null> {
    for (const order of this.dbMap.values()) {
      if (order.code === code) return order;
    }
    return null;
  }
}
