import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
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
  @IsInt()
  @Type(() => Number)
  postId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
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
