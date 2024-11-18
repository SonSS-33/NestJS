import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PostImageService } from './post-img.service';
import { GetPostParamsDto } from 'src/post/dtos/post.dto';

@Controller('api/v1/post-image')
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Get(':postId/images')
  async getImagesForPost(@Param() params: GetPostParamsDto) {
    return await this.postImageService.getImagesForPost(params.postId);
  }

  @Post(':postId/add')
  async addImagesToPost(
    @Param() params: GetPostParamsDto,
    @Body('imageUrls') imageUrls: string[],
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.postImageService.addImagesToPost(
      params.postId,
      imageUrls,
      userId,
    );
  }
}
