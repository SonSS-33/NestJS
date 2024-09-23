import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserBodyDto,
  DeleteUserParamsDto,
  GetUserParamsDto,
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from './dto/user.dto';

import { Roles } from 'src/guards/roles.decorator';
import { Public } from 'src/authentication/decorators/public.decorator';
import { AuthGuard } from 'src/authentication/middlewares/auth.guard';
@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('create')
  async createUser(@Body() body: CreateUserBodyDto) {
    return await this.usersService.createUser(
      body.email,
      body.username,
      body.password,
      body.role,
    );
  }

  @Get(':userId/detail')
  async getUser(@Param() params: GetUserParamsDto) {
    return await this.usersService.getUser(params.userId);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Put(':userId/update')
  async update(
    @Param() params: UpdateUserParamsDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    const user = await this.usersService.getUser(params.userId);
    return await this.usersService.updateUser(
      user,
      body.email,
      body.password,
      body.role,
    );
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':userId/delete')
  async deleteUser(@Param() params: DeleteUserParamsDto) {
    const user = await this.usersService.getUser(params.userId);
    return await this.usersService.deleteUser(user);
  }

  @Get('all')
  async findAll(@Query() query: any) {
    return await this.usersService.findAll(query.name, query.page, query.limit);
  }
}
