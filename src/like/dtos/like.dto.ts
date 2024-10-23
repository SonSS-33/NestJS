import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateLikeBodyDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  postId?: number;

  @IsOptional()
  @IsNumber()
  commentId?: number;

  @IsNotEmpty()
  @IsEnum(['post', 'comment'])
  targetType: 'post' | 'comment';
}

export class GetLikeParamsDto {
  @Type(() => Number)
  @IsNumber()
  targetId: number;
}

export class DeleteLikeParamsDto {
  @Type(() => Number)
  @IsNumber()
  likeId: number;
}
