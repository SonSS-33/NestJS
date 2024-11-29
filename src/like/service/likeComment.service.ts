import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CommentLikeEntity } from '../entities/like.comment.entity';
import { CommentService } from 'src/comment/service/comment.service';

@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(CommentLikeEntity)
    private commentLikeRepository: Repository<CommentLikeEntity>,
    private commentService: CommentService,
  ) {}

  async likeComment(userId: number, commentId: number) {
    await this.commentService.getComment(commentId);

    const existingLike = await this.commentLikeRepository.findOne({
      where: {
        commentId,
        userId,
        deletedAt: IsNull(),
      },
    });

    if (existingLike) {
      throw new ConflictException('User has already liked this comment');
    }

    const newLike = new CommentLikeEntity();
    newLike.commentId = commentId;
    newLike.userId = userId;
    newLike.createdBy = userId;
    newLike.createdAt = new Date();
    await this.commentLikeRepository.save(newLike);

    return newLike;
  }

  async unlikeComment(userId: number, commentId: number) {
    await this.commentService.getComment(commentId);

    const like = await this.commentLikeRepository.findOne({
      where: {
        commentId,
        userId,
        deletedAt: IsNull(),
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found for this comment');
    }

    like.deletedAt = new Date();
    like.deletedBy = userId;
    await this.commentLikeRepository.save(like);

    return { message: 'Like removed successfully' };
  }
}
