import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { RoleType } from '../enums/role.type';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserDetailEntity } from './user.detail.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Column()
  password?: string;

  @Column({ name: 'is_active' })
  isActive!: boolean;

  @Column()
  role!: RoleType;

  @Column({ name: 'user_detail' })
  userDetailId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'created_by' })
  createdBy?: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'updated_by' })
  updatedBy?: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ name: 'deleted_by' })
  deletedBy?: number;

  @OneToOne(() => UserDetailEntity)
  @JoinColumn({ name: 'user_detail' })
  userDetail?: UserDetailEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts!: PostEntity[];
}
