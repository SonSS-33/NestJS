import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class CreatePostLikeDto {
  @Type(() => Number)
  @IsNumber()
  postId: number;
}

export class DeletePostLikeDto {
  @Type(() => Number)
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}

export class CreateCommentLikeDto {
  @Type(() => Number)
  @IsNumber()
  commentId: number;
}

export class DeleteCommentLikeDto {
  @Type(() => Number)
  @IsNumber()
  commentId: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}
