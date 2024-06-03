import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GetOneUserByUsernameService } from '../../user/use-case/get-one-user-by-username.service';
import { User } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

//BPO - 06/03/2024 - TP - Authentification
Injectable();
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
        ) {}

      async compare(password1: string, password2){
        return bcrypt.compare(password1,password2);
      }

      async login(username : string, password: string): Promise<{ access_token: string }> {
        
        const user = await this.userRepository.findOne({where : {username: username}});
        const isSameThing = await this.compare(password, user?.password);

        if (!isSameThing) {
            throw new UnauthorizedException();
          }
          const payload = { sub: user.id, username: user.username };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
      }
}