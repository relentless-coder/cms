import {postSingleComponent, postSingleOptions} from './post.single.component';
import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory';
import {postUpdateFactory, postUpdateFactoryFunc} from './post.update.factory';

export const postSingle = angular.module('postSingle', [])
.component(postSingleComponent, postSingleOptions)
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.factory(postUpdateFactory, ['$http', postUpdateFactoryFunc])
.name
