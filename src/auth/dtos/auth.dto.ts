import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginBodyDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
export class RegisterBodyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
