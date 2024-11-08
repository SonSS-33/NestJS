import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class CreatePostLikeDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class DeletePostLikeDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}

export class CreateCommentLikeDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class DeleteCommentLikeDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}
