import { Car } from 'src/car/car.entity';
import { Client } from 'src/client/client.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  finishDate: string;

  @Column()
  pricePerDay: number;

  @Column()
  totalDays: number;

  @Column()
  totalPrice: number;

  @Column()
  paymentMethod: ReservationPaymentMethod;

  @Column()
  status: ReservationStatus;

  @ManyToOne(() => Client, (client) => client.reservations, {
    eager: false,
  })
  client: Client;

  @Column()
  clientId: number;

  @ManyToOne(() => Car, (car) => car.reservations, {
    eager: false,
  })
  car: Car;

  @Column()
  carId: number;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FINISHED = 'FINISHED',
}

export enum ReservationPaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
}
