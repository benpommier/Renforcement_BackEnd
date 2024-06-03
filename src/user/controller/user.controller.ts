import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { CreateUserService } from '../use-case/create-user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { GetUsersService } from '../use-case/get-users.service';
import { GetOneUserByIdService } from '../use-case/get-one-user-by-id.service';
import { GetUsersByBornCityService } from '../use-case/get-users-by-bornCity.service';
import { UpdateUserService } from '../use-case/update-user.service';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UpdateUserPasswordService } from '../use-case/update-user-password.service';
import { UserUpdatePasswordDto } from '../dto/user-update-password.dto';
import { GetOneUserByUsernameService } from '../use-case/get-one-user-by-username.service';


//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur (Controlleur)
@Controller('users')
export class UserController {
  // injection de dépendance
  // permet d'instancier la classe UserService
  // dans la propriété articleService
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUsersService: GetUsersService,
    private readonly getOneUserByIdService: GetOneUserByIdService,
    private readonly getUsersByBornCityService: GetUsersByBornCityService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly getOneUserByUsernameService: GetOneUserByUsernameService,
    ) {}

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }

  @Get()
  getAllUsers() {
    return this.getUsersService.getAllUsers();
  }

  @Get('/:id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getOneUserByIdService.getOneUserById(id);
  }

  @Get('/by-bornCity/:bornCity')
  getUsersByBornCity(@Param('bornCity') bornCity: string) {
    return this.getUsersByBornCityService.getUsersByBornCity(bornCity);
  }

  @Put('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ) {
    return this.updateUserService.updateUser(id, data);
  }

  @Put('/:id/password')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdatePasswordDto,
  ) {

    console.log(data);
    return this.updateUserPasswordService.updateUserPassword(id, data);
    
  }

  @Get('/by-username/:username')
  getOneUserByUsername(@Param('username') username: string) {
    return this.getOneUserByUsernameService.getOneUserByUsername(username);
  }
}

