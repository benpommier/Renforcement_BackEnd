import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

//BPO - 06/03/2024 - TP - Besoin de trouver un user par son username
Injectable();
export class GetOneUserByUsernameService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
    async getOneUserByUsername(username: string) {
        return await this.userRepository.findOneBy({ username });
      }
}