import angular from 'angular'
import uiRouter from 'angular-ui-router'
import {showReply, hideReply} from './comment.directive'
import {commentFactory, commentFactoryFunc} from './comment.factory'
import {commentComponent, commentComponentOptions} from './comment.component'
import './comment.scss'

export const comment = angular.module('comment', [uiRouter])
.factory(commentFactory, ['$http', commentFactoryFunc])
.component(commentComponent, commentComponentOptions)
.directive('showReply', showReply)
.directive('hideReply', hideReply)
.name
