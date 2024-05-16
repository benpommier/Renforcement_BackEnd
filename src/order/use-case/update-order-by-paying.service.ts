import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

//BPO - 05/16/2024 - TP - Orienté Objet (payer une order)
Injectable();
export class UpdateOrderByPayingService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
      ) {}
      
      async updateOrderByPaying(id: number) {
        const order = await this.orderRepository.findOneBy({ id });

        order.Pay();
        await this.orderRepository.save(order);
    
        return order;
      }
}