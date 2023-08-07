import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto, Payload, USERS_SERVICE_NAME, UsersServiceClient, VerifyTokenDto } from '@nestjs-microservices/shared/types'
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
    console.log("oi");
    
    return this.usersService.createUser(user);
  }

  signIn(user: CreateUserDto) {
    console.log(user);

    return this.usersService.signInUser(user);
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto) {
    const resGrpc = this.usersService.verifyToken(verifyTokenDto);
    const res: Payload = await lastValueFrom(resGrpc);
    return res;
  }
  // verify token
  // grpc call to auth verify token return jwt payload


  // createUser(user: CreateUserDto) {
  //   this.authClient.emit('create-user', JSON.stringify(user));
  // }

  // signIn(user: CreateUserDto) {
  //   console.log(user);
    
  //   const send = this.authClient.send('sign-in', JSON.stringify({ ...user }));
  //   const res = send.subscribe((response) => {
  //     console.log(user);
  //     //return user;
  //   });
  //   //return res;
  // }

  
}
