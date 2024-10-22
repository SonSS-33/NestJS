import {
  Controller,
  Post,
  Body,
  Req,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';

import {
  CreateCommentBodyDto,
  DeleteCommentParamDto,
  GetCommentParamDto,
  UpdateCommentBodyDto,
} from './dtos/comment.dto';
import { GetPostParamsDto } from 'src/post/dtos/post.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('api/v1')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get(':postId/getAll')
  async getAllComment(@Param() param: GetPostParamsDto) {
    return await this.commentService.findAllComments(param.postId);
  }

  @Post('comments')
  async createComment(@Body() body: CreateCommentBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.commentService.createComment(userId, body);
  }

  @Put(':commentId/update')
  async updateComment(
    @Param() param: GetCommentParamDto,
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
