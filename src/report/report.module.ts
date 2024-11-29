import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentReportEntity } from './entities/report.comment.entity';
import { PostReportEntity } from './entities/report.post.entity';
import { ReportController } from './report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReportEntity, PostReportEntity])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
