import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import {signupFactory, signupFactoryFunc} from './signup.factory';
import {signupComponent, signupOptions} from './signup.component';
import './signup.scss';

export const signup = angular.module('signup', [uiRouter, 'ngStorage'])
.config(['$stateProvider', function($stateProvider){
  const signupState = {
    name: 'signup',
    url: '/admin/signup',
    component: signupComponent
  }

  $stateProvider.state(signupState);
}])
.component(signupComponent, signupOptions)
.factory(signupFactory, ['$http', signupFactoryFunc])
.name