import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { CommentReplyEntity } from './entities/commentReply.entity';
import { CommentBanEntity } from './entities/commentBan.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentBanBodyDto,
  CreateCommentReplyBodyDto,
  UpdateCommentBanBodyDto,
  UpdateCommentBodyDto,
  UpdateCommentReplyBodyDto,
} from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CommentReplyEntity)
    private readonly commentReplyRepository: Repository<CommentReplyEntity>,
    @InjectRepository(CommentBanEntity)
    private readonly commentBanRepository: Repository<CommentBanEntity>,
  ) {}

  async findAllComments(postId: number): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });
  }

  async createComment(
    userId: number,
    content: string,
    postId: number,
  ): Promise<CommentEntity> {
    const comment = this.commentRepository.create({
      user: { id: userId },
      content,
      createdBy: userId,
      post: { id: postId },
      createdAt: new Date(),
    });
    return this.commentRepository.save(comment);
  }

  async updateComment(
    commentId: number,
    body: UpdateCommentBodyDto,
    userId: number,
  ): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment',
      );
    }

    Object.assign(comment, body, {
      updatedBy: userId,
      updatedAt: new Date(),
    });

    return this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    comment.deletedAt = new Date();
    comment.deletedBy = userId;
    await this.commentRepository.save(comment);
  }

  // Phương thức cho comment reply
  async createCommentReply(
    userId: number,
    commentId: number,
    body: CreateCommentReplyBodyDto,
  ): Promise<CommentReplyEntity> {
    const reply = this.commentReplyRepository.create({
      user: { id: userId }, // Liên kết với người dùng
      content: body.content,
      createdBy: userId,
      comment: { id: commentId }, // Liên kết với bình luận cha
      createdAt: new Date(),
    });
    return this.commentReplyRepository.save(reply);
  }

  async updateCommentReply(
    replyId: number,
    body: UpdateCommentReplyBodyDto,
    userId: number,
  ): Promise<CommentReplyEntity> {
    const reply = await this.commentReplyRepository.findOne({
      where: { id: replyId },
    });
    if (reply.createdBy !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this reply',
      );
    }

    Object.assign(reply, body, {
      updatedBy: userId,
      updatedAt: new Date(),
    });

    return this.commentReplyRepository.save(reply);
  }

  async deleteCommentReply(replyId: number, userId: number): Promise<void> {
    const reply = await this.commentReplyRepository.findOne({
      where: { id: replyId },
    });
    reply.deletedAt = new Date();
    reply.deletedBy = userId;
    await this.commentReplyRepository.save(reply);
  }

  // Phương thức cho comment ban
  async createCommentBan(
    createCommentBanDto: CreateCommentBanBodyDto,
  ): Promise<CommentBanEntity> {
    const commentBan = this.commentBanRepository.create({
      ...createCommentBanDto,
      createdAt: new Date(),
    });
    return this.commentBanRepository.save(commentBan);
  }

  async updateCommentBan(
    banId: number,
    updateCommentBanDto: UpdateCommentBanBodyDto,
  ): Promise<CommentBanEntity> {
    const commentBan = await this.commentBanRepository.findOne({
      where: { id: banId },
    });
    Object.assign(commentBan, updateCommentBanDto, {
      updatedAt: new Date(),
    });

    return this.commentBanRepository.save(commentBan);
  }

  async deleteCommentBan(banId: number): Promise<void> {
    const commentBan = await this.commentBanRepository.findOne({
      where: { id: banId },
    });
    await this.commentBanRepository.remove(commentBan);
  }
}
