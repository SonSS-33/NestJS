import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserDetailEntity } from './entities/user.detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserDetailEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
