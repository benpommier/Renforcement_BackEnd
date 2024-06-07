import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

Injectable();
export class GetOneProductByIdService {

    constructor(

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
      async getOneProductById(id: number) {
        return await this.productRepository.findOneBy({ id });
      }
}