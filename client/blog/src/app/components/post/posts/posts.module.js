import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import 'ngstorage';
import {postsComponent, postsComponentOptions} from './posts.component'

export const posts = angular.module('posts', [uiRouter, ngSanitize, 'ngStorage'])
.config(['$stateProvider', ($stateProvider)=>{
  const postsState = {
    name: 'articles',
    url: '/articles',
    component: postsComponent
  }

  $stateProvider.state(postsState);
}])
.component(postsComponent, postsComponentOptions)
.name;
