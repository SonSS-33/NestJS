import { Controller, Post, Delete, Body, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import {
  CreateCommentLikeDto,
  CreatePostLikeDto,
  DeleteCommentLikeDto,
  DeletePostLikeDto,
} from './dtos/like.dto';

@Controller('api/v1')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('posts')
  async likePost(@Body() body: CreatePostLikeDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.likePost(body.postId, userId);
  }

  @Delete('post/:postId/unlike')
  async unlikePost(@Body() body: DeletePostLikeDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.unlikePost(body.postId, userId);
  }

  @Post('comments')
  async likeComment(@Body() body: CreateCommentLikeDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.likeComment(userId, body.commentId);
  }

  @Delete('comments')
  async unlikeComment(@Body() body: DeleteCommentLikeDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.unlikeComment(userId, body.commentId);
  }
}
