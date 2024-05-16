import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { UpdateOrderByPayingService } from './use-case/update-order-by-paying.service';

//BPO - 05/16/2024 - TP - Creer un nouvel order
@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [CreateOrderService,
    UpdateOrderByPayingService],
})
export class OrderModule {}
