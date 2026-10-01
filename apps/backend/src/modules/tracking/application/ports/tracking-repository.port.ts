import { CourierLocationValueObject } from '../../domain/courier-location.value-object';

export interface TrackingRepositoryPort {
  updateLocation(location: CourierLocationValueObject): Promise<void>;
  getCourierLocation(courierId: string): Promise<CourierLocationValueObject | null>;
  getNearbyCouriers(latitude: number, longitude: number, radiusKm: number): Promise<string[]>;
}
