// comment-report.entity.ts
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
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { ReportStatus } from '../enums/report-status.enum';

@Entity('comment_report')
export class CommentReportEntity {
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

  @ManyToOne(() => CommentEntity, { eager: true })
  @JoinColumn({ name: 'comment_id' })
  comment!: CommentEntity;
}
