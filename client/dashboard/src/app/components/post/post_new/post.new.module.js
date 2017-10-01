import {thisPost, thisPostFunc} from './post.new.factory';
import {postNewComponent, postNewOptions} from './post.new.component';
import './post.new.scss';

export const newPost = angular.module('post.new', [])
.component(postNewComponent, postNewOptions)
.factory(thisPost, ['$http', thisPostFunc])
.name
