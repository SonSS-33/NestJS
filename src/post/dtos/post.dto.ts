import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class createPostBodyDto {
  @IsNotEmpty()
  @Length(4, 30)
  title: string;
  @MaxLength(255, {
    message: 'detail is too long',
  })
  detail: string;
}
