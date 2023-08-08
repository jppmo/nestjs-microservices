import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersServiceController, CreateUserDto, FindUserDto, UsersServiceControllerMethods, User, AuthUser, SignInUserDto, Payload, VerifyTokenDto, AuthResponse, CreatePostDto, Post, GetPostDto, GetUserPostsDto, PostsUser, DeletePostDto, UpdatePostDto, PostsAll } from '@nestjs-microservices/shared/types';
import { Observable } from 'rxjs';


@Controller()
@UsersServiceControllerMethods()
export class AppController implements UsersServiceController {
  constructor(private readonly appService: AppService) {}

  async getAllPosts(): Promise<PostsAll> {
    const posts = await this.appService.getAllPosts();
    return { posts };
  }

  async deletePost(request: DeletePostDto): Promise<Post> {
    return await this.appService.deletePost(request);
  }

  async updatePost(request: UpdatePostDto): Promise<Post> {
    return await this.appService.updatePost(request);
  }

  async getUserPosts(request: GetUserPostsDto): Promise<PostsUser> {
    const posts: Post[] = await this.appService.getPosts(request);
    
    return { posts };
  }

  async getPost(request: GetPostDto): Promise<Post> {
    return await this.appService.getPost(request);
  }

  async createPost(request: CreatePostDto): Promise<Post> {
    return await this.appService.createPost(request);
  }

  async verifyToken(request: VerifyTokenDto): Promise<Payload> {
    return await this.appService.verifyToken(request);
  }

  async createUser(request: CreateUserDto): Promise<User> {
    return await this.appService.createUser(request);
  }
  
  async signInUser(request: SignInUserDto): Promise<AuthResponse> {
    return await this.appService.signIn(request);
  }
  
  async findUser(request: FindUserDto): Promise<User> {
    const user = await this.appService.getUser(request.id);
    return user;
  }

}
