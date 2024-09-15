import { Body, Controller, Delete, Dependencies, Get, Param, Post, Put, RequestTimeoutException } from '@nestjs/common';
import { get } from 'http';
import { createPostDto,  updatePostDto } from '../Dto/post.dto';
import { PostService } from '../service/post.service';

@Controller('post')
export class PostController {
    constructor ( private readonly postService:PostService ){

    }
    @Get()
    getAllpost(){
       return this.postService.getAllpost();
    }

    @Get(':id')
    getPost(@Param('id') id:string ){
        return this.postService.getPost(Number(id));
    }


   @Post()
  async createPost(@Body() Post: createPostDto){
    return this.postService.createPost(Post);
   }

   @Put(`:id`)
   async replacePost(@Param('id')id: string , @Body() post: updatePostDto){
    return this.postService.replacePost(Number(id), post);
   }
   @Delete(':id')
  async deletePost(@Param('id') id: string) {
    const result = await this.postService.deletePost(Number(id));
    console.log(result)
    if (result) {
      return { message: 'Post deleted successfully' };
    } else {
      return { message: 'Post not found' };
    }
  }
}
