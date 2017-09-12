import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {thisPost, thisPostFunc} from './post.new.factory';
import {postNewComponent, postNewOptions} from './post.new.component';
import './post.new.scss';

export const newPost = angular.module('post.new', [uiRouter, 'ui.tinymce'])
.component(postNewComponent, postNewOptions)
.config(['$stateProvider', function($stateProvider){
  var newState = {
    name: 'new',
    url: '/admin/new',
    component: postNewComponent
  }

  $stateProvider.state(newState);
}])
.factory(thisPost, ['$http', thisPostFunc])
.name
