import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ReportStatus } from '../enums/report-status.enum';
import { Type } from 'class-transformer';

export class CreatePostReportDto {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}

export class CreateCommentReportDto {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}

export class UpdatePostReportDto {
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}

export class GetParamReportDto {
  @Type(() => Number)
  @IsNumber()
  reportId: number;
}
