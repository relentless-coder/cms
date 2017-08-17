import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ngstorage';
import {removeNotifs} from './notifs.directive';
import {showComments} from './show.comments.directive';
import {notifsFactory, notifsFactoryFunc} from './notifs.factory'
import {sidebarComponentName, sidebarComponent} from './sidebar.component';
import {sidebarController} from './sidebar.controller';
import './sidebar.scss';

export const sidebar = angular.module('sidebar', [uiRouter, 'ngStorage'])
.component(sidebarComponentName, sidebarComponent)
.directive('removeNotifs', removeNotifs)
.factory(notifsFactory, ['$http', notifsFactoryFunc])
.directive('showComments', showComments)
.name;
