import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('post_like')
export class PostLikeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id' })
  postId!: number;

  @Column({ name: 'user_id' })
  userId!: number;

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
}