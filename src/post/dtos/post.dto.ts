import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';

export class CreatePostBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  imageUrl?: string[];
}

export class UpdatePostBodyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  imageUrl?: string[];
}

export class PostImageDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}

export class GetPostParamsDto {
  @IsNotEmpty()
  postId: number;
}

export class DeletePostParamsDto {
  @IsNotEmpty()
  postId: number;
}
