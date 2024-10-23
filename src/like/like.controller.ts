import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeBodyDto } from './dtos/like.dto';

@Controller('api/v1')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('like')
  async createLike(@Body() body: CreateLikeBodyDto) {
    return this.likeService.createLike(body);
  }
}
