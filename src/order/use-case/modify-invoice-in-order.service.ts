import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';

Injectable();
export class ModifyInvoiceInOrderService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
      ) {}
      
      async modifyInvoiceInOrder(id: number, data: OrderModifyInvoiceDto) {
        const order = await this.orderRepository.findOneBy({ id });
        
        order.modifyInvoiceInOrder(data);
        await this.orderRepository.save(order);
        
        return order;
      }
}