import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderCreateDto } from '../dto/order-create.dto';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

//BPO - 05/16/2024 - TP - Creer un nouvel order
Injectable();
export class AddToCartService {

    constructor(

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
      modifyOrder(order: Order, product: Product, data: OrderCreateDto) {

        order.addOrderItem(product, data.quantity);
        order.total = order.calculateOrderTotal(order);
        try {
          console.log(order);
          return this.orderRepository.save(order);
        } catch (error) {
          console.log(error);
          throw new Error('Error while creating order');
        }
      }


      
      async createOrder(data: OrderCreateDto, currentUserId: number) {
        const product = await this.productRepository.findOneBy({ id: data.productId});
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');

        if (!product) {
          throw new Error('Product not found');
        }
        console.log('user', currentUserId)
        if (!currentUserId) {
          currentUserId = 25;
        }
        let order;
        order = await this.findOrderWithCartStatusAndCustomer(currentUserId);

        let customer;
        try {
          customer = await this.userRepository.findOneBy({ id: currentUserId });
          if (!customer) {
            throw new Error('Customer not found');
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          throw new Error('Error fetching customer');
        }

        if (order) {
          this.modifyOrder(order, product, data);

        } else {
          order = new Order({customer, product, quantity: data.quantity});
          try {
            return this.orderRepository.save(order);
          } catch (error) {
            throw new Error('Error while creating order');
          }
        }
      }

            // J'avais des problèmes avec le findOneBy et mes clauses where, le customer.id ne fonctionnait pas 
      private async findOrderWithCartStatusAndCustomer(currentUserId: number) {
        try {
          const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .leftJoinAndSelect('order.customer', 'customer')
            .where('order.status = :status', { status: 'Cart' })
            .andWhere('customer.id = :customerId', { customerId: currentUserId })
            .getOne();
      
          return order;
        } catch (error) {
          console.error('Error fetching order:', error);
          throw new Error('Error fetching order');
        }
      }
}