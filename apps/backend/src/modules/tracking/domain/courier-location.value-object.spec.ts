import { describe, it, expect } from 'vitest';
import { CourierLocationValueObject } from './courier-location.value-object';

describe('CourierLocationValueObject (Tracking Domain Test)', () => {
  it('deve criar uma localização válida de entregador', () => {
    const loc = new CourierLocationValueObject({
      courierId: 'cour-1',
      orderId: 'ord-100',
      latitude: -23.55052,
      longitude: -46.633309,
      speedMs: 8.5,
      timestamp: 1700000000000
    });

    expect(loc.courierId).toBe('cour-1');
    expect(loc.latitude).toBe(-23.55052);
    expect(loc.longitude).toBe(-46.633309);
  });

  it('deve rejeitar coordenadas inválidas', () => {
    expect(
      () =>
        new CourierLocationValueObject({
          courierId: 'cour-1',
          orderId: 'ord-100',
          latitude: 95, // Inválido (deve ser entre -90 e 90)
          longitude: -46.633309,
          timestamp: Date.now()
        })
    ).toThrow('Latitude inválida');

    expect(
      () =>
        new CourierLocationValueObject({
          courierId: 'cour-1',
          orderId: 'ord-100',
          latitude: -23.55052,
          longitude: 190, // Inválido (deve ser entre -180 e 180)
          timestamp: Date.now()
        })
    ).toThrow('Longitude inválida');
  });
});
