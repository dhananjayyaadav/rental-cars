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
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nationality: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: number;

  @Column()
  dni: number;

  @Column()
  email: string;

  @OneToMany(() => Reservation, (reservation) => reservation.client, {
    eager: true,
  })
  reservations: Reservation[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
