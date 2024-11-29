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
import { PostService } from '../service/post.service';

import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { RoleType } from 'src/user/enums/role.type';
import {
  CreatePostBodyDto,
  DeletePostParamsDto,
  GetPostParamsDto,
  UpdatePostBodyDto,
} from '../dtos/post.dto';

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

  @Roles(RoleType.ADMIN)
  @Put(':postId/update')
  async updatePostByAdmin(
    @Param() params: GetPostParamsDto,
    @Body() body: UpdatePostBodyDto,
    @Req() req: any,
  ) {
    const post = await this.postService.getPost(params.postId);
    const userId = req.user.userId;

    return await this.postService.updatePost(
      post,
      body.title,
      body.content,
      userId,
    );
  }

  @Put('update')
  async updatePost(@Body() body: UpdatePostBodyDto, @Req() req: any) {
    const postId = body.postId;
    const post = await this.postService.getPost(postId);

    const userId = req.user.userId;

    return await this.postService.updatePost(
      post,
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
