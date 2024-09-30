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
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  RegisterUserBodyDto,
  DeleteUserParamsDto,
  GetUserParamsDto,
  UpdateByAdminBodyDto,
  UpdateByAdminParamsDto,
  UpdateUserBodyDto,
} from './dto/user.dto';
import { Roles } from 'src/guards/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoleType } from './enums/role.type';
import { PaginationModel } from 'src/utils/pagination.model';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() body: RegisterUserBodyDto) {
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

  @Roles(RoleType.ADMIN)
  @Put(':userId/update')
  async updateByAdmin(
    @Param() params: UpdateByAdminParamsDto,
    @Body() body: UpdateByAdminBodyDto,
  ) {
    const user = await this.userService.getUser(params.userId);
    return await this.userService.updateUser(
      user,
      body.username,
      body.email,
      body.password,
      body.role,
    );
  }

  @Put('update')
  async updateUser(@Body() body: UpdateUserBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    const user = await this.userService.getUser(userId);
    return await this.userService.updateUser(
      user,
      body.username,
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

  @Roles(RoleType.ADMIN)
  @Get('all')
  async findAll(@Query() query: any) {
    return await this.userService.findAll(
      query.q,
      new PaginationModel(query.page, query.limit),
    );
  }
}
