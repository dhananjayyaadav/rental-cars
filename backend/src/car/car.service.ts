import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarRepository } from './car.repository';
import { CreateCarDto } from './dto/create.car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository) private carRepository: CarRepository,
  ) {}

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carRepository.createCar(createCarDto);
  }

  async getAllCars(): Promise<Car[]> {
    return await this.carRepository.getAllCars();
  }
  async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  async updateCar(car: Car, updateCarDto: CreateCarDto): Promise<Car> {
    return this.carRepository.updateCar(car, updateCarDto);
  }

  async deleteCarById(id: number): Promise<void> {
    const result = await this.carRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
