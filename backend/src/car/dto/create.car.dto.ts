import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  kms: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  passengers: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  air_conditioning: string;
}
