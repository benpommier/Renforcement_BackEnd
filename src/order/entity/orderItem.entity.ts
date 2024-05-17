import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//BPO - 05/17/2024 - TP - Création d'order Item
@Entity()
export class OrderItem {
  constructor(product: string) {
    this.price = 10;
    this.product = product;
    this.quantity = 1;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  public incrementQuantity() {
    this.quantity += 1;
  }
}