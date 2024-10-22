import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostModule } from 'src/post/post.module';
import { LikeEntity } from 'src/like/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      PostEntity,
      UserEntity,
      LikeEntity,
    ]),
    PostModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommetModule {}
