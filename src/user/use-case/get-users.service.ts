import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

//BPO - 05/15/2024 - TP - API REST
Injectable();
export class GetUsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
      async getAllUsers() {
        return await this.userRepository.find();
      }
}