import { IsNumber } from "class-validator";

export class UserUpdateDto {
    firstName: string;
    lastName: string;
    password: string;
    @IsNumber()
    age: number;
    bornCity: string;
  }
  