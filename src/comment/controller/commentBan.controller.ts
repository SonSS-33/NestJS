import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { CommentBanService } from '../service/commentBan.service';
import {
  CreateCommentBanBodyDto,
  GetCommentBanParamDto,
  UpdateCommentBanBodyDto,
} from '../dtos/comment.dto';

@Controller('api/v1/comment-ban')
export class CommentBanController {
  constructor(private readonly commentBanService: CommentBanService) {}

  @Post('create')
  async createCommentBan(
    @Body() body: CreateCommentBanBodyDto,
    @Req() req: any,
  ) {
    const createdBy = req.user.userId;
    return await this.commentBanService.createCommentBan(
      body.userId,
      body.bannedUntil,
      body.reason,
      createdBy,
    );
  }

  @Get(':commentBanId/detail')
  async getCommentBan(@Param() params: GetCommentBanParamDto) {
    return await this.commentBanService.getCommentBan(params.commentBanId);
  }

  @Put(':commentBanId/update')
  async updateCommentBan(
    @Param() params: GetCommentBanParamDto,
    @Body() body: UpdateCommentBanBodyDto,
    @Req() req: any,
  ) {
    const updatedBy = req.user.userId;
    return await this.commentBanService.updateCommentBan(
      params.commentBanId,
      body.bannedUntil,
      body.reason,
      updatedBy,
    );
  }

  @Delete(':commentBanId/delete')
  async deleteCommentBan(
    @Param() params: GetCommentBanParamDto,
    @Req() req: any,
  ): Promise<boolean> {
    const deletedBy = req.user.userId;
    return await this.commentBanService.deleteCommentBan(
      params.commentBanId,
      deletedBy,
    );
  }
}
