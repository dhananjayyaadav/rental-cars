import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { ClientService } from 'src/client/client.service';
import { CreateReservationDto } from './dto/create.reservation.dto';
import { Reservation, ReservationStatus } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    private clientService: ClientService,
    private carService: CarService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { clientId, carId } = createReservationDto;
    const client = await this.clientService.getClientById(clientId);
    const car = await this.carService.getCarById(carId);
    return await this.reservationService.createReservation(
      createReservationDto,
      client,
      car,
    );
  }

  @Get()
  async getAllReservations(): Promise<Reservation[]> {
    return await this.reservationService.getAllReservations();
  }

  @Get('/:id')
  async getReservationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Reservation> {
    return await this.reservationService.getReservationById(id);
  }

  @Patch('/:id')
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationService.getReservationById(id);
    return await this.reservationService.updateReservation(
      reservation,
      updateReservationDto,
    );
  }

  @Patch('/:id/status')
  async updateReservationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: ReservationStatus,
  ): Promise<Reservation> {
    const reservation = await this.reservationService.getReservationById(id);
    return await this.reservationService.updateReservationStatus(
      reservation,
      status,
    );
  }

  @Delete('/:id')
  async deleteReservationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.reservationService.deleteReservationById(id);
  }
}
