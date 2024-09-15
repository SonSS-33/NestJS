import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(name?: string, page: number = 1, limit: number = 10): Promise<User[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    
    // Áp dụng tìm kiếm theo tên
    if (name) {
      queryBuilder.andWhere('user.username LIKE :name', { name: `%${name}%` });
    }

    // Áp dụng phân trang
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    return queryBuilder.getMany();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

