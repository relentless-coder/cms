import {commentsFactory, commentsFactoryFunc} from './comments.factory';
import {commentComponent, commentComponentOptions} from './comments.component';

export const comments = angular.module('comments', [])
.component(commentComponent, commentComponentOptions)
.factory(commentsFactory, ['$http', commentsFactoryFunc])
.name
