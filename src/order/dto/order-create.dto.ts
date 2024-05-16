import { IsNotEmpty } from 'class-validator';

//BPO - 05/16/2024 - TP - Creer un nouvel order
export class OrderCreateDto {
  @IsNotEmpty({ message: 'Le client doit avoir un nom' })
  customer: string;

  @IsNotEmpty({ message: 'La liste des produits ne peut pas être vide' })
  items: string[];
}