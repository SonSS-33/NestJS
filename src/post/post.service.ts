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
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerPost(title: string, detail: string, userId: number) {
    const user = this.userRepository.create({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepository.create({ title, detail, user });
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async get(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async updatePost(post: PostEntity, title: string, detail: string) {
    const updateData: Partial<PostEntity> = {
      title: title,
      detail: detail,
    };
    await this.postRepository.update(
      {
        id: post.id,
        deleted_at: IsNull(),
      },
      updateData,
    );
    return await this.get(post.id);
  }

  async deletePost(post: PostEntity) {
    await this.postRepository.update(
      {
        id: post.id,
        deleted_at: IsNull(),
      },
      { deleted_at: new Date() },
    );
    return true;
  }
}
