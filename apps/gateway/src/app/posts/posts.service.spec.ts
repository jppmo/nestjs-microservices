import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { createMockServer } from 'grpc-mock';
import { join } from 'path';

const mockServer = createMockServer({
  protoPath: join(__dirname, '/auth-test.proto'),
  packageName: 'auth',
  serviceName: 'UsersService',
  rules: [
    { method: 'GetPost', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'CreateUser', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'FindUser', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'SignInUser', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'VerifyToken', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'CreatePost', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'GetUserPosts', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'DeletePost', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'UpdatePost', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'GetAllPosts', input: { message: "test" }, output: { message: "Hello" } },
    { method: 'DeletePost', input: { message: "test" }, output: { message: "Hello" } },
  ]
})

mockServer.listen("0.0.0.0:50052");

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, {
        provide: 'auth',
        useValue: mockServer
      }],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
