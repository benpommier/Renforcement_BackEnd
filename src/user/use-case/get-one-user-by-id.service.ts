import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

//BPO - 05/15/2024 - TP - API REST
Injectable();
export class GetOneUserByIdService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
    async getOneUserById(id: number) {
        return await this.userRepository.findOneBy({ id });
      }
}