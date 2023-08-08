import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DeletePostDto, Post as PostResponse, UpdatePostDto } from '@nestjs-microservices/shared/types';
import { Repository } from 'typeorm';
import { CreatePostDto } from '@nestjs-microservices/shared/types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  async create(post: CreatePostDto, user: User) {
    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.user = user;

    return await this.postsRepository.save(newPost);
  }

  async delete(post: Post): Promise<Post> {
    return await this.postsRepository.remove(post);
  }

  async update(post: Post): Promise<Post> {
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[] | null> {
    return await this.postsRepository.find({
      relations: { user: true },
    });
  }

  async findOne(id: number): Promise<Post | null> {
    return await this.postsRepository.findOneBy({ id });
  }

  async findOneWithUser(id: number): Promise<PostResponse> {

    const post = await this.postsRepository.find({
      relations: { user: true },
      where: {
        id,
      },
    });
    
    return post[0];
  }

  async findAllUser(user: User): Promise<Post[]> {

    const posts = await this.postsRepository.find({
      relations: { user: true },
      where: {
        user,
      },
    });

    return posts;
  }
}
