import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class GetUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class UpdateUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class DeleteUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class UpdateUserBodyDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;
}
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
