import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { RoleType } from '../enums/role.type';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserDetailEntity } from './user.detail.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Column()
  password?: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column()
  role: RoleType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user, {
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetailEntity;
}
