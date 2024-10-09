import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length, MaxLength } from 'class-validator';

export class createPostBodyDto {
  @IsNotEmpty()
  @Length(4, 30)
  title: string;
  @MaxLength(255, {
    message: 'detail is too long',
  })
  detail: string;
}
export class GetPostParamsDto {
  @Type(() => Number)
  @IsNumber()
  postId: number;
}
export class UpdatePostBodyDto {
  @IsNotEmpty()
  @Length(4, 30)
  title: string;
  @MaxLength(255, {
    message: 'detail is too long',
  })
  detail: string;
}

export class DeletePostParamsDto {
  @Type(() => Number)
  @IsNumber()
  postId: number;
}