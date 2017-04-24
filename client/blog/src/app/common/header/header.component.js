import {headerController} from './header.controller.js'

export const headerComponentName = 'headerComponent';
export const headerComponentOptions = {
  templateUrl: './src/app/common/header/header.html',
  controller: ['userFactory', headerController],
  controllerAs: 'ctrl'
}
