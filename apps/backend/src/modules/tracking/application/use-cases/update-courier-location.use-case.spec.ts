import { describe, it, expect, vi } from 'vitest';
import { UpdateCourierLocationUseCase } from './update-courier-location.use-case';
import { TrackingRepositoryPort } from '../ports/tracking-repository.port';

describe('UpdateCourierLocationUseCase (Application Unit Test)', () => {
  it('deve processar e salvar a localização do entregador', async () => {
    const mockRepo: TrackingRepositoryPort = {
      updateLocation: vi.fn().mockResolvedValue(undefined),
      getCourierLocation: vi.fn(),
      getNearbyCouriers: vi.fn()
    };

    const useCase = new UpdateCourierLocationUseCase(mockRepo);

    const result = await useCase.execute({
      courierId: 'cour-77',
      orderId: 'ord-33',
      latitude: -23.56,
      longitude: -46.65,
      speedMs: 10.0,
      timestamp: Date.now()
    });

    expect(result.courierId).toBe('cour-77');
    expect(mockRepo.updateLocation).toHaveBeenCalledOnce();
  });
});
