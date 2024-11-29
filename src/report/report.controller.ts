import { Controller, Post, Get, Body, Param, Req, Patch } from '@nestjs/common';
import { ReportService } from './report.service';
import {
  CreateCommentReportDto,
  CreatePostReportDto,
  GetParamReportDto,
  UpdatePostReportDto,
} from './dtos/report.dto';
import { GetPostParamsDto } from 'src/post/dtos/post.dto';
import { GetCommentParamDto } from 'src/comment/dtos/comment.dto';
import { Roles } from 'src/guards/roles.decorator';
import { RoleType } from 'src/user/enums/role.type';

@Controller('api/v1/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('post/:postId')
  async reportPost(
    @Param() params: GetPostParamsDto,
    @Body() body: CreatePostReportDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.reportService.reportPost(
      params.postId,
      userId,
      body.reason,
    );
  }

  @Post('comment/:commentId')
  async reportComment(
    @Param() params: GetCommentParamDto,
    @Body() body: CreateCommentReportDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.reportService.reportComment(
      params.commentId,
      userId,
      body.reason,
    );
  }
  @Roles(RoleType.ADMIN)
  @Get('admin')
  async getReportsForAdmin() {
    return await this.reportService.getReports();
  }

  @Roles(RoleType.ADMIN)
  @Patch('post/:reportId/status')
  async updatePostReportStatus(
    @Param() params: GetParamReportDto,
    @Body() body: UpdatePostReportDto,
  ) {
    return await this.reportService.updatePostReportStatus(
      params.reportId,
      body.status,
    );
  }

  @Roles(RoleType.ADMIN)
  @Patch('comment/:reportId/status')
  async updateCommentReportStatus(
    @Param() params: GetParamReportDto,
    @Body() body: UpdatePostReportDto,
  ) {
    return await this.reportService.updateCommentReportStatus(
      params.reportId,
      body.status,
    );
  }
}
