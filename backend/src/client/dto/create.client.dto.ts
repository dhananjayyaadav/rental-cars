import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: number;

  @IsNotEmpty()
  dni: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
