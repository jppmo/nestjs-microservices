import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthResponse, CreateUserDto, Payload, USERS_SERVICE_NAME, UsersServiceClient, VerifyTokenDto } from '@nestjs-microservices/shared/types'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  // constructor(
  //   @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  // ) {}

  private usersService: UsersServiceClient;

  constructor(
    @Inject('auth') private readonly authClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.usersService = this.authClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  createUser(user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  async signIn(user: CreateUserDto) {
    const resGrpc = this.usersService.signInUser(user);
    const res: AuthResponse = await lastValueFrom(resGrpc);
    return res;

    // return this.usersService.signInUser(user);
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto) {
    const resGrpc = this.usersService.verifyToken(verifyTokenDto);
    const res: Payload = await lastValueFrom(resGrpc);
    return res;
  }

  
}
