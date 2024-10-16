import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(user: UserEntity, title: string, detail: string) {
    const newPost = new PostEntity();
    newPost.userId = user.id;
    newPost.title = title;
    newPost.detail = detail;
    newPost.createdAt = new Date();
    return await this.postRepository.save(newPost);
  }

  async findAllPosts() {
    return await this.postRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async getPost(postId: number) {
    return await this.postRepository.findOne({
      where: {
        id: postId,
        deletedAt: IsNull(),
      },
    });
  }

  async updatePost(post: PostEntity, title: string, detail: string) {
    const updateData: Partial<PostEntity> = {
      title: title,
      detail: detail,
    };
    await this.postRepository.update(
      {
        id: post.id,
        deletedAt: IsNull(),
      },
      updateData,
    );
    return await this.getPost(post.id);
  }

  async deletePost(post: PostEntity) {
    await this.postRepository.update(
      {
        id: post.id,
        deletedAt: IsNull(),
      },
      {
        deletedAt: new Date(),
      },
    );
    return true;
  }
}
