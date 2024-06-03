import { IsNumber, IsString, MinLength } from 'class-validator';

//BPO - 06/03/2024 - TP - Authentification
export class AuthDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
