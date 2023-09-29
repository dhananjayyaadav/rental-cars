import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/car/car.entity';
import { Client } from 'src/client/client.entity';
import { CreateReservationDto } from './dto/create.reservation.dto';
import { Reservation, ReservationStatus } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private reservationRepository: ReservationRepository,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
    client: Client,
    car: Car,
  ): Promise<Reservation> {
    const { startDate, finishDate } = createReservationDto;
    const totalDays = this.calculateTotalDays(startDate, finishDate);

    const reservation = await this.reservationRepository.createReservation(
      createReservationDto,
      totalDays,
      client,
      car,
    );
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await this.reservationRepository.getAllReservations();
  }
  async getReservationById(id: number): Promise<Reservation> {
    const Reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!Reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return Reservation;
  }

  async updateReservation(
    reservation: Reservation,
    updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationRepository.updateReservation(
      reservation,
      updateReservationDto,
    );
  }

  async deleteReservationById(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateReservationStatus(
    reservation: Reservation,
    status: ReservationStatus,
  ): Promise<Reservation> {
    if (status === ReservationStatus.PENDING) {
      return this.pay(reservation, status);
    } else if (status === ReservationStatus.PAID) {
      return this.finish(reservation, status);
    }
    return reservation;
  }

  private async pay(
    reservation: Reservation,
    status: ReservationStatus,
  ): Promise<Reservation> {
    if (reservation.status === status) {
      reservation.status = ReservationStatus.PAID;
    }
    await reservation.save();
    return reservation;
  }

  private async finish(
    reservation: Reservation,
    status: ReservationStatus,
  ): Promise<Reservation> {
    if (reservation.status !== status) {
      throw new MethodNotAllowedException('Reservation is not paid');
    }
    reservation.status = ReservationStatus.FINISHED;
    await reservation.save();
    return reservation;
  }

  private calculateTotalDays(startDate: string, finishDate: string): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(startDate);
    const secondDate = new Date(finishDate); // "year,month,day" => FORMAT

    return Math.round(
      Math.abs((firstDate.valueOf() - secondDate.valueOf()) / oneDay),
    );
  }
}
