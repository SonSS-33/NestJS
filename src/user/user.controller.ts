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
  UpdateByAdminParamsDto,
  UpdateUserBodyDto,
  GetUserDetailParamsDto,
} from './dto/user.dto';
import { Roles } from 'src/guards/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoleType } from './enums/role.type';
import { PaginationModel } from 'src/utils/pagination.model';
import { UserDetailResponseDto } from './dto/user.dto';
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() body: RegisterUserBodyDto) {
    const dateOfBirth = new Date(body.dateOfBirth);
    return await this.userService.registerUser(
      body.email,
      body.password,
      body.role,
      body.firstName,
      body.lastName,
      dateOfBirth,
      body.address,
      body.bio,
    );
  }
  @Roles(RoleType.ADMIN)
  @Get(':userId/detail')
  async getUser(@Param() params: GetUserDetailParamsDto) {
    const user = await this.userService.getUser(params.userId, true);
    return new UserDetailResponseDto(user);
  }

  @Roles(RoleType.ADMIN)
  @Put(':userId/update')
  async updateByAdmin(
    @Param() params: GetUserDetailParamsDto,
    @Body() body: UpdateByAdminParamsDto,
  ) {
    const user = await this.userService.getUser(params.userId, true);
    const dateOfBirth = new Date(body.dateOfBirth);
    return await this.userService.updateUser(
      user,
      body.email,
      body.password,
      body.role,
      body.firstName,
      body.lastName,
      dateOfBirth,
      body.address,
      body.bio,
    );
  }

  @Put('update')
  async updateUser(@Body() body: UpdateUserBodyDto, @Req() req: any) {
    const userId = req.user.userId;
    const user = await this.userService.getUser(userId, true);
    const dateOfBirth = new Date(body.dateOfBirth);
    return await this.userService.updateUser(
      user,
      body.email,
      body.password,
      body.role,
      body.firstName,
      body.lastName,
      dateOfBirth,
      body.address,
      body.bio,
    );
  }

  @Roles(RoleType.ADMIN)
  @Delete(':userId/delete')
  async deleteUser(@Param() params: DeleteUserParamsDto) {
    const user = await this.userService.getUser(params.userId, true);
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
