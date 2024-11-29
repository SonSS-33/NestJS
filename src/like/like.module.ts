import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostLikeEntity } from './entities/like.post.entity';
import { CommentLikeEntity } from './entities/like.comment.entity';
import { PostLikeController } from './controller/likePost.controller';
import { CommentLikeController } from './controller/likeComment.controller';
import { CommentLikeService } from './service/likeComment.service';
import { PostLikeService } from './service/likePost.service';
import { CommentModule } from 'src/comment/comment.module';
import { PostModule } from 'src/post/module/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLikeEntity, CommentLikeEntity]),
    CommentModule,
    PostModule,
  ],
  controllers: [PostLikeController, CommentLikeController],
  providers: [CommentLikeService, PostLikeService],
  exports: [PostLikeService, CommentLikeService],
})
export class LikeModule {}
