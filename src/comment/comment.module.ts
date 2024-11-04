import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentBanEntity } from './entities/commentBan.entity';
import { CommentEntity } from './entities/comment.entity';
import { CommentReplyEntity } from './entities/commentReply.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentBanEntity,
      CommentEntity,
      CommentReplyEntity,
      PostEntity,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
