import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/middlewares/jwt.auth.guard';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() body: { title: string; detail: string; userId: number },
  ) {
    return await this.postService.createPost(
      body.title,
      body.detail,
      body.userId,
    );
  }
}
