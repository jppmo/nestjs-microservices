import { Injectable } from '@nestjs/common';
import { AuthUser, CreateUserDto, Payload, SignInUserDto, VerifyTokenDto } from '@nestjs-microservices/shared/types';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    data.password = hash;
    return await this.usersService.save(data);
  }

  async signIn(data: SignInUserDto): Promise<AuthUser> {
    try {
      const authUser: AuthUser = {
        id: 0,
        token: "",
      }
  
      const user: User = await this.usersService.findOneByEmail(data.email);
      const isMatch = await bcrypt.compare(data.password, user.password);
  
      if(!isMatch) {
        // TODO error response
        throw authUser;
      }

      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      
      authUser.id = user.id;
      authUser.token = access_token;

      return authUser;

    } catch (error) {
      return error;
    }
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto): Promise<Payload> {
    try {
      console.log("VERIFYING TOKEN:");
      
      const payload = await this.jwtService.verifyAsync(
        verifyTokenDto.token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      
      return payload;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    
    console.log(user);
    console.log(user.id, user.email, user.password);
    
    return user;
  }
}
