import { getPosts, getPostsFunc } from './post.posts.factory';
import { allPostsComponent, allPostsOptions } from './post.posts.component'
import { togglePost } from './post.posts.directive';
import './post.posts.scss';

export const posts = angular.module('post.posts', [])
  .directive('togglePost', togglePost)
  .component(allPostsComponent, allPostsOptions)
  .factory(getPosts, ['$http', getPostsFunc])
  .name
