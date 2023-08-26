import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { AuthService } from '../auth/auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [AuthService, PostsService, {
        provide: 'auth',
        useValue: ClientsModule
      }]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
