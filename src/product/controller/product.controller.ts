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

import { GetProductsService } from '../use-case/get-products.service';
import { GetOneProductByIdService } from '../use-case/get-one-product-by-id.service';
import { DeleteProductService } from '../use-case/delete-product.service';
import { CreateProductService } from '../use-case/create-product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { AuthGuard } from 'src/auth/utils/auth.guard';


@Controller('products')
export class ProductController {

  constructor(private readonly getProductsService: GetProductsService,
    private readonly getOneProductByIdService: GetOneProductByIdService,
    private readonly deleteProductService: DeleteProductService,
    private readonly createProductService: CreateProductService
    ) {}
    
  @UseGuards(AuthGuard)
  @Get()
  getAllProducts() {
    return this.getProductsService.getAllproducts();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOneProductById(@Param('id', ParseIntPipe) id: number) {
    return this.getOneProductByIdService.getOneProductById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() data: ProductCreateDto) {
    return this.createProductService.createProduct(data);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProductService.deleteProduct(id);
  }
}
