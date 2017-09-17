import angular from 'angular';
import {post} from './post/post.module';
import {login} from './login/login.module.js';
import {user} from './user/user.module.js';
import {signup} from './signup/signup.module.js';
import {comment} from './comment/comment.module';
import {news} from './newsletter/newsletter.module';

export const components = angular.module('components', [post, login, user, comment, signup, news]).name
