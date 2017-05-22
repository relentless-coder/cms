import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import {tokenFactory, tokenFactoryFunc} from '../components/login/token.factory.js'
import {notifsFactory, notifsFactoryFunc} from './notifs.factory'
import {sidebarComponentName, sidebarComponent} from './sidebar.component';
import {sidebarController} from './sidebar.controller';
import './sidebar.scss';

export const sidebar = angular.module('sidebar', [uiRouter, 'ngStorage'])
.component(sidebarComponentName, sidebarComponent)
.factory(tokenFactory, ['$localStorage', tokenFactoryFunc])
.factory(notifsFactory, ['$http', notifsFactoryFunc])
.name;
