import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, MoreThanOrEqual } from 'typeorm';
import { CommentBanEntity } from '../entities/commentBan.entity';

@Injectable()
export class CommentBanService {
  constructor(
    @InjectRepository(CommentBanEntity)
    private readonly commentBanRepository: Repository<CommentBanEntity>,
  ) {}

  async isUserBanned(userId: number): Promise<boolean> {
    const currentDate = new Date();
    const activeBan = await this.commentBanRepository.findOne({
      where: {
        userId,
        bannedUntil: MoreThanOrEqual(currentDate),
      },
    });

    return !!activeBan;
  }

  async createCommentBan(
    userId: number,
    bannedUntil: Date,
    reason: string,
    createdBy: number,
  ): Promise<CommentBanEntity> {
    const newCommentBan = new CommentBanEntity();
    newCommentBan.userId = userId;
    newCommentBan.bannedUntil = bannedUntil;
    newCommentBan.reason = reason;
    newCommentBan.createdAt = new Date();
    newCommentBan.createdBy = createdBy;

    return await this.commentBanRepository.save(newCommentBan);
  }

  async getCommentBan(commentBanId: number): Promise<CommentBanEntity> {
    const commentBan = await this.commentBanRepository.findOne({
      where: { id: commentBanId, deletedAt: IsNull() },
    });

    if (!commentBan) {
      throw new HttpException('COMMENT_BAN_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return commentBan;
  }

  async updateCommentBan(
    commentBanId: number,
    bannedUntil: Date,
    reason?: string,
    updatedBy?: number,
  ): Promise<CommentBanEntity> {
    const commentBan = await this.getCommentBan(commentBanId);

    commentBan.bannedUntil = bannedUntil;
    if (reason) {
      commentBan.reason = reason;
    }
    if (updatedBy) {
      commentBan.updatedBy = updatedBy;
    }

    return await this.commentBanRepository.save(commentBan);
  }

  async deleteCommentBan(
    commentBanId: number,
    deletedBy: number,
  ): Promise<boolean> {
    const commentBan = await this.getCommentBan(commentBanId);

    commentBan.deletedAt = new Date();
    commentBan.deletedBy = deletedBy;

    await this.commentBanRepository.save(commentBan);
    return true;
  }
}
