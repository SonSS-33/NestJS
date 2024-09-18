import { Body, Controller, Delete, Get, Param, Put ,Post, Query, } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import {
  CreateUserDto,
  DeleteUserParamsDto,
  GetUserParamsDto,
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from '../dto/user.dto';
import { Public } from 'src/authentication/decorators/public.decorator';
import { UserEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService
  ) {}

  @Public()
  @Post('create')
  async createUser(
  @Body() body: CreateUserDto,) {
  return await this.usersService.createUser(body);
}
  @Get(':userId/detail')
  async getUser(@Param() params: GetUserParamsDto) {
    return await this.usersService.getUser(params.userId);
  }

  @Put(':userId/update')
  async update(
    @Param() params: UpdateUserParamsDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    const user = await this.usersService.getUser(params.userId);
    return await this.usersService.updateUser(user, body.email, body.password);
  }

  @Delete(':userId/delete')
  async deleteUser(@Param() params: DeleteUserParamsDto) {
    const user = await this.usersService.getUser(params.userId);
    return await this.usersService.deleteUser(user);
  }
}
