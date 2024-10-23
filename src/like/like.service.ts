import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLikeBodyDto } from './dtos/like.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/commet/entities/comment.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createLike(createLikeBodyDto: CreateLikeBodyDto) {
    const { userId, postId, commentId, targetType } = createLikeBodyDto;

    // Kiểm tra xem user có tồn tại không
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    let post = null;
    let comment = null;

    // Kiểm tra bài viết nếu targetType là 'post'
    if (targetType === 'post') {
      post = await this.postRepository.findOne({ where: { id: postId } });
      if (!post) throw new NotFoundException('Post not found');
    }

    // Kiểm tra bình luận nếu targetType là 'comment'
    if (targetType === 'comment') {
      comment = await this.commentRepository.findOne({
        where: { id: commentId },
      });
      if (!comment) throw new NotFoundException('Comment not found');
    }

    // Tạo và lưu like
    const like = this.likeRepository.create({
      user,
      post,
      comment,
      targetType,
    });

    return await this.likeRepository.save(like);
  }
}
