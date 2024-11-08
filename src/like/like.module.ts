import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PostLikeEntity } from './entities/like.post.entity';
import { CommentLikeEntity } from './entities/like.comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostLikeEntity,
      CommentLikeEntity,
      PostEntity,
      CommentEntity,
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
