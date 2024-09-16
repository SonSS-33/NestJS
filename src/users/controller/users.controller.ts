import { Body, Controller, Delete, Get, Param, Query, Put, ParseIntPipe,Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../users.entity';
import { CreateUserDto } from '../dto/create-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<User[]> {
    return this.usersService.findAll(name, page, limit);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User | undefined> {
    return this.usersService.findOne(username);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<User>
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
  @Post()
async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  return this.usersService.create(createUserDto);
}

}
