import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/commet/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeEntity,
      UserEntity,
      PostEntity,
      CommentEntity,
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
