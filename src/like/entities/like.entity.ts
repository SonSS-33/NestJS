import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/commet/entities/comment.entity';

@Entity('like')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes, { nullable: true })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes, {
    nullable: true,
  })
  comment: CommentEntity;

  @Column({ type: 'enum', enum: ['post', 'comment'], nullable: false })
  targetType: 'post' | 'comment';
}
