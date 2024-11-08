import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLikeEntity } from './entities/like.post.entity';
import { CommentLikeEntity } from './entities/like.comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(CommentLikeEntity)
    private commentLikeRepository: Repository<CommentLikeEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async likePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    const existingLike = await this.postLikeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (existingLike) {
      throw new ConflictException('User has already liked this post');
    }

    const newLike = this.postLikeRepository.create({
      user: { id: userId },
      post: { id: postId },
      createdBy: userId,
    });
    await this.postLikeRepository.save(newLike);

    post.likeCount = (post.likeCount || 0) + 1;
    return await this.postRepository.save(post);
  }

  async unlikePost(postId: number, userId: number) {
    const like = await this.postLikeRepository.findOne({
      where: {
        post: { id: postId },
        user: { id: userId },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found for this post');
    }
    await this.postLikeRepository.remove(like);

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (post) {
      post.likeCount = Math.max((post.likeCount || 0) - 1, 0);
      return await this.postRepository.save(post);
    }
  }

  async likeComment(commentId: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException(`Comment not found`);
    }

    const existingLike = await this.commentLikeRepository.findOne({
      where: { comment: { id: commentId }, user: { id: userId } },
    });
    if (existingLike) {
      throw new ConflictException('User has already liked this comment');
    }

    const newLike = this.commentLikeRepository.create({
      user: { id: userId },
      comment: { id: commentId },
      createdBy: userId,
    });
    await this.commentLikeRepository.save(newLike);

    comment.likeCount = (comment.likeCount || 0) + 1;
    return await this.commentRepository.save(comment);
  }

  async unlikeComment(commentId: number, userId: number) {
    const like = await this.commentLikeRepository.findOne({
      where: { comment: { id: commentId }, user: { id: userId } },
    });

    if (!like) {
      throw new NotFoundException('Like not found for this comment');
    }

    await this.commentLikeRepository.remove(like);

    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (comment) {
      comment.likeCount = Math.max((comment.likeCount || 0) - 1, 0);
      return await this.commentRepository.save(comment);
    }
  }
}
