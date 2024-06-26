import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { BcryptPasswordHasherService } from '../utils/bcrypt-password-hasher.service';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur
Injectable();
export class CreateUserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly bcryptPasswordHasherService: BcryptPasswordHasherService
      ) {}
      
      async createUser(data: UserCreateDto) {
        console.log(data);
        data.password = await this.bcryptPasswordHasherService.passwordHasher(data.password);
        try {
          return this.userRepository.save(data);
        } catch (error) {
          console.log(error);
          throw new Error('Error while creating article');
        }
      }
}