import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {commentsFactory, commentsFactoryFunc} from './comments.factory';
import {commentComponent, commentComponentOptions} from './comments.component';

export const comments = angular.module('comments', [uiRouter])
.component(commentComponent, commentComponentOptions)
.factory(commentsFactory, ['$http', commentsFactoryFunc])
.config(['$stateProvider', ($stateProvider)=>{
  const commentsState = {
    name: 'comments',
    url: '/admin/comments',
    component: commentComponent
  }

  $stateProvider.state(commentsState);
}]).name
