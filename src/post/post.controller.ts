import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  Delete,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
//import { Public } from 'src/auth/decorators/public.decorator';
import {
  CreatePostBodyDto,
  DeletePostParamsDto,
  GetPostParamsDto,
  UpdatePostBodyDto,
} from './dtos/post.dto';

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
      body.imageUrl,
    );
  }

  // @Public()
  // @Get('all')
  // async findPosts() {
  //   return await this.postService.findAllPosts();
  // }

  @Get(':postId/detail')
  async findPost(@Param() params: GetPostParamsDto) {
    return await this.postService.getPost(params.postId);
  }

  @Put(':postId/update')
  async updatePost(
    @Param() param: GetPostParamsDto,
    @Body() body: UpdatePostBodyDto,
    @Req() req: any,
  ) {
    const postId = param.postId;
    const userId = req.user.userId;

    const post = await this.postService.getPost(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You can only update your own post');
    }

    return await this.postService.updatePost(
      post,
      body.title,
      body.content,
      userId,
    );
  }

  @Delete(':postId/delete')
  async deletePost(@Param() param: DeletePostParamsDto, @Req() req: any) {
    const userId = req.user.userId;
    const post = await this.postService.getPost(param.postId);
    if (!post || post.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own post');
    }

    return await this.postService.deletePost(post, userId);
  }
}
