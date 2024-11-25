import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostImageModule } from 'src/post-img/post-img.module';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() => PostImageModule),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
