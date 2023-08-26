import { Controller, Get, Param, Render, Req, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { PostsService } from './posts/posts.service';
import { GetPostDto, GetUserPostsDto } from '@nestjs-microservices/shared/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postsService: PostsService
    ) {}

  @UseGuards(AuthGuard)
  @Get()
  @Render('index')
  index() {
    return this.postsService.getAllPosts();
  }

  @Get('/login')
  @Render('login')
  login() {
    return this.appService.getData();
  }

  @Get('/signup')
  @Render('signup')
  signup() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard)
  @Render('/posts')
  @Get('/posts')
  getPosts(@Req() request) {
    const getUserPostsDto: GetUserPostsDto = {
      userId: request.user.sub
    }
    return this.postsService.getPosts(getUserPostsDto);
  }

  @Render('post/[postId]')
  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    const getPostDto: GetPostDto = {
      postId: parseInt(postId)
    };
    const post = await this.postsService.getPost(getPostDto);
    return {
      post
    }
  }
}
