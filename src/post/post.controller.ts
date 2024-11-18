import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostBodyDto,
  DeletePostParamsDto,
  GetPostParamsDto,
  UpdatePostBodyDto,
} from './dtos/post.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() body: CreatePostBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.postService.createPost(
      userId,
      body.title,
      body.content,
      body.imageUrl || [],
      userId,
    );
  }

  @Public()
  @Get(':postId/detail')
  async findPost(@Param() params: GetPostParamsDto) {
    return await this.postService.getPost(params.postId);
  }

  @Put(':postId/update')
  async updatePost(
    @Param() params: GetPostParamsDto,
    @Body() body: UpdatePostBodyDto,
    @Req() req: any,
  ) {
    const postId = params.postId;
    const userId = req.user.userId;

    return await this.postService.updatePost(
      postId,
      body.title,
      body.content,

      userId,
    );
  }

  @Delete(':postId/delete')
  async deletePost(@Param() params: DeletePostParamsDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.postService.deletePost(params.postId, userId);
  }
}
