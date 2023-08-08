import { DeletePostDto, GetAllPostsDto, GetPostDto, GetUserPostsDto, Post, PostsAll, PostsUser, USERS_SERVICE_NAME, UpdatePostDto, UsersServiceClient } from '@nestjs-microservices/shared/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreatePostDto } from '@nestjs-microservices/shared/types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostsService {
  private usersService: UsersServiceClient;

  constructor(
    @Inject('auth') private readonly authClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.usersService = this.authClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  createPost(post: CreatePostDto) {
    return this.usersService.createPost(post);
  }

  deletePost(deletePostDto: DeletePostDto) {
    return this.usersService.deletePost(deletePostDto);
  }

  updatePost(updatePostDto: UpdatePostDto) {
    return this.usersService.updatePost(updatePostDto);
  }

  async getPost(post: GetPostDto) {
    const resGrpc = this.usersService.getPost(post);
    const res: Post = await lastValueFrom(resGrpc);
    return res;
  }

  async getAllPosts() {
    const request: GetAllPostsDto = {
      noArguments: 0
    }
    const resGrpc = this.usersService.getAllPosts(request);
    const res: PostsAll = await lastValueFrom(resGrpc);
    return res;
  }

  async getPosts(getUserPostsDto: GetUserPostsDto) {
    const resGrpc = this.usersService.getUserPosts(getUserPostsDto);
    const res: PostsUser = await lastValueFrom(resGrpc);
    return res;
  }
}
