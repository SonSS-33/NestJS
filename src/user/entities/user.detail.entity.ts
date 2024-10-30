import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_detail')
export class UserDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.userDetail)
  user: UserEntity;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
