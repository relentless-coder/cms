import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngFile from  'ng-file-upload';
import 'ngstorage';
import {userFactory, userFactoryFunc} from './user.factory.js'
import {userComponent, userComponentOptions} from './user.component.js'
import './user.scss';

export const user = angular.module('user', [uiRouter, ngFile, 'ngStorage'])
.component(userComponent, userComponentOptions)
.config(['$stateProvider', function($stateProvider){
  const profileState = {
    name: 'profile',
    url: '/admin/profile',
    component: userComponent
  }
  $stateProvider.state(profileState)
}])
.factory(userFactory, ['$http', '$localStorage', userFactoryFunc])
.name
