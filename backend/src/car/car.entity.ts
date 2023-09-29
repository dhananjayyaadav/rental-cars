import { Exclude } from 'class-transformer';
import { Reservation } from 'src/reservation/reservation.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  kms: string;

  @Column()
  color: string;

  @Column()
  passengers: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  air_conditioning: string;

  @OneToMany(() => Reservation, (reservation) => reservation.car, {
    eager: true,
  })
  reservations: Reservation[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
