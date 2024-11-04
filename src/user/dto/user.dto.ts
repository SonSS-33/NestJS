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
import { UserDetailEntity } from '../entities/user.detail.entity';
import { UserEntity } from '../entities/user.entity';

export class RegisterUserBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

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

// export class UpdateByAdminParamsDto {
//   @Type(() => Number)
//   @IsNumber()
//   userId: number;
// }

export class DeleteUserParamsDto {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}

export class UpdateByAdminBodyDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

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

export class UpdateUserBodyDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password: string;

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

export class UserDetailResponseDto {
  id: number;
  email: string;
  isActive: boolean;
  role: RoleType;
  userDetail: UserDetailEntity;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.isActive = user.isActive;
    this.role = user.role;
    this.userDetail = user.userDetail;
  }
}
