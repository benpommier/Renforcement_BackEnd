import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';

//BPO - 05/16/2024 - TP - Creer un nouvel order
@Entity()
export class Order {
    constructor(orderCreateDto?: OrderCreateDto) {
        if (orderCreateDto) {
          if (orderCreateDto.items.length > 3) {
            throw new Error('Vous ne pouvez pas avoir plus de 3 produits dans votre commande');
          }
          this.createdAt = new Date();
          this.updatedAt = new Date();
          this.customer = orderCreateDto.customer;
          this.items = orderCreateDto.items;
          this.status = 'En cours';
          this.total = 10 * orderCreateDto.items.length;
        }
      }
      
      //BPO - 05/16/2024 - TP - Orienté Objet (payer une order)
        Pay() {
        // on récupère l'article ciblé
    
        this.paidAt = new Date();
        this.updatedAt = new Date();
        this.status = 'payé';
      }

      ModifyInvoiceInOrder(orderModifyInvoiceDto: OrderModifyInvoiceDto) {
        this.invoiceAdress = orderModifyInvoiceDto.invoiceAdress;
        this.invoiceAdressSetAt = new Date();
        this.status = 'En cours - Adresse de facturation validée';
        this.updatedAt = new Date();
      }

      ModifyShippingInOrder(orderModifyShippingDto: OrderModifyShippingDto) {
        this.shippingAdress = orderModifyShippingDto.shippingAdress;
        this.shippingMethod = orderModifyShippingDto.shippingMethod;
        this.status = 'En cours - En attente de livraison';
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

  @Column({ type: 'json' })
  items: string[];
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