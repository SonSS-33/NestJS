import { Controller, Post, Delete, Param, Req } from '@nestjs/common';
import { CommentLikeService } from '../service/likeComment.service';
import { DeleteCommentLikeDto } from '../dtos/like.dto';
import { GetCommentParamDto } from 'src/comment/dtos/comment.dto';

@Controller('api/v1/comments')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @Post(':commentId/like')
  async likeComment(@Param() params: GetCommentParamDto, @Req() req: any) {
    const userId = req.user.id;
    return this.commentLikeService.likeComment(userId, params.commentId);
  }

  @Delete(':commentId/unlike')
  async unlikeComment(@Param() params: DeleteCommentLikeDto, @Req() req: any) {
    const userId = req.user.id;
    return this.commentLikeService.unlikeComment(userId, params.commentId);
  }
}
