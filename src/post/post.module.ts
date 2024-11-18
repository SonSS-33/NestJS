import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
//import { PostImageEntity } from '../post-img/entities/post.img.entity';
import { PostImageModule } from 'src/post-img/post-img.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), PostImageModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
