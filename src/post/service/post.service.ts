import { Injectable } from '@nestjs/common';
import { createPostDto, updatePostDto } from '../Dto/post.dto';

@Injectable()
export class PostService {
    private lastPostId = 0;
  private posts = []; // trả về 

  getAllpost() {
    return this.posts;
  }

  getPost(id: number) {
    return this.posts.find(post => post.id === id);
    
  }

  createPost(createPostDto: createPostDto) {
    const newPost = {
      id: this.posts.length + 1,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  replacePost(id: number, updatePostDto: updatePostDto) {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return null; 
    }
    this.posts[index] = { id, ...updatePostDto };
    return this.posts[index];
  }

   async deletePost(id: number) {
     const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false; 
    }
    this.posts.splice(index, 1);
    return true;
  }
}
