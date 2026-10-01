import { CourierLocationValueObject, CourierLocationProps } from '../../domain/courier-location.value-object';
import { TrackingRepositoryPort } from '../ports/tracking-repository.port';

export class UpdateCourierLocationUseCase {
  constructor(private readonly trackingRepository: TrackingRepositoryPort) {}

  async execute(props: CourierLocationProps): Promise<CourierLocationValueObject> {
    const location = new CourierLocationValueObject(props);
    await this.trackingRepository.updateLocation(location);
    return location;
  }
}
