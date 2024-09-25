import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { RoleType } from '../enums/role.type';
import { PublicRoleType } from '../enums/public-role.type';
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

  @IsEnum(RoleType)
  role: PublicRoleType;
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
  password?: string;

  @IsOptional()
  @IsEnum(PublicRoleType)
  role: PublicRoleType;
}
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
