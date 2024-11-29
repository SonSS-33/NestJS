import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('comment_reply')
export class CommentReplyEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'comment_id' })
  commentId!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column('text')
  content!: string;

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

  @ManyToOne(() => CommentEntity, (comment) => comment.id)
  @JoinColumn({ name: 'comment_id' })
  comment!: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
