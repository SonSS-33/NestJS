import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CreateCommentBodyDto } from './dtos/comment.dto';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createComment(
    userId: number,
    CreateCommentBodyDto: CreateCommentBodyDto,
  ) {
    const post = await this.postRepository.findOne({
      where: { id: CreateCommentBodyDto.postId },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentRepository.create({
      content: CreateCommentBodyDto.content,
      user,
      post,
    });

    return await this.commentRepository.save(comment);
  }

  async findAllComments(postId: number) {
    return await this.commentRepository.find({
      where: {
        post: { id: postId },
        deletedAt: IsNull(),
      },
      relations: ['user'],
    });
  }

  async getComment(commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        deletedAt: IsNull(),
      },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async updateComment(commentId: number, content: string, userId: number) {
    const comment = await this.getComment(commentId);

    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment.',
      );
    }

    comment.content = content;
    return await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        deletedAt: IsNull(),
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment.',
      );
    }

    await this.commentRepository.update(
      {
        id: comment.id,
        deletedAt: IsNull(),
      },
      {
        deletedAt: new Date(),
      },
    );
  }
}
