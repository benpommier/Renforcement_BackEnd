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
  import { CreateOrderService } from '../use-case/create-order.service';
  import { OrderCreateDto } from '../dto/order-create.dto';
import { UpdateOrderByPayingService } from '../use-case/update-order-by-paying.service';
import { OrderModifyShippingDto } from '../dto/order-modify-shipping.dto';
import { ModifyShippingInOrderService } from '../use-case/modify-shipping-in-order.service';
import { ModifyInvoiceInOrderService } from '../use-case/modify-invoice-in-order.service';
import { OrderModifyInvoiceDto } from '../dto/order-modify-invoice.dto';
import { AuthGuard } from 'src/auth/utils/auth.guard';
  
//BPO - 05/16/2024 - TP - Creer un nouvel order
@Controller('orders')
  export class OrderController {

    constructor(private readonly createOrderService: CreateOrderService,
        private readonly updateOrderByPayingService: UpdateOrderByPayingService,
        private readonly modifyShippingInOrderService: ModifyShippingInOrderService,
        private readonly modifyInvoiceInOrderService: ModifyInvoiceInOrderService
     ) {}
  
    @UseGuards(AuthGuard)
    
    @Post()
    createOrder(@Body() data: OrderCreateDto) {
        console.log(data);
      return this.createOrderService.createOrder(data);
    }

    //BPO - 05/16/2024 - TP - Orienté Objet (payer une order)
    @Put('/:id/pay-order')
    updateOrderByPaying(
    @Param('id', ParseIntPipe) id: number,
  ) {

    return this.updateOrderByPayingService.updateOrderByPaying(id);
  }

  @Put('/:id/modify-shipping')
  modifyShippingInOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderModifyShippingDto,
  ) {

    return this.modifyShippingInOrderService.modifyShippingInOrder(id, data);
  }

  @Put('/:id/modify-invoice')
  modifyInvoiceInOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderModifyInvoiceDto,
  ) {

    return this.modifyInvoiceInOrderService.modifyInvoiceInOrder(id, data);
  }
}
  