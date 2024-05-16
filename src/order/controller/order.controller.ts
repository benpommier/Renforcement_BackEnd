import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
  import { CreateOrderService } from '../use-case/create-order.service';
  import { OrderCreateDto } from '../dto/order-create.dto';
import { UpdateOrderByPayingService } from '../use-case/update-order-by-paying.service';
  
//BPO - 05/16/2024 - TP - Creer un nouvel order
@Controller('orders')
  export class OrderController {

    constructor(private readonly createOrderService: CreateOrderService,
        private readonly updateOrderByPayingService: UpdateOrderByPayingService
     ) {}
  
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
}
  