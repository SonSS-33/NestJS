import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostImageService } from 'src/post-img/post-img.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly PostImageService: PostImageService,
  ) {}

  async createPost(
    userId: number,
    title: string,
    content: string,
    imageUrl: string[],
    reqAccountId: number,
  ) {
    const newPost = new PostEntity();
    newPost.userId = userId;
    newPost.title = title;
    newPost.content = content;
    newPost.createdAt = new Date();
    newPost.createdBy = reqAccountId;
    const savedPost = await this.postRepository.save(newPost);

    if (imageUrl && imageUrl.length > 0) {
      await this.PostImageService.savePostImages(
        savedPost.id,
        imageUrl,
        userId,
      );
    }

    const postWithImages = await this.getPost(savedPost.id);
    return postWithImages;
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

    console.log('Bài viết với ảnh:', post);
    return post;
  }

  async updatePost(
    postId: number | undefined,
    title: string | undefined,
    content: string | undefined,

    userId: number | undefined,
  ) {
    if (!postId) {
      throw new BadRequestException('Both postId  are required.');
    }
    const post = await this.getPost(postId);

    if (post.userId !== userId) {
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

    if (post.userId !== userId) {
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
