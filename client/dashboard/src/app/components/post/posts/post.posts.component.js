import {getPosts, getPostsFunc} from './post.posts.factory';
import {allPostsController} from './post.posts.controller';

export const allPostsComponent = 'allPosts';
export const allPostsOptions = {
  templateUrl: '/dashboard/src/app/components/post/posts/post.posts.html',
  controller: [getPosts, '$state', allPostsController],
  controllerAs: 'ctrl'
}
