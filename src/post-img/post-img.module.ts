import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImageEntity } from './entities/post.img.entity';
import { PostImageService } from './post-img.service';
import { PostImageController } from './post-img.controller';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostImageEntity]),
    forwardRef(() => PostModule),
  ],
  controllers: [PostImageController],
  providers: [PostImageService],
  exports: [PostImageService],
})
export class PostImageModule {}
