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
  @IsInt()
  commentId: number;

  @Type(() => Number)
  @IsInt()
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
  @IsInt()
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

export class CommentBanResponseDto {
  id: number;
  userId: number;
  bannedUntil: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
