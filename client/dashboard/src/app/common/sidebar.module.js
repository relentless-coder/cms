import {removeNotifs} from './notifs.directive';
import {showComments} from './show.comments.directive';
import {notifsFactory, notifsFactoryFunc} from './notifs.factory'
import {sidebarComponentName, sidebarComponent} from './sidebar.component';
import {sidebarController} from './sidebar.controller';
import './sidebar.scss';

export const sidebar = angular.module('sidebar', [])
.component(sidebarComponentName, sidebarComponent)
.directive('removeNotifs', removeNotifs)
.factory(notifsFactory, ['$http', notifsFactoryFunc])
.directive('showComments', showComments)
.name;
