import { IsNotEmpty } from 'class-validator';

//BPO - 05/16/2024 - TP - Creer l'adresse
export class OrderModifyInvoiceDto {
  @IsNotEmpty({ message: 'L\'adresse de facturation doit être remplie' })
  invoiceAdress: string;
}