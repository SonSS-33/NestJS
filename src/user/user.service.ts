import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { PublicRoleType } from './enums/public-role.type';
import { RoleType } from './enums/role.type';

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
    role: PublicRoleType,
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
    page: number = 1,
    limit: number = 10,
  ): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (q) {
      queryBuilder.where('user.username LIKE :name', { name: `%${q}%` });
    }
    queryBuilder.skip((page - 1) * limit).take(limit);
    return queryBuilder.getMany();
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
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
    userId: number,
    username: string,
    email: string | undefined,
    password: string | undefined,
    role: PublicRoleType | undefined,
    currentUser: any,
  ) {
    const user = await this.getUser(userId);
    if (currentUser.role !== RoleType.ADMIN && currentUser.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this user',
      );
    }
    const updateData: Partial<UserEntity> = { email, username };
    if (currentUser.role === RoleType.ADMIN && role) {
      updateData.role = role;
    }
    if (currentUser.role !== RoleType.ADMIN && role) {
      throw new ForbiddenException(
        'You do not have permission to change the user role',
      );
    }
    if (password) {
      updateData.password = await hash(password, 10);
    }
    await this.userRepository.update(user.id, updateData);
    const updatedUser = await this.getUser(user.id);
    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser(user: UserEntity): Promise<{ message: string }> {
    await this.userRepository.delete(user.id);
    return { message: 'User deleted successfully.' };
  }
}
