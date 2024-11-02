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

import { Public } from 'src/auth/decorators/public.decorator';
import {
  CreateCommentBanBodyDto,
  CreateCommentBodyDto,
  CreateCommentReplyBodyDto,
  DeleteCommentParamDto,
  GetCommentBanParamDto,
  GetCommentParamDto,
  GetCommentReplyParamDto,
  UpdateCommentBanBodyDto,
  UpdateCommentBodyDto,
  UpdateCommentReplyBodyDto,
} from './dtos/comment.dto';

@Controller('api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get(':postId/getAll')
  async getAllComment(@Param('postId') postId: number) {
    return await this.commentService.findAllComments(postId);
  }

  @Post('create')
  async createComment(@Body() body: CreateCommentBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.commentService.createComment(
      userId,
      body.content,
      body.postId,
    );
  }

  @Put(':commentId/update')
  async updateComment(
    @Param() params: GetCommentParamDto,
    @Body() body: UpdateCommentBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const updatedComment = await this.commentService.updateComment(
      params.commentId,
      body,
      userId,
    );

    return {
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

  @Post(':commentId/reply')
  async createCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Body() body: CreateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const reply = await this.commentService.createCommentReply(
      userId,
      params.commentReplyId,
      body,
    );
    return {
      message: 'Reply created successfully',
      data: reply,
    };
  }

  // Phương thức cập nhật phản hồi bình luận
  @Put(':replyId/updateReply')
  async updateCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Body() body: UpdateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const updatedReply = await this.commentService.updateCommentReply(
      params.commentReplyId, // Đảm bảo tham số trùng với tên tham số trong DTO
      body,
      userId,
    );

    return {
      message: 'Reply updated successfully',
      data: updatedReply,
    };
  }

  @Delete(':replyId/deleteReply')
  async deleteCommentReply(@Param('replyId') replyId: number, @Req() req: any) {
    const userId = req.user.userId;
    await this.commentService.deleteCommentReply(replyId, userId);

    return {
      message: 'Reply deleted successfully',
    };
  }

  // Phương thức cho comment ban
  @Post('ban')
  async createCommentBan(@Body() body: CreateCommentBanBodyDto) {
    return await this.commentService.createCommentBan(body);
  }

  @Put(':banId/updateBan')
  async updateCommentBan(
    @Param() params: GetCommentBanParamDto,
    @Body() body: UpdateCommentBanBodyDto,
  ) {
    const updatedBan = await this.commentService.updateCommentBan(
      params.commentBanId,
      body,
    );

    return {
      message: 'Ban updated successfully',
      data: updatedBan,
    };
  }

  @Delete(':banId/deleteBan')
  async deleteCommentBan(@Param('banId') banId: number) {
    await this.commentService.deleteCommentBan(banId);

    return {
      message: 'Ban deleted successfully',
    };
  }
}
