import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity'; 
import { CreateUserDto } from '../dto/user.dto';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  

   // Phương thức tạo người dùng mới
   async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Tạo một đối tượng UserEntity mới từ DTO
    const newUser = this.usersRepository.create(createUserDto);

    // Lưu đối tượng người dùng vào cơ sở dữ liệu
  
      return await this.usersRepository.save(newUser);
    
  }
  
  async findAll(
    q: string | undefined, 
    page: number = 1, 
    limit: number = 10)
    : Promise<UserEntity[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    
    // Áp dụng tìm kiếm theo tên  
    if (q) {
      queryBuilder.andWhere('user.username LIKE :q', { q: `%${q}%` });
    }

    //  phân trang
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    return queryBuilder.getMany();
  }

async getUser(userId: number):Promise<UserEntity>{
  const user = await this.usersRepository.findOne({
    where:  {
      id: userId,
    },
  })
  if(!user){
    throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
  }
  return user;
}

async getUserByUsername(username: string):Promise<UserEntity>{
  const user = await this.usersRepository.findOne({
    where:{
      username: username,
    },
  })
  if(!user){
    throw new HttpException(`user not found `, HttpStatus.NOT_FOUND)
    
  }
  return user;
}

  async updateUser(
    user:UserEntity,
    email:string|undefined,
    password:string|undefined,
  ){
    await this.usersRepository.update(
    {
      id: user.id,
    },
    {
      email: email,
    password:password,
    }
);
return await this.getUser(user.id);
  }

async deleteUser(user:UserEntity):Promise<boolean>{
  await this.usersRepository.delete(user.id);
    return true;
}
}
