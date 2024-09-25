import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  Req,
  UseGuards,
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
import { AuthGuard } from 'src/auth/middlewares/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() body: CreateUserBodyDto) {
    return await this.userService.registerUser(
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.USER)
  @Put(':userId/update')
  async update(
    @Param() params: UpdateUserParamsDto,
    @Body() body: UpdateUserBodyDto,
    @Req() req: any,
  ) {
    return await this.userService.updateUser(
      params.userId,
      body.username,
      body.email,
      body.password,
      body.role,
      req.user,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':userId/delete')
  async deleteUser(@Param() params: DeleteUserParamsDto) {
    const user = await this.userService.getUser(params.userId);
    return await this.userService.deleteUser(user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Get('all')
  async findAll(@Query() query: any) {
    return await this.userService.findAll(query.name, query.page, query.limit);
  }
}
