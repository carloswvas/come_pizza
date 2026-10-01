export interface CourierLocationProps {
  courierId: string;
  orderId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speedMs?: number;
  timestamp: number;
}

export class CourierLocationValueObject {
  readonly courierId: string;
  readonly orderId: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly heading?: number;
  readonly speedMs?: number;
  readonly timestamp: number;

  constructor(props: CourierLocationProps) {
    if (props.latitude < -90 || props.latitude > 90) {
      throw new Error('Latitude inválida: deve estar entre -90 e 90');
    }
    if (props.longitude < -180 || props.longitude > 180) {
      throw new Error('Longitude inválida: deve estar entre -180 e 180');
    }

    this.courierId = props.courierId;
    this.orderId = props.orderId;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.heading = props.heading;
    this.speedMs = props.speedMs;
    this.timestamp = props.timestamp;
  }
}
