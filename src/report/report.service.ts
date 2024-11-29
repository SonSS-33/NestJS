import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostReportEntity } from './entities/report.post.entity';
import { CommentReportEntity } from './entities/report.comment.entity';
import { ReportStatus } from './enums/report-status.enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(PostReportEntity)
    private readonly postReportRepository: Repository<PostReportEntity>,

    @InjectRepository(CommentReportEntity)
    private readonly commentReportRepository: Repository<CommentReportEntity>,
  ) {}

  async reportPost(postId: number, userId: number, reason: string) {
    const newReportPost = new PostReportEntity();
    newReportPost.postId = postId;
    newReportPost.userId = userId;
    newReportPost.reason = reason;
    newReportPost.status = ReportStatus.PENDING;
    newReportPost.createdAt = new Date();
    newReportPost.createdBy = userId;

    return await this.postReportRepository.save(newReportPost);
  }

  async reportComment(commentId: number, userId: number, reason: string) {
    const newReportComment = new CommentReportEntity();
    newReportComment.commentId = commentId;
    newReportComment.userId = userId;
    newReportComment.reason = reason;
    newReportComment.status = ReportStatus.PENDING;
    newReportComment.createdAt = new Date();
    newReportComment.createdBy = userId;
    return await this.commentReportRepository.save(newReportComment);
  }

  async getReports() {
    const postReports = await this.postReportRepository.find({
      where: { status: ReportStatus.PENDING },
      relations: ['user', 'post'],
    });
    const commentReports = await this.commentReportRepository.find({
      where: { status: ReportStatus.PENDING },
      relations: ['user', 'comment'],
    });
    return { postReports, commentReports };
  }

  async updatePostReportStatus(reportId: number, status: ReportStatus) {
    const report = await this.postReportRepository.findOne({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException(`Post report not found`);
    }
    report.status = status;

    return await this.postReportRepository.save(report);
  }

  async updateCommentReportStatus(reportId: number, status: ReportStatus) {
    const report = await this.commentReportRepository.findOne({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException(`Comment report not found`);
    }
    report.status = status;
    return await this.commentReportRepository.save(report);
  }
}
