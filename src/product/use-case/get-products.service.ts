import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

Injectable();
export class GetProductsService {

    constructor(

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
      
      async getAllproducts() {
        return await this.productRepository.find();
      }
}