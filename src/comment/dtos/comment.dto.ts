import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class GetCommentParamDto {
  @Type(() => Number)
  @IsNumber()
  commentId: number;
}

export class DeleteCommentParamDto {
  @Type(() => Number)
  @IsNumber()
  commentId: number;
}

// DTO cho Comment
export class CreateCommentBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;
}

export class UpdateCommentBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
// DTO cho Comment Reply
export class GetCommentReplyParamDto {
  @Type(() => Number)
  @IsNumber()
  commentId: number;

  @Type(() => Number)
  @IsNumber()
  replyId: number;
}
export class CreateCommentReplyBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateCommentReplyBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

// DTO cho Comment Ban

export class GetCommentBanParamDto {
  @Type(() => Number)
  @IsNumber()
  commentBanId: number;
}
export class CreateCommentBanBodyDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsDateString()
  bannedUntil: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class UpdateCommentBanBodyDto {
  @IsNotEmpty()
  @IsDateString()
  bannedUntil: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
