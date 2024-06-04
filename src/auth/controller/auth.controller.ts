import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';

import { AuthService } from '../use-case/auth.service';
import { AuthGuard } from '../utils/auth.guard';

  
//BPO - 06/03/2024 - TP - Authentification
@Controller('auth')
  export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}
  
    @Post('/login')
    login(@Body() authDto: Record<string, any>) {
      return this.authService.login(authDto.username, authDto.password);
    }
}
  