import {
  Controller,
  Post,
  Body,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';

import {
  CreateCommentBodyDto,
  DeleteCommentParamDto,
  GetCommetParamDto,
  UpdateCommentBodyDto,
} from './dtos/comment.dto';

@Controller('api/v1')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('comments')
  async createComment(@Body() body: CreateCommentBodyDto, @Req() req: any) {
    const userId = req.user['userId'];

    return this.commentService.createComment(userId, body);
  }

  @Put(':commentId/update')
  async updateComment(
    @Param() param: GetCommetParamDto,
    @Body() body: UpdateCommentBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;

    const updatedComment = await this.commentService.updateComment(
      param.commentId,
      body.content,
      userId,
    );

    return {
      message: 'Comment updated successfully',
      data: updatedComment,
    };
  }

  @Delete(':commentId/delete')
  async deleteComment(@Param() param: DeleteCommentParamDto, @Req() req: any) {
    const userId = req.user.userId;
    await this.commentService.deleteComment(param.commentId, userId);

    return {
      message: 'Comment deleted successfully',
    };
  }
}
