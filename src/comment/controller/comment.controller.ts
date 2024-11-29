import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import {
  CreateCommentBodyDto,
  DeleteCommentParamDto,
  GetCommentParamDto,
  UpdateCommentBodyDto,
} from '../dtos/comment.dto';
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
}
