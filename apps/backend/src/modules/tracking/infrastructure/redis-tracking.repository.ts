import { TrackingRepositoryPort } from '../application/ports/tracking-repository.port';
import { CourierLocationValueObject } from '../domain/courier-location.value-object';

export class RedisTrackingRepository implements TrackingRepositoryPort {
  private memoryStore = new Map<string, CourierLocationValueObject>();

  constructor(private readonly redisClient?: any) {}

  async updateLocation(location: CourierLocationValueObject): Promise<void> {
    if (this.redisClient && typeof this.redisClient.geoadd === 'function') {
      const key = `courier:geo:locations`;
      await this.redisClient.geoadd(
        key,
        location.longitude,
        location.latitude,
        location.courierId
      );
      await this.redisClient.set(
        `courier:pos:${location.courierId}`,
        JSON.stringify(location)
      );
    } else {
      // Memory fallback for isolated test environments
      this.memoryStore.set(location.courierId, location);
    }
  }

  async getCourierLocation(courierId: string): Promise<CourierLocationValueObject | null> {
    if (this.redisClient && typeof this.redisClient.get === 'function') {
      const data = await this.redisClient.get(`courier:pos:${courierId}`);
      if (!data) return null;
      const parsed = JSON.parse(data);
      return new CourierLocationValueObject(parsed);
    }
    return this.memoryStore.get(courierId) ?? null;
  }

  async getNearbyCouriers(
    latitude: number,
    longitude: number,
    radiusKm: number
  ): Promise<string[]> {
    if (this.redisClient && typeof this.redisClient.georadius === 'function') {
      return await this.redisClient.georadius(
        'courier:geo:locations',
        longitude,
        latitude,
        radiusKm,
        'km'
      );
    }
    const result: string[] = [];
    for (const [id, loc] of this.memoryStore.entries()) {
      const dist = Math.sqrt(
        Math.pow(loc.latitude - latitude, 2) + Math.pow(loc.longitude - longitude, 2)
      );
      if (dist < radiusKm / 111) {
        result.push(id);
      }
    }
    return result;
  }
}
