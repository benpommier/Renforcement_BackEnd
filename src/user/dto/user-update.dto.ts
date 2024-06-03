import { IsNumber } from "class-validator";

export class UserUpdateDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    @IsNumber()
    age: number;
    bornCity: string;
  }
  