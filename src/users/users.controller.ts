import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserBodyDto,
  DeleteUserParamsDto,
  GetUserParamsDto,
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from './dto/user.dto';
import { Public } from 'src/authentication/decorators/public.decorator';
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
    );
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

  @Get('all')
  async findAll(@Query() query: any) {
    return await this.usersService.findAll(query.name, query.page, query.limit);
  }
}
