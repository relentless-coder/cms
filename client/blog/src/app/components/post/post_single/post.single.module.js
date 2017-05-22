import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngSanitize from 'angular-sanitize'
import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory'
import {postSingleComponent, postSingleComponentOptions} from './post.single.component'
import './post.single.scss'

export const post_single = angular.module('postSingle', [uiRouter, ngSanitize])
.config(['$stateProvider', ($stateProvider)=>{
  const singlePostState = {
    name: 'articles.single',
    url: '/:url',
    component: postSingleComponent
  }

  $stateProvider.state(singlePostState);
}])
.component(postSingleComponent, postSingleComponentOptions)
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.name
