import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImageEntity } from './entities/post.img.entity';
import { PostImageService } from './post-img.service';
import { PostImageController } from './post-img.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostImageEntity])],
  controllers: [PostImageController],
  providers: [PostImageService],
  exports: [PostImageService],
})
export class PostImageModule {}
