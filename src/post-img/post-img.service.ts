import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostImageEntity } from './entities/post.img.entity';

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImageEntity)
    private readonly postImageRepository: Repository<PostImageEntity>,
  ) {}

  async savePostImages(postId: number, imageUrls: string[], userId: number) {
    const postImages = imageUrls.map((imageUrl) => {
      const newPostImage = new PostImageEntity();
      newPostImage.postId = postId;
      newPostImage.imageUrl = imageUrl;
      newPostImage.createdBy = userId;
      return newPostImage;
    });

    return this.postImageRepository.save(postImages);
  }

  async getImagesForPost(postId: number) {
    const images = await this.postImageRepository.find({
      where: {
        postId: postId,
        deletedAt: IsNull(),
      },
    });

    if (!images || images.length === 0) {
      throw new HttpException('IMG_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return images;
  }

  async addImagesToPost(postId: number, imageUrls: string[], userId: number) {
    return await this.savePostImages(postId, imageUrls, userId);
  }
}
