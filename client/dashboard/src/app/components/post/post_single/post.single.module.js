import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {postSingleComponent, postSingleOptions} from './post.single.component';
import {postSingleFactory, postSingleFactoryFunc} from './post.single.factory';
import {postUpdateFactory, postUpdateFactoryFunc} from './post.update.factory';

export const postSingle = angular.module('postSingle', [uiRouter, 'ui.tinymce'])
.component(postSingleComponent, postSingleOptions)
.config(['$stateProvider', function($stateProvider){
  var editState = {
    url: '/admin/edit/:url',
    name: 'edit',
    component: postSingleComponent
  }
  $stateProvider.state(editState);
}])
.factory(postSingleFactory, ['$http', postSingleFactoryFunc])
.factory(postUpdateFactory, ['$http', postUpdateFactoryFunc])
.name
