import { Injectable } from '@nestjs/common';
import { AuthResponse, AuthUser, CreatePostDto, CreateUserDto, DeletePostDto, GetPostDto, GetUserPostsDto, Payload, SignInUserDto, UpdatePostDto, VerifyTokenDto } from '@nestjs-microservices/shared/types';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from './posts/posts.service';
import { Post } from './posts/entities/post.entity';
import { Post as PostResponse } from '@nestjs-microservices/shared/types';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private jwtService: JwtService
    ) {}

  
  async getPost(getPostDto: GetPostDto): Promise<PostResponse> {
    const post = await this.postsService.findOneWithUser(getPostDto.postId);
    return post;
  }

  async getPosts(getPostsDto: GetUserPostsDto): Promise<Post[]> {
    const user = await this.getUser(getPostsDto.userId);
    const post = await this.postsService.findAllUser(user);
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postsService.findAll();
    return posts;
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const user = await this.getUser(post.userId);
    return await this.postsService.create(post, user);
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<Post> {
    const post = await this.getPostId(deletePostDto.postId);
    return await this.postsService.delete(post);
  }

  async updatePost(updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostId(updatePostDto.post.id);
    
    post.title = updatePostDto.post.title;
    post.content = updatePostDto.post.content;
    return await this.postsService.update(post);
  }
    
  async createUser(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    data.password = hash;
    return await this.usersService.save(data);
  }

  async signIn(data: SignInUserDto): Promise<AuthResponse> {
    try {
      const authUser: AuthResponse = {
        authUser: {
          id: 0,
          token: ''
        }
      }
  
      const user: User = await this.usersService.findOneByEmail(data.email);
      
      if(!user) {
        const errorResponse: AuthResponse = {
          error: {
            code: 404,
            message: 'User not found'
          }
        }
        throw errorResponse;
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
  
      if(!isMatch) {
        const errorResponse: AuthResponse = {
          error: {
            code: 401,
            message: 'Wrong password'
          }
        }
        throw errorResponse;
      }

      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      
      authUser.authUser.id = user.id;
      authUser.authUser.token = access_token;

      return authUser;

    } catch (error) {
      return error;
    }
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto): Promise<Payload> {
    try {
      
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
    
    return user;
  }

  async getPostId(id: number): Promise<Post> {
    const post = await this.postsService.findOne(id);
    
    return post;
  }
}
