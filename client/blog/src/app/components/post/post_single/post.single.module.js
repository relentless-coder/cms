import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory'
import {postSingleComponent, postSingleComponentOptions} from './post.single.component'
import {highlightDirective} from './post.single.directive';
import './post.single.scss'

export const post_single = angular.module('postSingle', [])
  .directive('singlePostContent', ['hljsService', '$window', highlightDirective])
.component(postSingleComponent, postSingleComponentOptions)
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.name
