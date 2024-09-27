import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { RoleType } from './enums/role.type';
import { PaginationModel } from 'src/utils/pagination.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(
    email: string,
    username: string,
    password: string,
    role: RoleType,
  ) {
    const user = this.userRepository.create({
      email,
      username,
      password: await hash(password, 10),
      role,
    });
    return await this.userRepository.save(user);
  }

  async findAll(
    q: string | undefined,
    pagination: PaginationModel | undefined,
  ): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where('deleted_at IS NULL');
    if (q) {
      queryBuilder.andWhere('user.username LIKE :name', { name: `%${q}%` });
    }

    if (pagination) {
      queryBuilder
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit);
    }

    return queryBuilder.getMany();
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        deletedAt: IsNull(),
      },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    delete user.password;
    return user;
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(
    user: UserEntity,
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    role: RoleType | undefined,
  ) {
    const updateData: Partial<UserEntity> = {
      email: email,
      username: username,
      role: role,
    };
    if (password) {
      updateData.password = await hash(password, 10);
    }

    await this.userRepository.update(user.id, updateData);
    return await this.getUser(user.id);
  }

  async deleteUser(user: UserEntity) {
    await this.userRepository.update(
      {
        id: user.id,
        deletedAt: IsNull(),
      },
      {
        deletedAt: new Date(),
      },
    );

    return true;
  }
}
