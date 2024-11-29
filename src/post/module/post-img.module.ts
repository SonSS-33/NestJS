import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImageEntity } from '../entities/post.img.entity';
import { PostImageService } from '../service/post-img.service';
import { PostImageController } from '../controller/post-img.controller';
import { PostModule } from 'src/post/module/post.module';

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
