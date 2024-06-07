import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;
  
  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' , nullable:true})
  age: number;

  @Column({ type: 'varchar' , nullable:true})
  bornCity: string;

  @OneToMany(() => Order, order => order.customer, { nullable: true, cascade: true })
  orders: Order[];
}