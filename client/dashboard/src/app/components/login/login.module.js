import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import {loginFactory, loginFactoryFunc} from './login.factory';
import {tokenFactory, tokenFactoryFunc} from './token.factory';
import {loginComponent, loginOptions} from './login.component';
import './login.scss';

export const login = angular.module('login', [uiRouter, 'ngStorage'])
.config(['$stateProvider', function($stateProvider){
  const loginState = {
    name: 'login',
    url: '/admin/login',
    component: loginComponent
  }

  $stateProvider.state(loginState);
}])
.component(loginComponent, loginOptions)
.factory(loginFactory, ['$http', loginFactoryFunc])
.factory(tokenFactory, ['$localStorage', tokenFactoryFunc])
.name
