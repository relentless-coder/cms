import angular from 'angular';
import {post} from './post/post.module';
import {login} from './login/login.module.js';
import {user} from './user/user.module.js';
import {comment} from './comment/comment.module';

export const components = angular.module('components', [post, login, user, comment]).name
