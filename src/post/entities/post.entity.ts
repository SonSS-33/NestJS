import { PostImageEntity } from 'src/post/entities/post.img.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @OneToMany(() => PostImageEntity, (postImage) => postImage.post)
  postImages!: PostImageEntity[];

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

  @Column({ name: 'like_count' })
  likeCount?: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
