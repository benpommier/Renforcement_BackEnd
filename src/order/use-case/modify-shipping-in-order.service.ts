import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';

Injectable();
export class ModifyShippingInOrderService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
      ) {}
      
      async modifyShippingInOrder(id: number, data: OrderModifyShippingDto) {
        const order = await this.orderRepository.findOneBy({ id });
        
        order.modifyShippingInOrder(data);
        await this.orderRepository.save(order);
        
        return order;
      }
}