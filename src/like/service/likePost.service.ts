import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostLikeEntity } from '../entities/like.post.entity';
import { PostService } from 'src/post/service/post.service';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
    private postService: PostService,
  ) {}

  async likePost(userId: number, postId: number) {
    await this.postService.getPost(postId);

    const existingLike = await this.postLikeRepository.findOne({
      where: {
        postId,
        userId,
        deletedAt: IsNull(),
      },
    });
    if (existingLike) {
      throw new ConflictException('User has already liked this post');
    }

    const newLike = new PostLikeEntity();
    newLike.postId = postId;
    newLike.userId = userId;
    newLike.createdBy = userId;
    newLike.createdAt = new Date();
    await this.postLikeRepository.save(newLike);

    return newLike;
  }

  async unlikePost(userId: number, postId: number) {
    await this.postService.getPost(postId);

    const like = await this.postLikeRepository.findOne({
      where: {
        postId,
        userId,
        deletedAt: IsNull(),
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found for this post');
    }

    like.deletedAt = new Date();
    like.deletedBy = userId;
    await this.postLikeRepository.save(like);

    return { message: 'Like removed successfully' };
  }
}
