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
import { CommentService } from './comment.service';
import {
  CreateCommentBodyDto,
  CreateCommentReplyBodyDto,
  DeleteCommentParamDto,
  GetCommentParamDto,
  GetCommentReplyParamDto,
  UpdateCommentBodyDto,
  UpdateCommentReplyBodyDto,
} from './dtos/comment.dto';

@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async createComment(@Body() body: CreateCommentBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.commentService.createComment(
      userId,
      body.postId,
      body.content,
      body.imageUrl,
    );
  }

  @Get(':commentId/detail')
  async findComment(@Param() params: GetCommentParamDto) {
    const comment = await this.commentService.getComment(params.commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  @Put(':commentId/update')
  async updateComment(
    @Param() param: GetCommentParamDto,
    @Body() body: UpdateCommentBodyDto,
    @Req() req: any,
  ) {
    const commentId = param.commentId;
    const userId = req.user.userId;

    const comment = await this.commentService.getComment(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You can only update your own comment');
    }

    return await this.commentService.updateComment(
      commentId,
      body.content,
      body.imageUrl,
      userId,
    );
  }

  @Delete(':commentId/delete')
  async deleteComment(
    @Param() param: DeleteCommentParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const userId = req.user.userId;
    const comment = await this.commentService.getComment(param.commentId);

    if (!comment || comment.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own comment');
    }

    return await this.commentService.deleteComment(param.commentId, userId);
  }

  // Comment Reply CRUD methods
  @Post(':commentId/reply/create')
  async createCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Body() body: CreateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.commentService.createCommentReply(
      userId,
      params.commentId,
      body.content,
    );
  }

  @Get(':commentId/reply/:replyId/detail')
  async findCommentReply(@Param() param: GetCommentReplyParamDto) {
    const reply = await this.commentService.getCommentReply(param.commentId);
    if (!reply) {
      throw new NotFoundException('Comment reply not found');
    }
    return reply;
  }

  @Put(':commentId/reply/:replyId/update')
  async updateCommentReply(
    @Param() param: GetCommentReplyParamDto,
    @Body() body: UpdateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const replyId = param.commentId;
    const userId = req.user.userId;

    const reply = await this.commentService.getCommentReply(replyId);
    if (!reply) {
      throw new NotFoundException('Comment reply not found');
    }

    if (reply.user.id !== userId) {
      throw new ForbiddenException('You can only update your own reply');
    }

    return await this.commentService.updateCommentReply(
      replyId,
      body.content,
      userId,
    );
  }

  @Delete(':commentId/reply/:replyId/delete')
  async deleteCommentReply(
    @Param() param: GetCommentReplyParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const userId = req.user.userId;
    const reply = await this.commentService.getCommentReply(param.commentId);

    if (!reply || reply.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own reply');
    }

    return await this.commentService.deleteCommentReply(
      param.commentId,
      userId,
    );
  }
}
