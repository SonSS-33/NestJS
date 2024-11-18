import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { RoleType } from '../enums/role.type';
import { PublicRoleType } from '../enums/public-role.type';

export class RegisterUserBodyDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(PublicRoleType)
  role!: RoleType;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  dateOfBirth!: string;

  @IsString()
  address!: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class GetUserDetailParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId!: number;
}

export class DeleteUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId!: number;

  @IsOptional()
  @IsNumber()
  deletedBy?: number;
}

export class UpdateByAdminParamsDto {
  @IsOptional()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(RoleType)
  role!: RoleType;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  dateOfBirth!: string;

  @IsString()
  address!: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class UpdateUserBodyDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(PublicRoleType)
  role!: RoleType;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  dateOfBirth!: string;

  @IsString()
  address!: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
