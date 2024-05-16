import { IsNotEmpty } from 'class-validator';

//BPO - 05/16/2024 - TP - Creer l'adresse
export class OrderModifyShippingDto {
  @IsNotEmpty({ message: 'L\'adresse doit être remplie' })
  shippingAdress: string;

  @IsNotEmpty({ message: 'Le mode de livraison doit être choisi' })
  shippingMethod: string;
}