import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dto/user.dto';
import { AuthService } from 'src/authentication/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(
    name: string | undefined,
    page: number = 1,
    limit: number = 10,
  ): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (name) {
      queryBuilder.where('user.username LIKE :name', { name: `%${name}%` });
    }
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);
    return queryBuilder.getMany();
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateUser(
    user: UserEntity,
    email: string | undefined,
    password: string | undefined,
  ) {
    const updateData: Partial<UserEntity> = { email };

    if (password) {
      updateData.password = await this.authService.hashPassword(password);
    }

    await this.userRepository.update(user.id, updateData);

    return await this.getUser(user.id);
  }

  async deleteUser(user: UserEntity): Promise<boolean> {
    await this.userRepository.delete(user.id);
    return true;
  }
}
