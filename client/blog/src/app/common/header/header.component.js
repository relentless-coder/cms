import {headerController} from './header.controller.js'

export const headerComponentName = 'headerComponent';
export const headerComponentOptions = {
  templateUrl: 'blog/src/app/common/header/header.html',
  controller: ['userFactory', '$localStorage', headerController],
  controllerAs: 'ctrl'
}
