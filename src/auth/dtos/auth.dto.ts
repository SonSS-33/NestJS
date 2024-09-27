import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  //TO DO: LoginBodyDto, Min(6)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class RegisterDto {
  //TO DO:  Min(6)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
