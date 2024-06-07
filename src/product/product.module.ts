import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
// BPO - 05/14/2024 - Séparation du product.service en sous classes pour plus de lisibilité
// import { ProductService } from './service/product.service';
import { GetProductsService } from './use-case/get-products.service';
import { GetOneProductByIdService } from './use-case/get-one-product-by-id.service';
import { DeleteProductService } from './use-case/delete-product.service';
import { CreateProductService } from './use-case/create-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    GetProductsService, 
    GetOneProductByIdService, 
    DeleteProductService, 
    CreateProductService],
})
export class ProductModule {}
