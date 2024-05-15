import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './use-case/create-user.service';
import { BcryptPasswordHasherService } from './utils/bcrypt-password-hasher.service';
import { SodiumPasswordHasherService } from './utils/sodium-password-hasher.service';
import { PasswordHasherServiceInterface } from './utils/password-hasher.service.interface';


//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur (module)
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
        provide: CreateUserService,
        useFactory: (passwordHasherService: PasswordHasherServiceInterface) => {
          return new CreateUserService(passwordHasherService);
        },
        inject: [SodiumPasswordHasherService],
      },
]
})
export class UserModule {}
