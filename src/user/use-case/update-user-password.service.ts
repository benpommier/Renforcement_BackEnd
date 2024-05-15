import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserUpdatePasswordDto } from '../dto/user-update-password.dto';
import { BcryptPasswordHasherService } from '../utils/bcrypt-password-hasher.service';

//BPO - 05/15/2024 - TP - API REST
Injectable();
export class UpdateUserPasswordService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly bcryptPasswordHasherService: BcryptPasswordHasherService
      ) {}
      
      async updateUserPassword(id: number, data: UserUpdatePasswordDto) {
        const user = await this.userRepository.findOneBy({ id });
        data.password = await this.bcryptPasswordHasherService.passwordHasher(data.password);
        const userUpdate = { ...user, ...data };
        // on sauvegarde l'user mis à jour
        await this.userRepository.save(userUpdate);
    
        return userUpdate;
      }
}