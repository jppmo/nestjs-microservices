import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@nestjs-microservices/shared/types';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async save(user: CreateUserDto) {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;

    return await this.usersRepository.save(newUser);
  }
  
  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

}
