import { Type } from 'class-transformer';
import { IsNumber, MaxLength } from 'class-validator';

export class CreateCommentBodyDto {
  postId: number;

  @MaxLength(255)
  content: string;
}
export class UpdateCommentBodyDto {
  @MaxLength(255)
  content: string;
}

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
