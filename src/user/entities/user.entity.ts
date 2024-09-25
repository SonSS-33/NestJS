// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PublicRoleType } from '../enums/public-role.type';
import { Exclude } from 'class-transformer';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: PublicRoleType;
}
