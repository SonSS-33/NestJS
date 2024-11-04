import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UpdateCommentBodyDto } from './dtos/comment.dto';
import { CommentReplyEntity } from './entities/commentReply.entity';
import { PostEntity } from 'src/post/entities/post.entity';
//import { CommentResponseDto } from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CommentReplyEntity)
    private readonly commentReplyRepository: Repository<CommentReplyEntity>,
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
      where: { id: postId, deletedAt: null },
    });
    if (!post) {
      throw new NotFoundException('Post not found or has been deleted');
    }
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
      where: { id: commentId },
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
    if (!comment) throw new NotFoundException('Comment not found');

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

    await this.commentRepository.update(commentId, {
      deletedAt: new Date(),
      deletedBy: userId,
    });

    return true;
  }

  // Comment Reply CRUD methods
  async createCommentReply(
    userId: number,
    commentId: number,
    content: string,
  ): Promise<CommentReplyEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    const newReply = this.commentReplyRepository.create({
      comment,
      content,
      createdAt: new Date(),
      createdBy: userId,
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
}
