import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import 'ngstorage';
import {getPosts, getPostsFunc} from './post.posts.factory';
import {allPostsComponent, allPostsOptions} from './post.posts.component'
import {togglePost} from './post.posts.directive';

export const posts = angular.module('post.posts', [uiRouter, ngSanitize, 'ngStorage'])
.directive('togglePost', togglePost)
.component(allPostsComponent, allPostsOptions)
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  const homeState = {
    name: 'home',
    url: '/admin/home',
    component: allPostsComponent
  }
  $stateProvider.state(homeState);
  $urlRouterProvider.when('/admin/', '/admin/home')
}])
.factory(getPosts, ['$http', getPostsFunc])
.name
