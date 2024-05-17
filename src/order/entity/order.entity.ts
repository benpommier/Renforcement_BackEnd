import { IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';
import { OrderItem } from './orderItem.entity';

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
    constructor(orderCreateDto?: OrderCreateDto) {
      if (orderCreateDto) {
        if (orderCreateDto.items.length > 3) {
          throw new Error("trop d'items");
        }
  
        this.items = this.createOrderItems(orderCreateDto);
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.customer = 'tetetete';
        this.paidAt = null;
        this.status = Order.CartStatus.Cart;
        this.total = 10 * orderCreateDto.items.length;
      }
    }
  
    private createOrderItems(orderCreateDto: OrderCreateDto): OrderItem[] {
      const orderItemsToCreate = [];
  
      orderCreateDto.items.map((product) => {
        const existingOrderItem = this.getOrderItemWithProduct(product);
        if (existingOrderItem) {
          existingOrderItem.incrementQuantity();
        } else {
          const newOrderItem = new OrderItem(product);
          orderItemsToCreate.push(newOrderItem);
        }
      });
  
      return orderItemsToCreate;
    }
  
    private getOrderItemWithProduct(product: string): OrderItem {
      return this.items.find((item) => {
        return item.product === product;
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

  @Column({ type: 'varchar' })
  customer: string;

  // @Column({ type: 'json' })
  // items: string[];

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true})
    items: OrderItem[];

    // Nullable non essentiel car j'ai deja des items dans ma base
  @Column({ type: 'varchar' , nullable:true })
  status: string;

  @Column({ type: 'int' , nullable:true  })
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