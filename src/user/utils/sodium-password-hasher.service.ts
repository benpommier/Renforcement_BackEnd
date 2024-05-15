import { Injectable } from '@nestjs/common';
import { PasswordHasherServiceInterface } from './password-hasher.service.interface';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur (hash du MDP)
Injectable();
export class SodiumPasswordHasherService implements PasswordHasherServiceInterface {

    constructor() {}
      
    async passwordHasher(password: string):Promise<string> {
        return await password;
    }
}