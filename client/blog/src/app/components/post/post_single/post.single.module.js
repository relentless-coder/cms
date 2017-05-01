import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngSanitize from 'angular-sanitize'
import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory'
import {postSingleComponent, postSingleComponentOptions} from './post.single.component'

export const post_single = angular.module('postSingle', [uiRouter, ngSanitize])
.config(['$stateProvider', ($stateProvider)=>{
  const singlePostState = {
    name: 'single',
    url: '/articles/:url',
    component: postSingleComponent
  }

  $stateProvider.state(singlePostState);
}])
.component(postSingleComponent, postSingleComponentOptions)
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.name
