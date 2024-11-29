import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentBanEntity } from './entities/commentBan.entity';
import { CommentEntity } from './entities/comment.entity';
import { CommentReplyEntity } from './entities/commentReply.entity';
import { CommentBanService } from './service/commentBan.service';
import { CommentBanController } from './controller/commentBan.controller';
import { CommentReplyService } from './service/commentReply.service';
import { CommentReplyController } from './controller/commentReply.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentBanEntity,
      CommentEntity,
      CommentReplyEntity,
    ]),
  ],
  controllers: [
    CommentController,
    CommentBanController,
    CommentReplyController,
  ],
  providers: [CommentService, CommentBanService, CommentReplyService],
  exports: [CommentService],
})
export class CommentModule {}
