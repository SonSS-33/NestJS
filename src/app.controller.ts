import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('v3')
  createUser(@Body() Body: any): string {
    return `tạo thành công`;
  }

  @Put('hahi')
  updateUser(@Body() body: any): string {
    return `Cập nhật thành công`;
  }
}
