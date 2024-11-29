import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentBanService } from './commentBan.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly commentBanService: CommentBanService,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    content: string,
    imageUrl?: string,
  ): Promise<CommentEntity> {
    const isBanned = await this.commentBanService.isUserBanned(userId);
    if (isBanned) {
      throw new ForbiddenException('You are banned from commenting.');
    }

    const newComment = new CommentEntity();
    newComment.userId = userId;
    newComment.postId = postId;
    newComment.content = content;
    newComment.imageUrl = imageUrl || '';
    newComment.createdAt = new Date();
    newComment.createdBy = userId;

    return await this.commentRepository.save(newComment);
  }

  async getComment(commentId: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, deletedAt: IsNull() },
    });

    if (!comment) {
      throw new HttpException('COMMENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  async updateComment(
    commentId: number,
    content: string,
    imageUrl: string | undefined,
    userId: number,
  ): Promise<CommentEntity> {
    const comment = await this.getComment(commentId);

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment',
      );
    }

    comment.content = content;
    if (imageUrl) {
      comment.imageUrl = imageUrl;
    }
    comment.updatedBy = userId;

    return await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, userId: number): Promise<boolean> {
    const comment = await this.getComment(commentId);

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    comment.deletedAt = new Date();
    comment.deletedBy = userId;

    await this.commentRepository.save(comment);
    return true;
  }
}
