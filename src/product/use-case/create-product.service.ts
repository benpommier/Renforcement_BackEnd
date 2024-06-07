import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductCreateDto } from '../dto/product-create.dto';

Injectable();
export class CreateProductService {

    constructor(

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
      
      async createProduct(data: ProductCreateDto) {
        try {
          return this.productRepository.save(data);
        } catch (error) {
          console.log(error);
          throw new Error('Error while creating product');
        }
      }
}