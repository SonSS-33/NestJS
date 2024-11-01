import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostImageEntity } from './entities/post.img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostImageEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
