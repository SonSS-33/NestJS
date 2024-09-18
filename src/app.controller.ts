import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('v3')
  createUser(): string {
    return `tạo thành công`;
  }

  @Put('hahi')
  updateUser(): string {
    return `Cập nhật thành công`;
  }
}
