import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { RoleType } from './enums/role.type';
import { PaginationModel } from 'src/utils/pagination.model';
import { UserDetailEntity } from './entities/user.detail.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserDetailEntity)
    private readonly userDetailRepository: Repository<UserDetailEntity>,
  ) {}

  async registerUser(
    email: string,
    password: string,
    role: RoleType,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    address: string,
    bio?: string,
  ): Promise<UserEntity> {
    const hashedPassword = await hash(password, 10);

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.isActive = true;
    newUser.role = role;

    const savedUser = await this.userRepository.save(newUser);

    const userDetail = new UserDetailEntity();
    userDetail.first_name = firstName;
    userDetail.last_name = lastName;
    userDetail.date_of_birth = dateOfBirth;
    userDetail.address = address;
    userDetail.bio = bio || '';
    userDetail.userId = savedUser.id;

    const savedUserDetail = await this.userDetailRepository.save(userDetail);
    savedUser.userDetailId = savedUserDetail.id;

    await this.userRepository.save(savedUser);

    delete savedUser.password;
    return savedUser;
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
      relations: ['userDetail'],
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
    email: string,
    isHiddenPassword: boolean,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
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
    email: string | undefined,
    password: string | undefined,
    role: RoleType | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    dateOfBirth: Date | undefined,
    address: string | undefined,
    bio?: string | undefined,
  ) {
    const updateData: Partial<UserEntity> = {
      email: email,
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
    const userDetailUpdateData = {
      firstName,
      lastName,
      dateOfBirth,
      address,
      bio,
    };
    await this.userDetailRepository.update(user.id, userDetailUpdateData);

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
