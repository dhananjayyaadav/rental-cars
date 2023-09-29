import { IsIn, IsNotEmpty } from 'class-validator';
import { ReservationPaymentMethod } from '../reservation.entity';

export class CreateReservationDto {
  @IsNotEmpty()
  startDate;

  @IsNotEmpty()
  finishDate;

  @IsNotEmpty()
  pricePerDay;

  @IsNotEmpty()
  @IsIn(Object.values(ReservationPaymentMethod))
  paymentMethod;

  @IsNotEmpty()
  clientId;

  @IsNotEmpty()
  carId;
}
