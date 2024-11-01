import { Injectable } from '@nestjs/common';
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
  ) {
    const newPost = this.postRepository.create({
      user: { id: userId },
      title,
      content,
      createdBy: userId,
    });

    const savedPost = await this.postRepository.save(newPost);

    // Lưu ảnh nếu có
    if (images && images.length > 0) {
      const postImages = images.map((imageUrl) => {
        const postImage = this.postImageRepository.create({
          post: savedPost, // Liên kết ảnh với bài viết
          imageUrl: imageUrl,
          createdBy: userId,
          updatedBy: userId,
        });
        return postImage;
      });

      await this.postImageRepository.save(postImages);
    }

    return savedPost;
  }

  async getPost(postId: number) {
    return await this.postRepository.findOne({
      where: {
        id: postId,
        deletedAt: IsNull(),
      },
      relations: ['user'],
    });
  }

  async updatePost(
    post: PostEntity,
    title: string,
    content: string,
    userId: number,
  ) {
    const updateData: Partial<PostEntity> = {
      title: title,
      content: content,
      updatedBy: userId,
    };

    await this.postRepository.update(
      { id: post.id, deletedAt: IsNull() },
      updateData,
    );
    return await this.getPost(post.id);
  }

  async deletePost(post: PostEntity, userId: number) {
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
