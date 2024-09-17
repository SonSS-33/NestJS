  // src/user/user.entity.ts
import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

  @Entity()
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;
  }
