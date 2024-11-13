import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostImageEntity } from './post.img.entity';
import { PostLikeEntity } from 'src/like/entities/like.post.entity';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'created_by', nullable: true })
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

  @OneToMany(() => PostImageEntity, (image) => image.post)
  images: PostImageEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => PostLikeEntity, (postLike) => postLike.post)
  likes: PostLikeEntity[];
}
