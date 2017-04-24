import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import {tokenFactory, tokenFactoryFunc} from '../components/login/token.factory.js'
import {sidebarComponentName, sidebarComponent} from './sidebar.component';
import {sidebarController} from './sidebar.controller';

export const sidebar = angular.module('sidebar', [uiRouter, 'ngStorage'])
.component(sidebarComponentName, sidebarComponent)
.factory(tokenFactory, ['$localStorage', tokenFactoryFunc])
.name;
