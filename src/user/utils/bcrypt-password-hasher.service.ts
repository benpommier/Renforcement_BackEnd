import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherServiceInterface } from './password-hasher.service.interface';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur (hash du MDP)
Injectable();
export class BcryptPasswordHasherService implements PasswordHasherServiceInterface {

    constructor() {}
      
    async passwordHasher(password: string):Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}