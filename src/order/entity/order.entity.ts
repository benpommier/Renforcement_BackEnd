import { IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';
import { OrderItem } from './orderItem.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

//BPO - 05/16/2024 - TP - Creer un nouvel order
@Entity()
export class Order {

    static CartStatus = {
        Cart: 'Cart',
        Paid: 'Paid',
        ShippingSet: 'ShippingSet',
        InvoiceSet: 'InvoiceSet',
    }


    //BPO - 05/17/2024 - TP - Création d'order Item
    constructor(createOrderDto? :{customer: User, product: Product, quantity: number}) {
      if (createOrderDto) {
        this.items = this.createOrderItems(createOrderDto.product, createOrderDto.quantity);
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.customer = createOrderDto.customer;
        this.paidAt = null;
        this.status = Order.CartStatus.Cart;
        this.total = createOrderDto.product.prix * createOrderDto.quantity;
      }
    }

    calculateOrderTotal(order: Order): number {
      return order.items.reduce((total, item) => {
        return total + (item.product.prix * item.quantity);
      }, 0);
    }

    addOrderItem(product: Product, quantity: number){
      const orderItem = this.getOrderItemWithProduct(product);
      if (orderItem) {
        orderItem.incrementQuantityAndPrice(quantity, product.prix * quantity); 
      } else {
        const newOrderItem = new OrderItem({product, quantity});
        this.items.push(newOrderItem);
      }
    }

    private createOrderItems(product: Product, quantity: number): OrderItem[] {
      const orderItemsToCreate = [];
  
      const newOrderItem = new OrderItem({product, quantity});
      console.log("newOrder Item", newOrderItem);
      orderItemsToCreate.push(newOrderItem);
  
      return orderItemsToCreate;
    }
  
    private getOrderItemWithProduct(product: Product): OrderItem {
      return this.items.find((item) => {
        return item.product.id === product.id;
      });
    }

      //BPO - 05/16/2024 - TP - Orienté Objet (payer une order)
        Pay() {    
        this.paidAt = new Date();
        this.updatedAt = new Date();
        this.status = 'payé';
      }

      modifyInvoiceInOrder(orderModifyInvoiceDto: OrderModifyInvoiceDto) {
        this.invoiceAdress = orderModifyInvoiceDto.invoiceAdress;
        this.invoiceAdressSetAt = new Date();
        this.status = Order.CartStatus.InvoiceSet;
        this.updatedAt = new Date();
      }

      modifyShippingInOrder(orderModifyShippingDto: OrderModifyShippingDto) {
        this.shippingAdress = orderModifyShippingDto.shippingAdress;
        this.shippingMethod = orderModifyShippingDto.shippingMethod;
        this.status = Order.CartStatus.ShippingSet;
        this.updatedAt = new Date();
        this.shippingMethodSetAt = new Date();
        if (this.invoiceAdress == null) {
          this.invoiceAdress = this.shippingAdress;
          this.invoiceAdressSetAt = new Date();
        }
      }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' , nullable:true })
  createdAt: Date;

  @Column({ type: 'date' , nullable:true })
  updatedAt: Date;

  @ManyToOne(() => User, customer => customer.orders)
  customer: User;

  // @Column({ type: 'json' })
  // items: string[];

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true})
    items: OrderItem[];

    // Nullable non essentiel car j'ai deja des items dans ma base
  @Column({ type: 'varchar' , nullable:true })
  status: string;

  @Column({ type: 'decimal' , nullable:true  })
  total: number;

  @Column({ type: 'date' , nullable:true })
  paidAt: Date;

  @Column({ type: 'text' , nullable:true })
  shippingAdress: string;

  @Column({ type: 'varchar' , nullable:true })
  shippingMethod: string;

  @Column({ type: 'varchar' , nullable:true })
  invoiceAdress: string;

  @Column({ type: 'date' , nullable:true })
  shippingMethodSetAt: Date;

  @Column({ type: 'date' , nullable:true })
  invoiceAdressSetAt: Date;
}