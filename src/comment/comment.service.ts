import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UpdateCommentBodyDto } from './dtos/comment.dto';
import { CommentReplyEntity } from './entities/commentReply.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentBanEntity } from './entities/commentBan.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CommentReplyEntity)
    private readonly commentReplyRepository: Repository<CommentReplyEntity>,
    @InjectRepository(CommentBanEntity)
    private readonly commentBanRepository: Repository<CommentBanEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    content: string,
    imageUrl?: string,
  ): Promise<CommentEntity> {
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: IsNull() },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found or has been deleted');
    }

    // Kiểm tra xem người dùng có phải là chủ sở hữu bài viết không
    if (post.user.id === userId) {
      // Nếu người dùng là chủ sở hữu bài viết, không có giới hạn bình luận
      const newComment = this.commentRepository.create({
        user: { id: userId },
        post: { id: postId },
        content,
        imageUrl,
        createdAt: new Date(),
        createdBy: userId,
      });

      return await this.commentRepository.save(newComment);
    }

    // Kiểm tra xem người dùng có bị ban bình luận trên bài viết này không
    const banRecord = await this.commentBanRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
        bannedUntil: MoreThan(new Date()),
        deletedAt: IsNull(),
      },
    });

    if (banRecord) {
      throw new ForbiddenException(
        'You are banned from commenting on this post',
      );
    }

    // Nếu không phải là chủ bài viết và không bị cấm, cho phép bình luận
    const newComment = this.commentRepository.create({
      user: { id: userId },
      post: { id: postId },
      content,
      imageUrl,
      createdAt: new Date(),
      createdBy: userId,
    });

    return await this.commentRepository.save(newComment);
  }

  async getComment(commentId: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({
      where: { id: commentId, deletedAt: IsNull() },
      relations: ['user'],
    });
  }

  async updateComment(
    commentId: number,
    content: string,
    imageUrl: string | undefined,
    userId: number,
  ): Promise<UpdateCommentBodyDto> {
    const comment = await this.getComment(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You can only update your own comment');
    }
    await this.commentRepository.update(commentId, {
      content,
      imageUrl,
      updatedAt: new Date(),
      updatedBy: userId,
    });

    return await this.getComment(commentId);
  }

  async deleteComment(commentId: number, userId: number): Promise<boolean> {
    const comment = await this.getComment(commentId);
    if (!comment) throw new NotFoundException('Comment not found');

    if (!comment || comment.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own comment');
    }
    await this.commentRepository.update(commentId, {
      deletedAt: new Date(),
      deletedBy: userId,
    });

    return true;
  }

  // Comment Reply
  async createCommentReply(
    userId: number,
    commentId: number,
    content: string,
  ): Promise<CommentReplyEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, deletedAt: IsNull() },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    const newReply = this.commentReplyRepository.create({
      comment,
      content,
      createdAt: new Date(),
      createdBy: userId,
      user: { id: userId },
    });
    return await this.commentReplyRepository.save(newReply);
  }

  async getCommentReply(replyId: number): Promise<CommentReplyEntity> {
    return await this.commentReplyRepository.findOne({
      where: { id: replyId },
      relations: ['user', 'comment'],
    });
  }

  async updateCommentReply(
    replyId: number,
    content: string,
    userId: number,
  ): Promise<CommentReplyEntity> {
    const reply = await this.getCommentReply(replyId);
    if (!reply) throw new NotFoundException('Comment reply not found');

    if (!reply.user) {
      throw new NotFoundException('User not found for this reply');
    }

    if (reply.user.id !== userId) {
      throw new ForbiddenException('You can only update your own reply');
    }

    await this.commentReplyRepository.update(replyId, {
      content,
      updatedAt: new Date(),
      updatedBy: userId,
    });

    return await this.getCommentReply(replyId);
  }

  async deleteCommentReply(replyId: number, userId: number): Promise<boolean> {
    const reply = await this.getCommentReply(replyId);
    if (!reply) throw new NotFoundException('Comment reply not found');

    await this.commentReplyRepository.update(replyId, {
      deletedAt: new Date(),
      deletedBy: userId,
    });

    return true;
  }

  //Comment
  async createCommentBan(
    userId: number,
    bannedUntil: Date,
    reason: string,
    createdBy: number,
  ): Promise<CommentBanEntity> {
    const newCommentBan = this.commentBanRepository.create({
      user: { id: userId },
      bannedUntil,
      reason,
      createdAt: new Date(),
      createdBy,
    });
    return await this.commentBanRepository.save(newCommentBan);
  }

  async getCommentBan(commentBanId: number): Promise<CommentBanEntity> {
    return await this.commentBanRepository.findOne({
      where: { id: commentBanId, deletedAt: IsNull() },
      relations: ['user'],
    });
  }

  async updateCommentBan(
    commentBanId: number,
    bannedUntil: Date,
    reason?: string,
    updatedBy?: number,
  ): Promise<CommentBanEntity> {
    const commentBan = await this.getCommentBan(commentBanId);
    if (!commentBan) {
      throw new NotFoundException('Comment ban not found');
    }

    await this.commentBanRepository.update(commentBanId, {
      bannedUntil,
      reason: reason ?? commentBan.reason,
      updatedAt: new Date(),
      updatedBy,
    });

    return await this.getCommentBan(commentBanId);
  }

  async deleteCommentBan(
    commentBanId: number,
    deletedBy: number,
  ): Promise<boolean> {
    const commentBan = await this.getCommentBan(commentBanId);
    if (!commentBan) throw new NotFoundException('Comment ban not found');

    await this.commentBanRepository.update(commentBanId, {
      deletedAt: new Date(),
      deletedBy,
    });

    return true;
  }
}
