import { describe, it, expect } from 'vitest';
import { RedisTrackingRepository } from './redis-tracking.repository';
import { CourierLocationValueObject } from '../domain/courier-location.value-object';

describe('RedisTrackingRepository (Integration Test)', () => {
  it('deve atualizar e recuperar a localização de um entregador', async () => {
    const repo = new RedisTrackingRepository();
    const location = new CourierLocationValueObject({
      courierId: 'cour-55',
      orderId: 'ord-88',
      latitude: -23.561684,
      longitude: -46.655981,
      speedMs: 12.0,
      timestamp: Date.now()
    });

    await repo.updateLocation(location);
    const retrieved = await repo.getCourierLocation('cour-55');

    expect(retrieved).not.toBeNull();
    expect(retrieved?.courierId).toBe('cour-55');
    expect(retrieved?.latitude).toBe(-23.561684);
  });

  it('deve retornar entregadores próximos por geolocalização', async () => {
    const repo = new RedisTrackingRepository();
    const loc1 = new CourierLocationValueObject({
      courierId: 'cour-near',
      orderId: 'ord-1',
      latitude: -23.5505,
      longitude: -46.6333,
      timestamp: Date.now()
    });

    await repo.updateLocation(loc1);

    const nearby = await repo.getNearbyCouriers(-23.5500, -46.6330, 5); // 5km radius
    expect(nearby).toContain('cour-near');
  });
});
