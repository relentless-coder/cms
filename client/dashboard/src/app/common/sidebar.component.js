import angular from 'angular';
import {sidebarController} from './sidebar.controller';

export const sidebarComponentName = 'sidebar';
export const sidebarComponent = {
  templateUrl: '/dashboard/src/app/common/sidebar.html',
  controller: ['tokenFactory', '$state', '$rootScope', 'notifsFactory', sidebarController],
  controllerAs: 'ctrl'
}
