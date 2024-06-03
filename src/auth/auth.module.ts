import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './use-case/auth.service';
import { AuthController } from './controller/auth.controller';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


//BPO - 06/03/2024 - TP - Authentification
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),

],
  controllers: [AuthController],
  providers: [
    AuthService,
]
})
export class AuthModule {}
