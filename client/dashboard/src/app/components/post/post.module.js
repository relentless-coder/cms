import angular from 'angular';
import {newPost} from './post_new/post.new.module.js';
import {posts} from './posts/post.posts.module.js';
import {postSingle} from './post_single/post.single.module.js';

export const post = angular.module('post', [newPost, posts, postSingle]).name
