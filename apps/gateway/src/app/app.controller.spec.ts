import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { ClientGrpc, ClientGrpcProxy, ClientsModule} from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { UsersServiceClient } from '@nestjs-microservices/shared/types';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let postsService: PostsService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PostsService, AuthService, {
        provide: 'auth',
        useValue: ClientsModule
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
    postsService = app.get<PostsService>(PostsService);
  });

  

  it('should be defined', () => {
    expect(appController).toBeDefined();
});

});
