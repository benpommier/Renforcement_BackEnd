import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { AddToCartService } from './use-case/add-to-cart.service';
import { UpdateOrderByPayingService } from './use-case/update-order-by-paying.service';
import { ModifyShippingInOrderService } from './use-case/modify-shipping-in-order.service';
import { ModifyInvoiceInOrderService } from './use-case/modify-invoice-in-order.service';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';


//BPO - 05/16/2024 - TP - Creer un nouvel order
@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
  controllers: [OrderController],
  providers: [AddToCartService,
    UpdateOrderByPayingService,
    ModifyShippingInOrderService,
    ModifyInvoiceInOrderService
],
})
export class OrderModule {}
