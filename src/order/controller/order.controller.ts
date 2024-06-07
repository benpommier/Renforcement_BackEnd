import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
  import { AddToCartService } from '../use-case/add-to-cart.service';
  import { OrderCreateDto } from '../dto/order-create.dto';
import { UpdateOrderByPayingService } from '../use-case/update-order-by-paying.service';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';
import { ModifyShippingInOrderService } from '../use-case/modify-shipping-in-order.service';
import { ModifyInvoiceInOrderService } from '../use-case/modify-invoice-in-order.service';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';
import { AuthGuard } from 'src/auth/utils/auth.guard';
import { CurrentUser } from 'src/auth/utils/user.decorator';
  
//BPO - 05/16/2024 - TP - Creer un nouvel order
@Controller('orders')
  export class OrderController {

    constructor(private readonly addToCartService: AddToCartService,
        private readonly updateOrderByPayingService: UpdateOrderByPayingService,
        private readonly modifyShippingInOrderService: ModifyShippingInOrderService,
        private readonly modifyInvoiceInOrderService: ModifyInvoiceInOrderService
     ) {}
  
    @UseGuards(AuthGuard)
    @Post()
    createOrder(@Body() data: OrderCreateDto, @CurrentUser() currentUserId: number) {
      return this.addToCartService.createOrder(data, currentUserId);
    }

    //BPO - 05/16/2024 - TP - Orienté Objet (payer une order)
    @UseGuards(AuthGuard)
    @Put('/:id/pay-order')
    updateOrderByPaying(
    @Param('id', ParseIntPipe) id: number,
  ) {

    return this.updateOrderByPayingService.updateOrderByPaying(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/modify-shipping')
  modifyShippingInOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderModifyShippingDto,
  ) {

    return this.modifyShippingInOrderService.modifyShippingInOrder(id, data);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/modify-invoice')
  modifyInvoiceInOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderModifyInvoiceDto,
  ) {
    return this.modifyInvoiceInOrderService.modifyInvoiceInOrder(id, data);
  }
}
  