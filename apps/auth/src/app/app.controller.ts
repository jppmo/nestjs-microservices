import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersServiceController, CreateUserDto, FindUserDto, UsersServiceControllerMethods, User, AuthUser, SignInUserDto, Payload, VerifyTokenDto } from '@nestjs-microservices/shared/types';


@Controller()
@UsersServiceControllerMethods()
export class AppController implements UsersServiceController {
  constructor(private readonly appService: AppService) {}

  async verifyToken(request: VerifyTokenDto): Promise<Payload> {
    return await this.appService.verifyToken(request);
  }

  async createUser(request: CreateUserDto): Promise<User> {
    return await this.appService.createUser(request);
  }
  
  async signInUser(request: SignInUserDto): Promise<AuthUser> {
    return await this.appService.signIn(request);
  }
  
  async findUser(request: FindUserDto): Promise<User> {
    const user = await this.appService.getUser(request.id);
    return user;
  }




  // @EventPattern('create-user')
  // async handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
  //   await this.appService.createUser(data);
  // }

  // @MessagePattern('sign-in')
  // async handleSignIn(@Payload(ValidationPipe) data: CreateUserDto) {
  //   console.log("auth signing in user...");
  //   const user = await this.appService.signIn(data);
  //   return user;
  // }

}
