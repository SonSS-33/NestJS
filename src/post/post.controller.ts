import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  DeletePostParamsDto,
  GetPostParamsDto,
  UpdatePostBodyDto,
} from './dtos/post.dto';

@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('register') //change name
  async registerPost(
    @Body() body: { title: string; detail: string; userId: number }, //TO DO
  ) {
    return await this.postService.createPost(
      body.userId, //TO DO
      body.title,
      body.detail,
    );
  }

  @Public()
  @Get('all')
  async findPosts() {
    return await this.postService.findAllPosts();
  }

  @Get('/:id/detail') //TO DO
  async findPost(@Param() params: GetPostParamsDto) {
    return await this.postService.getPost(params.postId);
  }

  @Put(':id/update') //TO DO
  async updatePost(@Body() body: UpdatePostBodyDto, @Req() req: any) {
    const postId = req.post.postId; //TO DO
    const post = await this.postService.getPost(postId);
    return await this.postService.updatePost(post, body.title, body.detail);
  }

  @Delete(':id/delete') //TO DO
  async deletePost(@Param() param: DeletePostParamsDto) {
    const post = await this.postService.getPost(param.postId);
    return await this.postService.deletePost(post);
  }
}
