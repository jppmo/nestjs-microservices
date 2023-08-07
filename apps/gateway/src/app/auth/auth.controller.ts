import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@nestjs-microservices/shared/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @Post('sign-in')
  signIn(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.signIn(user);
  }
}
