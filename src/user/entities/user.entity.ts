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
import { PostLikeEntity } from 'src/like/entities/like.post.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

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

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: number;

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user, {
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetailEntity;

  @OneToMany(() => PostLikeEntity, (postLike) => postLike.user)
  postLikes: PostLikeEntity[];

  @OneToMany(() => CommentEntity, (commentLike) => commentLike.user)
  commentLikes: CommentEntity[];
}
