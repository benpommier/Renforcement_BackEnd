import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderCreateDto } from '../dto/order-create.dto';

//BPO - 05/16/2024 - TP - Creer un nouvel order
Injectable();
export class CreateOrderService {

    constructor(

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
      ) {}
      
      async createOrder(data: OrderCreateDto) {
        const order = new Order(data);
        try {
          return this.orderRepository.save(order);
        } catch (error) {
          console.log(error);
          throw new Error('Error while creating order');
        }
      }
}