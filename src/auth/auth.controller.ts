import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginBodyDto } from './dtos/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() body: LoginBodyDto) {
    const token = await this.authService.signIn(body.email, body.password);
    return token;
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
