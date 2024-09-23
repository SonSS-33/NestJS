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
import { UserService } from './user.service';
import {
  CreateUserBodyDto,
  DeleteUserParamsDto,
  GetUserParamsDto,
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from './dto/user.dto';
import { Roles } from 'src/guards/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoleType } from './enums/role.type';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  async createUser(@Body() body: CreateUserBodyDto) {
    return await this.userService.createUser(
      body.email,
      body.username,
      body.password,
      body.role,
    );
  }

  @Get(':userId/detail')
  async getUser(@Param() params: GetUserParamsDto) {
    return await this.userService.getUser(params.userId);
  }

  @Roles(RoleType.ADMIN)
  @Put(':userId/update')
  async update(
    @Param() params: UpdateUserParamsDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    const user = await this.userService.getUser(params.userId);
    return await this.userService.updateUser(
      user,
      body.email,
      body.password,
      body.role,
    );
  }

  @Roles(RoleType.ADMIN)
  @Delete(':userId/delete')
  async deleteUser(@Param() params: DeleteUserParamsDto) {
    const user = await this.userService.getUser(params.userId);
    return await this.userService.deleteUser(user);
  }

  @Get('all')
  async findAll(@Query() query: any) {
    return await this.userService.findAll(query.name, query.page, query.limit);
  }
}
