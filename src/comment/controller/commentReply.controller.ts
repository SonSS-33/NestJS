import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';

import {
  CreateCommentReplyBodyDto,
  DeleteReplyParamDto,
  GetCommentParamDto,
  GetCommentReplyParamDto,
  UpdateCommentReplyBodyDto,
} from '../dtos/comment.dto';
import { CommentReplyService } from '../service/commentReply.service';

@Controller('api/v1')
export class CommentReplyController {
  constructor(private readonly commentReplyService: CommentReplyService) {}

  @Post(':commentId/reply/create')
  async createCommentReply(
    @Param() params: GetCommentParamDto,
    @Body() body: CreateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.commentReplyService.createCommentReply(
      userId,
      params.commentId,
      body.content,
    );
  }

  @Get(':commentId/reply/:replyId/detail')
  async findCommentReply(@Param() params: GetCommentReplyParamDto) {
    return await this.commentReplyService.getCommentReply(params.replyId);
  }

  @Put(':commentId/reply/:replyId/update')
  async updateCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Body() body: UpdateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;

    return await this.commentReplyService.updateCommentReply(
      params.replyId,
      body.content,
      userId,
    );
  }

  @Delete(':commentId/reply/:replyId/delete')
  async deleteCommentReply(
    @Param() params: DeleteReplyParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const userId = req.user.userId;
    return await this.commentReplyService.deleteCommentReply(
      params.replyId,
      userId,
    );
  }
}
