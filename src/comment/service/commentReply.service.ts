import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentReplyEntity } from '../entities/commentReply.entity';

import { IsNull } from 'typeorm';
import { CommentService } from './comment.service';

@Injectable()
export class CommentReplyService {
  constructor(
    @InjectRepository(CommentReplyEntity)
    private readonly commentReplyRepository: Repository<CommentReplyEntity>,
    private readonly commentService: CommentService,
  ) {}

  async createCommentReply(
    userId: number,
    commentId: number,
    content: string,
  ): Promise<CommentReplyEntity> {
    await this.commentService.getComment(commentId);

    const newReply = new CommentReplyEntity();
    newReply.userId = userId;
    newReply.commentId = commentId;
    newReply.content = content;
    newReply.createdAt = new Date();
    newReply.createdBy = userId;

    return await this.commentReplyRepository.save(newReply);
  }

  async getCommentReply(replyId: number): Promise<CommentReplyEntity> {
    const reply = await this.commentReplyRepository.findOne({
      where: { id: replyId, deletedAt: IsNull() },
    });

    if (!reply) {
      throw new HttpException('COMMENT_REPLY_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return reply;
  }

  async updateCommentReply(
    replyId: number,
    content: string,
    userId: number,
  ): Promise<CommentReplyEntity> {
    const reply = await this.getCommentReply(replyId);

    if (reply.userId !== userId) {
      throw new ForbiddenException('You can only update your own reply');
    }

    reply.content = content;
    reply.updatedAt = new Date();
    reply.updatedBy = userId;

    return await this.commentReplyRepository.save(reply);
  }

  async deleteCommentReply(replyId: number, userId: number): Promise<boolean> {
    const reply = await this.getCommentReply(replyId);

    if (reply.userId !== userId) {
      throw new ForbiddenException('You can only delete your own reply');
    }

    await this.commentReplyRepository.update(replyId, {
      deletedAt: new Date(),
      deletedBy: userId,
    });

    return true;
  }
}
