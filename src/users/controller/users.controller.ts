import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { 
  CreateUserDto,
  DeleteUserParamsDto, 
  GetUserParamsDto, 
  UpdateUserBodyDto, 
  UpdateUserParamsDto } from '../dto/user.dto';



@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/detail')
  async getUser(@Param() params: GetUserParamsDto) {
    return await this.usersService.getUser(params.userId);
  }
  @Post('create')
  async createUser(
    @Body() body: CreateUserDto,
  ) {
    return await this.usersService.createUser(body);
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