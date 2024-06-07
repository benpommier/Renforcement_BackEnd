import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//BPO - 05/17/2024 - TP - Création d'order Item
@Entity()
export class OrderItem {
  constructor(createOrderItemDto?: {product: Product, quantity: number}) {
    
    if (createOrderItemDto) {
      this.price = createOrderItemDto.product.prix * createOrderItemDto.quantity;
      this.quantity = createOrderItemDto.quantity;
      this.product = createOrderItemDto.product;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.titre)
  product: Product;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  public incrementQuantityAndPrice(quantity: number, price: number) {
    this.quantity += quantity;
    this.price += price;
  }
}