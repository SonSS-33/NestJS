import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReportStatus } from '../enums/report-status.enum';

@Entity('post_report')
export class PostReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id' })
  postId!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'reason' })
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
}
