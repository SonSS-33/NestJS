// src/user/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  // OneToMany,
} from 'typeorm';

import { RoleType } from '../enums/role.type';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserDetailEntity } from './user.detail.entity';
// import { PostEntity } from 'src/post/entities/post.entity';
// import { CommentEntity } from 'src/commet/entities/comment.entity';
// import { LikeEntity } from 'src/like/entities/like.entity';

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
  // @OneToMany(() => PostEntity, (post) => post.user)
  // post: PostEntity[];

  // @OneToMany(() => CommentEntity, (comment) => comment.user)
  // comments: CommentEntity[];

  // @OneToMany(() => LikeEntity, (like) => like.user)
  // likes: LikeEntity[];
}
