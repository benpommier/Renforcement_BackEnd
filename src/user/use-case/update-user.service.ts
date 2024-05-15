import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';

//BPO - 05/15/2024 - TP - API REST
Injectable();
export class UpdateUserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
      async updateUser(id: number, data: UserUpdateDto) {
        // on récupère l'user ciblé
        const user = await this.userRepository.findOneBy({ id });
        // on "merge" les données du body de la requête
        // avec les données déjà présentes dans l'user
        const userUpdate = { ...user, ...data };
        // on sauvegarde l'user mis à jour
        await this.userRepository.save(userUpdate);
    
        return userUpdate;
      }
}