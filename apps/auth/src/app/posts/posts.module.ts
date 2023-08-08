import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
