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
} from '@nestjs/common';
import { CommentService } from './comment.service';
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
import { Public } from 'src/auth/decorators/public.decorator';

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
  @Public()
  @Get(':commentId/detail')
  async findComment(@Param() params: GetCommentParamDto) {
    return await this.commentService.getComment(params.commentId);
  }

  @Put(':commentId/update')
  async updateComment(
    @Param() params: GetCommentParamDto,
    @Body() body: UpdateCommentBodyDto,
    @Req() req: any,
  ) {
    const commentId = params.commentId;
    const userId = req.user.userId;

    return await this.commentService.updateComment(
      commentId,
      body.content,
      body.imageUrl,
      userId,
    );
  }

  @Delete(':commentId/delete')
  async deleteComment(
    @Param() params: DeleteCommentParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const userId = req.user.userId;

    return await this.commentService.deleteComment(params.commentId, userId);
  }

  // Comment Reply
  @Post(':commentId/reply/create')
  async createCommentReply(
    @Param() params: GetCommentParamDto,
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
  async findCommentReply(@Param() params: GetCommentReplyParamDto) {
    return await this.commentService.getCommentReply(params.commentId);
  }

  @Put(':commentId/reply/:replyId/update')
  async updateCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Body() body: UpdateCommentReplyBodyDto,
    @Req() req: any,
  ) {
    const replyId = params.replyId;
    const userId = req.user.userId;

    return await this.commentService.updateCommentReply(
      replyId,
      body.content,
      userId,
    );
  }

  @Delete(':commentId/reply/:replyId/delete')
  async deleteCommentReply(
    @Param() params: GetCommentReplyParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const userId = req.user.userId;
    const reply = await this.commentService.getCommentReply(params.commentId);

    if (!reply || reply.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own reply');
    }

    return await this.commentService.deleteCommentReply(
      params.commentId,
      userId,
    );
  }
  // Comment Ban
  @Post('ban/create')
  async createCommentBan(
    @Body() body: CreateCommentBanBodyDto,
    @Req() req: any,
  ) {
    const createdBy = req.user.userId;
    return await this.commentService.createCommentBan(
      body.userId,
      body.postId,
      body.bannedUntil,
      body.reason,
      createdBy,
    );
  }

  @Get(':commentBanId/detail')
  async getCommentBan(@Param() params: GetCommentBanParamDto) {
    return await this.commentService.getCommentBan(params.commentBanId);
  }

  @Put(':commentBanId/update')
  async updateCommentBan(
    @Param() param: GetCommentBanParamDto,
    @Body() body: UpdateCommentBanBodyDto,
    @Req() req: any,
  ) {
    const updatedBy = req.user.userId;
    return await this.commentService.updateCommentBan(
      param.commentBanId,
      body.bannedUntil,
      body.reason,
      updatedBy,
    );
  }

  @Delete(':commentBanId/delete')
  async deleteCommentBan(
    @Param() params: GetCommentBanParamDto,
    @Req() req: any,
  ) {
    const deletedBy = req.user.userId;
    return await this.commentService.deleteCommentBan(
      params.commentBanId,
      deletedBy,
    );
  }
}
