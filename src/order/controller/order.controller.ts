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
  
//BPO - 05/16/2024 - TP - Creer un nouvel order
@Controller('orders')
  export class OrderController {

    constructor(private readonly createOrderService: CreateOrderService,
     ) {}
  
    @Post()
    createOrder(@Body() data: OrderCreateDto) {
        console.log(data);
      return this.createOrderService.createOrder(data);
    }
}
  