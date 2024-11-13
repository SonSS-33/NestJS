import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostImageEntity } from './entities/post.img.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(PostImageEntity)
    private readonly postImageRepository: Repository<PostImageEntity>,
  ) {}

  async createPost(
    userId: number,
    title: string,
    content: string,
    images: string[],
    reqAccountId: number,
  ) {
    const newPost = new PostEntity();
    newPost.userId = userId;
    newPost.title = title;
    newPost.content = content;
    newPost.createdAt = new Date();
    newPost.createdBy = reqAccountId;
    const savedPost = await this.postRepository.save(newPost);

    if (images && images.length > 0) {
      const postImages = images.map((imageUrl) => {
        return this.postImageRepository.create({
          post: savedPost,
          imageUrl: imageUrl,
          createdBy: userId,
        });
      });

      await this.postImageRepository.save(postImages);
    }

    const postWithImages = await this.getPost(savedPost.id);
    return postWithImages;
  }

  async getPost(postId: number) {
    return await this.postRepository.findOne({
      where: {
        id: postId,
        deletedAt: IsNull(),
      },
      relations: ['user', 'images'],
    });
  }

  async updatePost(
    postId: number | undefined,
    title: string | undefined,
    content: string | undefined,
    userId: number | undefined,
  ) {
    const post = await this.getPost(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException(
        'You can only update your own post or admin can update any post',
      );
    }

    const updateData: Partial<PostEntity> = {
      title: title,
      content: content,
      updatedBy: userId,
      updatedAt: new Date(),
    };

    await this.postRepository.update(
      { id: post.id, deletedAt: IsNull() },
      updateData,
    );
    return await this.getPost(post.id);
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.getPost(postId);

    if (post.user.id !== userId) {
      throw new ForbiddenException(
        'You can only delete your own post or admin can delete any post',
      );
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
