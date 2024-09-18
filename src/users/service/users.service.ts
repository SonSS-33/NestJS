import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dto/user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}


  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
  async findAll(
    name: string | undefined,
    page: number = 1,
    limit: number = 10,
  ): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Áp dụng tìm kiếm theo tên
    if (name) {
      queryBuilder.where('user.username LIKE :name', { name: `%${name}%` });
    }

    // Áp dụng phân trang
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
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        email: email,
        password: password,
      },
    );

    return await this.getUser(user.id);
  }

  async deleteUser(user: UserEntity): Promise<boolean> {
    await this.userRepository.delete(user.id);
    return true;
  }
}
