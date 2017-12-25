import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory'
import {postSingleComponent, postSingleComponentOptions} from './post.single.component'
import {highlightDirective} from './highlight.directive';
import {scrollHide} from './header.scroll.directive';
import './post.single.scss'

export const post_single = angular.module('postSingle', [])
.directive('singlePostContent', ['hljsService', '$window', highlightDirective])
.directive('scrollHide', ['$window', '$document', scrollHide])
.component(postSingleComponent, postSingleComponentOptions)
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.name
