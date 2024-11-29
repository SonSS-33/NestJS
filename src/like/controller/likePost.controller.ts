import { Controller, Post, Delete, Req, Param } from '@nestjs/common';
import { PostLikeService } from '../service/likePost.service';
import { DeletePostLikeDto } from '../dtos/like.dto';
import { GetPostParamsDto } from 'src/post/dtos/post.dto';

@Controller('api/v1/posts')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post(':postId/like')
  async likePost(@Param() params: GetPostParamsDto, @Req() req: any) {
    const userId = req.user.id;
    return this.postLikeService.likePost(userId, params.postId);
  }

  @Delete(':postId/unlike')
  async unlikePost(@Param() params: DeletePostLikeDto, @Req() req: any) {
    const userId = req.user.id;
    return this.postLikeService.unlikePost(userId, params.postId);
  }
}
