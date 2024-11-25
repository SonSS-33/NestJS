import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreatePostBodyDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  imageUrl?: string[];
}

export class UpdatePostBodyDto {
  @Type(() => Number)
  @IsNumber()
  postId!: number;

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

export class UpdatePostByAdminParamDto {
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

export class GetPostParamsDto {
  @Type(() => Number)
  @IsNumber()
  postId!: number;
}

export class DeletePostParamsDto {
  @Type(() => Number)
  @IsNumber()
  postId!: number;
}

export class DeletePostImgParamsDto {
  @Type(() => Number)
  @IsNumber()
  imageUrlId!: number;
}

export class AddImagesBodyDto {
  @IsArray()
  @IsString({ each: true })
  @IsUrl({}, { each: true })
  imageUrls!: string[];
}
