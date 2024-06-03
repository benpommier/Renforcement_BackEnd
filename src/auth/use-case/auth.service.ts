import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GetOneUserByUsernameService } from '../../user/use-case/get-one-user-by-username.service';
import { User } from 'src/user/entity/user.entity';

//BPO - 06/03/2024 - TP - Authentification
Injectable();
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
       
      ) {}
      // private getOneUserByUsernameService: GetOneUserByUsernameService
      async login(username : string, password: string): Promise<{ access_token: string }> {
        console.log(username, password)
        const user = await this.userRepository.findOne({where : {username: username}});
        if (user?.password !== password) {
            throw new UnauthorizedException();
          }
          const payload = { sub: user.id, username: user.username };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
      }
}