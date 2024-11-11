import { Controller, Post, Delete, Body, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto, DeleteFollowDto } from './dtos/follow.dto';

@Controller('api/v1/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  async followUser(@Body() body: CreateFollowDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.followService.followUser(body.followedUserId, userId);
  }

  @Delete()
  async unfollowUser(@Body() body: DeleteFollowDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.followService.unfollowUser(body.followedUserId, userId);
  }

  // @Get('followed-posts')
  // async getFollowedPosts(@Req() req: any) {
  //   const userId = req.user.userId;
  //   return this.followService.getFollowedPosts(userId);
  // }
}
