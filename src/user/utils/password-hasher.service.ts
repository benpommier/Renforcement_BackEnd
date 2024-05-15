import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur (hash du MDP)
Injectable();
export class PasswordHasherService {

    constructor() {}
      
    async passwordHasher(password: string){
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}