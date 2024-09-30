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
      email: email,
      username: username,
      password: await hash(password, 10),
      role: role,
      createdAt: new Date(),
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
      queryBuilder.andWhere('user.username LIKE :q', { q: `%${q}%` });
    }

    if (pagination) {
      queryBuilder
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit);
    }

    return queryBuilder.getMany();
  }

  async getUser(
    userId: number,
    isHiddenPassword: boolean,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        deletedAt: IsNull(),
      },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (isHiddenPassword) {
      delete user.password;
    }

    return user;
  }

  async getUserByUsername(
    username: string,
    isHiddenPassword: boolean,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
        deletedAt: IsNull(),
      },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (isHiddenPassword) {
      delete user.password;
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

    await this.userRepository.update(
      {
        id: user.id,
        deletedAt: IsNull(),
      },
      updateData,
    );

    return await this.getUser(user.id, true);
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
