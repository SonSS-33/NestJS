import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsNumber,
  IsArray,
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

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsNotEmpty()
  @IsInt()
  postId: number;
}

export class UpdateCommentBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  images?: string[];
}

export class CommentResponseDto {
  id: number;
  content: string;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;
  like_count: number;
  deletedAt?: Date;
}

// DTO cho Comment Reply
export class GetCommentReplyParamDto {
  @IsInt()
  commentId: number;

  @IsInt()
  commentReplyId: number;
}
export class CreateCommentReplyBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  commentId: number;
}

export class UpdateCommentReplyBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}

export class CommentReplyResponseDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
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
  banned_until: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class UpdateCommentBanBodyDto {
  @IsNotEmpty()
  @IsDateString()
  banned_until: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class CommentBanResponseDto {
  id: number;
  userId: number;
  banned_until: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
