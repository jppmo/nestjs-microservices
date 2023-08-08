import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@nestjs-microservices/shared/types';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) user: CreateUserDto, @Res({ passthrough: true }) response: Response) {

    const res = await this.authService.signIn(user);
    if(res.authUser) {
      response.cookie('token', res.authUser.token);
    }
    
    return this.authService.signIn(user);
  }
}
