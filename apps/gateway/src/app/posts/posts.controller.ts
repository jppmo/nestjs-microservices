import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, DeletePostDto, GetPostDto, GetUserPostsDto, UpdatePostDto } from '@nestjs-microservices/shared/types';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createPost(@Body(ValidationPipe) post: CreatePostDto, @Req() request) {
    const createPostDto: CreatePostDto = {
      ...post,
      userId: request.user.sub
    }
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard)
  @Delete()
  deletePost(@Body(ValidationPipe) deletePostDto: DeletePostDto) {
    return this.postsService.deletePost(deletePostDto);
  }

  @UseGuards(AuthGuard)
  @Put()
  updatePost(@Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Get(':postId')
  getPost(@Param() params: GetPostDto) {
    return this.postsService.getPost(params);
  }

}
