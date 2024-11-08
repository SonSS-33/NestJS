import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { LikeService } from './like.service';
import {
  CreateCommentLikeDto,
  CreatePostLikeDto,
  DeleteCommentLikeDto,
  DeletePostLikeDto,
} from './dtos/like.dto';
import { GetPostParamsDto } from 'src/post/dtos/post.dto';
import { GetCommentParamDto } from 'src/comment/dtos/comment.dto';

@Controller('api/v1/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('posts/:postId')
  async likePost(
    @Param() params: GetPostParamsDto,
    @Body() body: CreatePostLikeDto,
  ) {
    return this.likeService.likePost(params.postId, body.userId);
  }

  @Delete('posts/:postId')
  async unlikePost(
    @Param() params: GetPostParamsDto,
    @Body() body: DeletePostLikeDto,
  ) {
    return this.likeService.unlikePost(params.postId, body.userId);
  }

  @Post('comments/:commentId')
  async likeComment(
    @Param() params: GetCommentParamDto,
    @Body() body: CreateCommentLikeDto,
  ) {
    return this.likeService.likeComment(params.commentId, body.userId);
  }

  @Delete('comments/:commentId')
  async unlikeComment(
    @Param() params: GetCommentParamDto,
    @Body() body: DeleteCommentLikeDto,
  ) {
    return this.likeService.unlikeComment(params.commentId, body.userId);
  }
}
