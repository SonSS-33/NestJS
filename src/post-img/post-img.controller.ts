import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PostImageService } from './post-img.service';
import {
  DeletePostImgParamsDto,
  AddImagesBodyDto,
  GetPostParamsDto,
} from 'src/post/dtos/post.dto';

@Controller('api/v1/post-image')
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Get(':postId/images')
  async getImagesForPost(@Param() params: GetPostParamsDto) {
    return await this.postImageService.getImagesForPost(params.postId);
  }

  @Post(':postId/add')
  async addImagesToPost(
    @Param('postId') postId: number,
    @Body() body: AddImagesBodyDto,
    @Req() req: any,
  ) {
    const reqAccount = req.user.userId;

    return await this.postImageService.addImagesToPost(
      postId,
      body.imageUrls,
      reqAccount,
    );
  }

  @Delete(':postId/image/:imageUrlId')
  async deleteImage(@Param() params: DeletePostImgParamsDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.postImageService.deleteImage(params.imageUrlId, userId);
  }
}
