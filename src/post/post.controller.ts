import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/middlewares/jwt.auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  DeletePostParamsDto,
  GetPostParamsDto,
  UpdatePostBodyDto,
} from './dtos/post.dto';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registerPost(
    @Body() body: { title: string; detail: string; userId: number },
  ) {
    return await this.postService.registerPost(
      body.title,
      body.detail,
      body.userId,
    );
  }
  @Public()
  @Get('all')
  async findPosts() {
    return await this.postService.findAll();
  }

  @Get('/:id/detail')
  async findPost(@Param() params: GetPostParamsDto) {
    return await this.postService.get(params.postId);
  }

  @Put(':id/update')
  async updatePost(@Body() body: UpdatePostBodyDto, @Req() req: any) {
    const postId = req.post.postId;
    const post = await this.postService.get(postId);
    return await this.postService.updatePost(post, body.title, body.detail);
  }

  @Delete(':id/delete')
  async deletePost(@Param() param: DeletePostParamsDto) {
    const post = await this.postService.get(param.postId);
    return await this.postService.deletePost(post);
  }
}
