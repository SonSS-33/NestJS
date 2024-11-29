import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostImageService } from './post-img.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postImageService: PostImageService,
  ) {}

  async createPost(
    userId: number,
    title: string,
    content: string,
    imageUrls: string[],
    reqAccountId: number,
  ) {
    const newPost = new PostEntity();
    newPost.userId = userId;
    newPost.title = title;
    newPost.content = content;
    newPost.createdAt = new Date();
    newPost.createdBy = reqAccountId;

    const savedPost = await this.postRepository.save(newPost);

    if (imageUrls && imageUrls.length > 0) {
      await this.postImageService.savePostImages(
        savedPost.id,
        imageUrls,
        reqAccountId,
      );
    }

    return savedPost;
  }

  async getPost(postId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        deletedAt: IsNull(),
      },
      relations: ['postImages'],
    });

    if (!post) {
      throw new HttpException('POST_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async updatePost(
    post: PostEntity,
    title: string | undefined,
    content: string | undefined,
    userId: number,
  ) {
    const updateData: Partial<PostEntity> = {
      title: title,
      content: content,
      updatedBy: userId,
      updatedAt: new Date(),
    };

    if (post.userId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }
    await this.postRepository.update(
      { id: post.id, deletedAt: IsNull() },
      updateData,
    );

    return await this.getPost(post.id);
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.getPost(postId);
    if (post.createdBy !== userId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    await this.postRepository.update(
      {
        id: post.id,
        deletedAt: IsNull(),
      },
      {
        deletedAt: new Date(),
        deletedBy: userId,
      },
    );
    return true;
  }
}
