import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CarRepository } from '../car.repository';
import { CarService } from '../car.service';
import { CreateCarDto } from '../dto/create.car.dto';

const mockCarRepository = () => ({
  createCar: jest.fn(),
  getAllCars: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const createCarDto: CreateCarDto = {
  brand: 'string',
  model: 'string',
  year: 3,
  kms: 'string',
  color: 'string',
  passengers: 1,
  price: 2,
  image: 'string',
  air_conditioning: 'string',
};
/**
 * @param  {CarService} 'CarService'
 * @param  {CarRepository} "carRepository"
 */
describe('CarService', () => {
  let carService;
  let carRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: CarRepository, useFactory: mockCarRepository },
      ],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carRepository = moduleRef.get<CarRepository>(CarRepository);
  });

  describe('Create Car', () => {
    it('Calls Repository', async () => {
      await carService.createCar(createCarDto);
      expect(carRepository.createCar).toHaveBeenCalledTimes(1);
      expect(carRepository.createCar).toHaveBeenCalledWith(createCarDto);
    });
  });

  describe('Get All Car', () => {
    it('Calls Repository', async () => {
      await carService.getAllCars();
      expect(carRepository.getAllCars).toHaveBeenCalledTimes(1);
      expect(carRepository.getAllCars).toHaveBeenCalledWith();
    });
  });

  describe('Delete Car', () => {
    it('Delete Car calls calls repository and deletes a car successfully', async () => {
      carRepository.delete.mockResolvedValue({ affected: 1 });
      await carService.deleteCarById(1);
      expect(carRepository.delete).toHaveBeenCalledTimes(1);
      expect(carRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Calls Repository and throws NotFoundException if Car is not found', async () => {
      carRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(carService.deleteCarById(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(carRepository.delete).toHaveBeenCalledTimes(1);
      expect(carRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('Get car By Id', () => {
    it('Calls Repository and returns the car sucessfully', async () => {
      carRepository.findOne.mockResolvedValue({});
      const id = 1;
      await carService.getCarById(id);
      expect(carRepository.findOne).toHaveBeenCalledTimes(1);
      expect(carRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('Calls Repository and throws NotFoundException if car was not found', async () => {
      carRepository.findOne.mockResolvedValue(undefined);
      const id = 1;
      await expect(carService.getCarById(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(carRepository.findOne).toHaveBeenCalledTimes(1);
      expect(carRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
