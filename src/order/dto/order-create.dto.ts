import { IsNotEmpty , IsNumber} from 'class-validator';
import { OrderItem } from '../entity/orderItem.entity';
import { Product } from 'src/product/entity/product.entity';

//BPO - 05/16/2024 - TP - Creer un nouvel order
export class OrderCreateDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}