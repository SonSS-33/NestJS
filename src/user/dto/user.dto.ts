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
export class RegisterUserBodyDto {
  // TO DO
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

  @IsEnum(PublicRoleType)
  role: RoleType;
}

export class GetUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class UpdateByAdminParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class DeleteUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class UpdateByAdminBodyDto {
  // TO DO
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
  @IsEnum(RoleType)
  role: RoleType;
}

export class UpdateUserBodyDto {
  // TO DO
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
  role: RoleType;
}
