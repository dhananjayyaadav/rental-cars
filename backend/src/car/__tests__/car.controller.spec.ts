import { Test } from '@nestjs/testing';
import { CarController } from '../car.controller';
import { CarService } from '../car.service';
import { CreateCarDto } from '../dto/create.car.dto';

const mockCarService = () => ({
  createCar: jest.fn(),
  getAllCars: jest.fn(),
  getCarById: jest.fn(),
  deleteCarById: jest.fn(),
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
describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CarController],
      providers: [{ provide: CarService, useFactory: mockCarService }],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carController = moduleRef.get<CarController>(CarController);
  });

  describe('Create Car', () => {
    it('Create Car calls Service correctly', async () => {
      await carController.createCar(createCarDto);
      expect(carService.createCar).toHaveBeenCalled();
      expect(carService.createCar).toHaveBeenCalledWith(createCarDto);
    });
  });
  describe('Get all Cars', () => {
    it('Get all Cars calls Service', async () => {
      await carController.getAllCars();
      expect(carService.getAllCars).toHaveBeenCalled();
      expect(carService.getAllCars).toHaveBeenCalledWith();
    });
  });

  describe('Get Car By Id', () => {
    it('Get by id  calls Service', async () => {
      await carController.getCarById(1);
      expect(carService.getCarById).toHaveBeenCalled();
      expect(carService.getCarById).toHaveBeenCalledWith(1);
    });
  });

  describe('Delete Car By Id', () => {
    it('Get by id  calls Service', async () => {
      await carController.deleteCarById(1);
      expect(carService.deleteCarById).toHaveBeenCalled();
      expect(carService.deleteCarById).toHaveBeenCalledWith(1);
    });
  });
});
