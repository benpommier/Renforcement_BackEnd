import { IsNumber, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsNumber()
  age: number;

  @IsString()
  bornCity: string;
}
