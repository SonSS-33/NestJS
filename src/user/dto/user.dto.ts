import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { RoleType } from '../enums/role.type';
import { PublicRoleType } from '../enums/public-role.type';

export class RegisterUserBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(PublicRoleType)
  role: RoleType;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class GetUserDetailParamsDto {
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
