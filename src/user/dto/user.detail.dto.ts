import { UserDetailEntity } from '../entities/user.detail.entity';
import { UserEntity } from '../entities/user.entity';
import { RoleType } from '../enums/role.type';

export class UserDetailResponseDto {
  id: number;
  email: string;
  isActive: boolean;
  role: RoleType;
  userDetail: UserDetailEntity;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.isActive = user.isActive;
    this.role = user.role;
    this.userDetail = user.userDetail;
  }
}
