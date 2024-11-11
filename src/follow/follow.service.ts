// follow.service.ts

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { FollowEntity } from './entities/follow.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private followRepository: Repository<FollowEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async followUser(followedUserId: number, userId: number) {
    const followingUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const followedUser = await this.userRepository.findOne({
      where: { id: followedUserId },
    });

    if (!followingUser || !followedUser) {
      throw new NotFoundException('One of the users not found');
    }

    const existingFollow = await this.followRepository.findOne({
      where: {
        followingUser: { id: userId },
        followedUser: { id: followedUserId },
        deletedAt: IsNull(),
      },
    });

    if (existingFollow) {
      throw new ConflictException('Already following this user');
    }

    const newFollow = this.followRepository.create({
      followingUser: { id: userId },
      followedUser: { id: followedUserId },
      createdBy: userId,
      createdAt: new Date(),
    });

    return this.followRepository.save(newFollow);
  }

  async unfollowUser(followedUserId: number, userId: number) {
    const follow = await this.followRepository.findOne({
      where: {
        followingUser: { id: userId },
        followedUser: { id: followedUserId },
        deletedAt: IsNull(),
      },
    });

    if (!follow) {
      throw new NotFoundException('Follow relationship not found');
    }
    follow.deletedAt = new Date();
    return this.followRepository.save(follow);
  }
}
