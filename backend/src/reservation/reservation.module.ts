import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from 'src/car/car.module';
import { ClientModule } from 'src/client/client.module';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationRepository]),
    ClientModule,
    CarModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
