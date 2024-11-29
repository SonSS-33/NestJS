// post-report.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { ReportStatus } from '../enums/report-status.enum';

@Entity('post_report')
export class PostReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  reason!: string;

  @Column({
    default: ReportStatus.PENDING,
  })
  status!: ReportStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'created_by' })
  createdBy?: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'updated_by' })
  updatedBy?: number;

  @Column({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ name: 'deleted_by' })
  deletedBy?: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post!: PostEntity;
}
