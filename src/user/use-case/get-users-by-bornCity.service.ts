import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

//BPO - 05/15/2024 - TP - API REST
Injectable();
export class GetUsersByBornCityService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
    // BPO - 05/14/2024 - Recherche des articles par auteur
    async getUsersByBornCity(bornCity: string) {
        return await this.userRepository.findBy({'bornCity': bornCity } );
    }
}